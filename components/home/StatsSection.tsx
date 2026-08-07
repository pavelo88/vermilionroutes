'use client';

import React from 'react';
import { Award, Shield, Globe, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function StatsSection() {
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-zinc-400 text-lg">
            Our commitment to excellence and uncompromised exclusivity has made us the premier choice for curated expeditions across South America.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tripadvisor Featured Widget */}
          <div className="lg:col-span-2 relative group overflow-hidden bg-gradient-to-br from-[#00aa6c]/10 to-zinc-900 border border-[#00aa6c]/30 rounded-3xl p-8 flex flex-col justify-between transition-all hover:border-[#00aa6c]/60">
            <div className="absolute -right-10 -top-10 opacity-10 transform rotate-12 transition-transform group-hover:scale-110">
              <svg viewBox="0 0 512 512" className="w-48 h-48 fill-white"><path d="M479.5 220c-15.6-54.8-49.8-100-95.2-126.8-5.6-3.3-11.4-6.3-17.4-9-40.4-18.4-85.4-22.3-128.5-11.8-15.8 3.9-31 10.1-45.2 18.5-23.9 14.2-44.4 33.1-60.6 55.4-11 15-20.1 31.5-27.1 49-6.9 17.1-11.6 35-14 53.3-3.6 27.6-1.1 55.5 7.4 82.2 8.7 27.4 23 52.4 42.4 73.6 23.4 25.6 52.9 44.4 85.5 54.4 20.3 6.2 41.5 9 62.7 8.3 35.7-1.1 70.4-11.4 101.4-29.8 28.5-16.9 52.9-40.4 71.1-68.5 17.5-26.9 28.7-57.1 33.1-88.8 3.5-25.2 3.4-50.8-0.3-76-2-13.8-5.4-27.4-10.2-40.6zm-177.6 156.9c-43.2 26-96.1 27.4-140.6 3.6-28.5-15.2-51.5-39.2-65.7-68.6-8.2-16.9-13.3-35.1-15-53.7-2.3-25.1 1.4-50.5 10.9-74 9.1-22.5 22.8-42.6 40.2-59 20.6-19.4 45.4-33.3 72.5-40.6 17.9-4.8 36.6-6.7 55.3-5.5 35.4 2.2 69.4 15.6 97.4 38.4 24.1 19.6 42.6 45.1 53.6 74 6.8 17.9 10.6 36.8 11.2 56 .6 18.4-2 36.7-7.7 54.1-10.8 32.8-31 61.2-57.8 81.6-16.7 12.7-35.1 22.4-54.6 28.7-18.7 6.1-38.3 8.3-58 6.5-19.6-1.8-38.8-7-56.7-15.5-22.6-10.7-42.6-26.3-58.4-45.5-12.2-14.8-21.7-31.5-28.1-49.4-4.8-13.6-7.8-27.7-8.9-42.1-.9-11.8-.4-23.7 1.4-35.3 1.9-12 5.3-23.7 10.1-34.7 17.5-39.9 49.3-71 89.2-87.3 19.3-7.9 40-11.7 60.9-11 25.1 .8 49.6 7.7 71.7 20 22.5 12.6 41.5 30 55.6 51 11.7 17.4 19.9 36.9 24.1 57.3 3.6 17.4 4.8 35.3 3.6 53.1-2.1 32.6-14 63.4-34.1 88.3-15.8 19.6-35.7 35.3-58.2 45.9-19.7 9.3-41 14.5-62.8 15.2-19.1 .6-38.2-2.7-56.3-9.5-20.7-7.8-39.7-20.1-55.5-36-15.8-16-27.9-35.3-35.2-56.3-7.5-21.5-10.3-44.4-8.1-66.9 2.1-21.4 8.7-41.9 19.4-60.5 13-22.6 31-41.5 52.3-54.8 23-14.3 49-21.8 75.6-21.7 25.3 .1 50.1 7 72.3 20.1 19.7 11.6 36.2 27.5 48.2 46.4 12.3 19.4 20.2 40.8 23 63.1 2.3 18.2 1.8 36.8-1.5 54.8-5.3 28.5-18.4 55-37.8 77-16.7 18.9-37.4 33.7-60.3 43-20.7 8.4-42.6 12.5-64.8 11.9z"/></svg>
            </div>
            
            <div className="relative z-10 flex flex-col items-start gap-4 h-full">
              <div className="flex items-center gap-3 bg-[#00aa6c] px-4 py-2 rounded-full shadow-lg">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-white"><path d="M479.5 220c-15.6-54.8-49.8-100-95.2-126.8-5.6-3.3-11.4-6.3-17.4-9-40.4-18.4-85.4-22.3-128.5-11.8-15.8 3.9-31 10.1-45.2 18.5-23.9 14.2-44.4 33.1-60.6 55.4-11 15-20.1 31.5-27.1 49-6.9 17.1-11.6 35-14 53.3-3.6 27.6-1.1 55.5 7.4 82.2 8.7 27.4 23 52.4 42.4 73.6 23.4 25.6 52.9 44.4 85.5 54.4 20.3 6.2 41.5 9 62.7 8.3 35.7-1.1 70.4-11.4 101.4-29.8 28.5-16.9 52.9-40.4 71.1-68.5 17.5-26.9 28.7-57.1 33.1-88.8 3.5-25.2 3.4-50.8-0.3-76-2-13.8-5.4-27.4-10.2-40.6z"/></svg>
                <span className="font-bold text-white tracking-wide">Tripadvisor</span>
              </div>
              
              <div className="flex items-center gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-10 h-10 bg-[#00aa6c] rounded-full border-2 border-white flex items-center justify-center shadow-md transform -rotate-12">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">5-Star Excellence</h3>
                <p className="text-zinc-300 text-sm max-w-sm">
                  Consistently rated 5 stars by hundreds of passionate travelers. Read real stories from our guests who experienced the extraordinary.
                </p>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={scrollToReviews}
                  className="bg-white hover:bg-zinc-100 text-[#00aa6c] font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                >
                  Read Verified Reviews
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stat 1 */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-zinc-900 transition-colors">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-4xl font-oswald font-bold text-white mb-2">+500</div>
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Curated Expeditions</p>
          </div>

          {/* Quick Stat 2 */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-zinc-900 transition-colors">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-4xl font-oswald font-bold text-white mb-2">+10</div>
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Years of Expertise</p>
          </div>

          {/* Quick Stat 3 */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-zinc-900 transition-colors">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-4xl font-oswald font-bold text-white mb-2">99%</div>
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Client Satisfaction</p>
          </div>

          {/* Quick Stat 4 */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-zinc-900 transition-colors">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-4xl font-oswald font-bold text-white mb-2">100%</div>
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Secure Payments</p>
          </div>

        </div>
      </div>
    </section>
  );
}
