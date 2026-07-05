import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                EcoVision <span className="text-green-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              AI-powered waste detection to build a sustainable future. Empowering facilities and individuals to dispose smarter.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-green-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-green-600 transition-colors"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-green-600 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-500 hover:text-green-600 transition-colors">Overview</Link></li>
              <li><Link to="/scan" className="text-sm text-slate-500 hover:text-green-600 transition-colors">Scanner</Link></li>
              <li><Link to="/history" className="text-sm text-slate-500 hover:text-green-600 transition-colors">History</Link></li>
              <li><Link to="/about" className="text-sm text-slate-500 hover:text-green-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
            <ul className="space-y-3">
              <li className="text-sm text-slate-500">hello@ecovision.ai</li>
              <li className="text-sm text-slate-500">1-800-ECO-SCAN</li>
              <li className="text-sm text-slate-500 pt-2">
                100 Sustainability Way<br />
                San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} EcoVision AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
