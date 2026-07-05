import React from 'react';
import { HeroSection } from '@/components/shared/HeroSection';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { MaterialResultCard } from '@/components/shared/MaterialResultCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Camera, BarChart3, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        badgeText="AI-Powered"
        title={
          <>
            Detect Waste.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
              Dispose Smarter.
            </span>
          </>
        }
        subtitle="The modern AI-powered assistant for perfect waste sorting. Instantly recognize materials and get localized disposal guides."
        ctaLabel="Start Free Scan"
        ctaHref="/scan"
      />

      {/* Stats Bar */}
      <section className="bg-green-600 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-green-500/30">
            <div className="px-4">
              <p className="text-4xl font-extrabold mb-2">99.2%</p>
              <p className="text-green-100 font-medium text-sm">Classification Accuracy</p>
            </div>
            <div className="px-4">
              <p className="text-4xl font-extrabold mb-2">12M+</p>
              <p className="text-green-100 font-medium text-sm">Items Scanned</p>
            </div>
            <div className="px-4">
              <p className="text-4xl font-extrabold mb-2">45+</p>
              <p className="text-green-100 font-medium text-sm">Material Categories</p>
            </div>
            <div className="px-4">
              <p className="text-4xl font-extrabold mb-2">1.2s</p>
              <p className="text-green-100 font-medium text-sm">Average Scan Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image / Showcase Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white relative">
            <div className="absolute top-0 left-0 right-0 h-12 bg-slate-100 flex items-center px-4 gap-2 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            {/* Fallback styling for the missing image just in case */}
            <div className="h-[400px] md:h-[520px] bg-gradient-to-br from-slate-50 to-green-50 pt-12 relative flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
                    <div className="w-full h-32 bg-green-50 rounded-lg flex items-center justify-center">
                      <Camera className="w-10 h-10 text-green-400" />
                    </div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Recyclable</span>
                      <span className="text-xs text-slate-400">98% confidence</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">Plastic Bottle — PET #1</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                      <p className="text-xs text-slate-400 mb-1">Disposal</p>
                      <p className="text-sm text-slate-700 font-medium">Place in blue recycling bin. Remove cap.</p>
                    </div>
                    <div className="bg-green-600 rounded-xl p-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-100 mb-1">Impact</p>
                      <p className="text-2xl font-extrabold">12M+</p>
                      <p className="text-sm text-green-100">Items classified</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                      <p className="text-xs text-slate-400 mb-1">AI Confidence</p>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-green-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Engineered for Precision</h2>
            <p className="text-lg text-slate-500">Everything you need to build a smarter, cleaner future. Our API and app are built on the latest advancements in computer vision.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Camera}
              title="Instant Recognition"
              description="Point your camera and get immediate classification. Our edge-optimized models run directly on your device."
              delay={0.1}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Contaminant Detection"
              description="Identifies food residue and mixed materials that would typically disrupt the recycling stream."
              badge="Advanced"
              delay={0.2}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Impact Tracking"
              description="Monitor your carbon offset and waste diversion metrics in real-time with beautiful dashboards."
              delay={0.3}
            />
            <FeatureCard 
              icon={Zap}
              title="Sub-second Latency"
              description="Powered by our globally distributed edge network, providing results faster than human recognition."
              delay={0.4}
            />
            <FeatureCard 
              icon={Leaf}
              title="Localized Rules"
              description="Disposal rules vary by municipality. We automatically adjust guidelines based on your exact location."
              badge="New"
              delay={0.5}
            />
            <FeatureCard 
              icon={Cpu}
              title="Enterprise API"
              description="Integrate our sorting intelligence directly into your industrial facilities or smart bins."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-500">Three simple steps to perfect disposal.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Upload Photo",
                desc: "Take a clear picture of the item you need to throw away."
              },
              {
                step: "02",
                title: "AI Analyzes",
                desc: "Our neural network processes the image in milliseconds to identify materials."
              },
              {
                step: "03",
                title: "Get Guidelines",
                desc: "Receive clear, step-by-step instructions on exactly how to dispose of it."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                {i !== 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-slate-300"></div>
                )}
                <div className="w-20 h-20 rounded-full bg-white border-4 border-green-50 text-green-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-sm z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">See it in action</h2>
              <p className="text-lg text-slate-500">Real-world examples of our classification engine.</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex items-center mt-6 border-slate-200">
              <Link to="/history">View Full History <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <MaterialResultCard 
              materialName="Plastic Water Bottle"
              category="PET Plastic (#1)"
              disposalMethod="Empty liquids completely. Compress bottle and replace cap before placing in the blue recycling bin."
              confidence={98}
              recyclable={true}
            />
            <MaterialResultCard 
              materialName="Coffee Cup"
              category="Mixed Paper / Poly-lined"
              disposalMethod="The cup itself cannot be recycled due to the plastic lining. Place in landfill. The plastic lid can often be recycled."
              confidence={94}
              recyclable={false}
            />
            <MaterialResultCard 
              materialName="Cardboard Delivery Box"
              category="Corrugated Cardboard"
              disposalMethod="Remove all plastic packing tape and shipping labels. Flatten completely before recycling."
              confidence={99}
              recyclable={true}
            />
          </div>
          
          <Button variant="outline" asChild className="w-full mt-8 md:hidden flex justify-center items-center border-slate-200">
            <Link to="/history">View Full History <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-green-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-700 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to scan your first item?</h2>
          <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of users making smarter, more sustainable disposal choices every day. No signup required.
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-slate-50 h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
            <Link to="/scan">Open Scanner Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
