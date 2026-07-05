import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Build origin allowlist from env. In development allow all; in production
// restrict to domains listed in ALLOWED_ORIGINS (comma-separated).
const isProduction = process.env["NODE_ENV"] === "production";
const rawOrigins = process.env["ALLOWED_ORIGINS"];
const allowedOrigins = rawOrigins
  ? rawOrigins.split(",").map((o) => o.trim())
  : [];

const corsOptions: cors.CorsOptions = {
  origin: isProduction
    ? (origin, callback) => {
        // Allow server-to-server (no origin) or explicitly listed origins
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: origin '${origin}' not allowed`));
        }
      }
    : true, // allow all origins in development
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
