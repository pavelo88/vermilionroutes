'use client';

import React, { useEffect, useState } from 'react';
import { Play, Music, ExternalLink, Video } from 'lucide-react';
import Script from 'next/script';

interface TikTokFeedProps {
  videoIds?: string[];
}

export function TikTokFeed({ videoIds = ['7325603781254466848', '7169123238632148267'] }: TikTokFeedProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
            <Video className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vermilion on TikTok</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Explore South America With Us
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[500px]">
        {mounted ? (
          ['7624281821588589842', '7655824425182317832', '7624202277850516754'].map((id) => (
            <div key={id} className="w-full bg-black/5 dark:bg-zinc-900 rounded-3xl overflow-hidden min-h-[500px] max-h-[600px] flex items-center justify-center shadow-xl border border-zinc-200/50 dark:border-zinc-800/50" suppressHydrationWarning>
              <div 
                dangerouslySetInnerHTML={{ __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@vermilionroutes/video/${id}" data-video-id="${id}" style="max-width: 605px; min-width: 280px;"><section></section></blockquote>` }} 
                suppressHydrationWarning 
                className="w-full h-full flex items-center justify-center"
              />
            </div>
          ))
        ) : (
          [1, 2, 3].map(i => <div key={i} className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl min-h-[500px] animate-pulse" />)
        )}
      </div>
      
      {mounted && <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />}
    </section>
  );
}
