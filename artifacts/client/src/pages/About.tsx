import React from 'react';
import { Leaf, Recycle, Globe, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          About EcoVision AI
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We are on a mission to end confusion at the bin by bringing industrial-grade AI to everyday disposal decisions.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 mb-6">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Fixing the recycling stream at the source.
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Global recycling systems lose billions of dollars annually due to contamination. Good intentions often lead to "wish-cycling" — throwing non-recyclable items into the blue bin hoping they'll be processed.
              </p>
              <p className="text-slate-600 leading-relaxed">
                EcoVision AI removes the guesswork. By leveraging millions of annotated data points and advanced neural networks, we provide immediate, hyper-localized disposal instructions. If we clean up the inputs, the entire system works better.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-yellow-300 rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-gradient-to-br from-green-50 to-green-100 w-full h-[400px] flex flex-col items-center justify-center gap-6 p-8">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Recycle className="w-10 h-10 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  {[
                    { icon: Globe, label: "Global Coverage", value: "150+ cities" },
                    { icon: Zap, label: "AI Accuracy", value: "99.2%" },
                    { icon: Leaf, label: "Items Diverted", value: "12M+" },
                    { icon: Recycle, label: "Categories", value: "45+" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-100">
                      <Icon className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="text-sm font-bold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
          <p className="text-slate-500 mb-16">Engineers and environmentalists building the future.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { initials: "AS", name: "Alex Sterling", role: "Co-Founder & CEO" },
              { initials: "JY", name: "Jordan Yeo", role: "Chief Technology Officer" },
              { initials: "MR", name: "Maya Reed", role: "Head of ML Research" }
            ].map((member, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-600 mb-6">
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-green-600 font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Accuracy First", desc: "A bad prediction is worse than no prediction. We prioritize precision over speed." },
              { title: "Local Context", desc: "Recycling is local. We respect municipality-specific rules and infrastructure." },
              { title: "Radical Clarity", desc: "No complex jargon. We give people the exact next step they need to take." },
              { title: "Continuous Learning", desc: "Our model improves with every scan. The network gets smarter together." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Powered by Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "TypeScript", "Node.js", "Python", "TensorFlow", "PostgreSQL", "AWS Edge", "Framer Motion"].map(tech => (
              <span key={tech} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-full border border-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
