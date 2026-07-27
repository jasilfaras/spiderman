import React from 'react';

type BugleArticle = {
  id: string;
  headline: string;
  subhead: string;
  author: string;
  date: string;
  flair?: 'marker' | 'stamp';
};

const articles: BugleArticle[] = [
  {
    id: '1',
    headline: 'SPIDER-MAN: THREAT OR MENACE?',
    subhead: '"He was… a thief! A criminal! He stole my suit! He\'s a menace to the entire city! I want that wall-crawling arachnid prosecuted!"',
    author: 'J. Jonah Jameson',
    date: 'OCT 12',
    flair: 'marker'
  },
  {
    id: '2',
    headline: 'SPIDER-MAN DEAD: 26-Year-Old Peter Parker Perishes',
    subhead: 'Tragic news as the beloved hero perishes in battle against the Kingpin. Brooklyn mourns its protector.',
    author: 'Ben Urich',
    date: 'NOV 04'
  },
  {
    id: '3',
    headline: 'ANOMALY DETECTED IN BROOKLYN',
    subhead: 'Unidentified masked vigilantes tear through reality. "Who is going to pay for my desk?!" Jameson demands answers.',
    author: 'Betty Brant',
    date: 'DEC 16'
  },
  {
    id: '4',
    headline: "PUBLIC ENEMY #1: SPIDER-MANIAC'S WEB OF DESTRUCTION",
    subhead: 'The so-called "hero" brings chaos and destruction to New York\'s streets. Mysterio hailed as true savior.',
    author: 'Eddie Brock',
    date: 'JUL 02',
    flair: 'stamp'
  },
  {
    id: '5',
    headline: 'MOB MENACE: WEB-HEAD CAUGHT COLLUDING WITH CRIME BOSSES!',
    subhead: 'Photographic evidence proves the wall-crawler is working directly with high-level mobsters. Is the city safe?',
    author: 'Robbie Robertson',
    date: 'AUG 22',
    flair: 'marker'
  },
  {
    id: '6',
    headline: 'EXTRA! SPIDER-MAN JOINS DR. OCTOPUS!',
    subhead: 'The ultimate betrayal! The masked vigilante abandons New York to team up with the multi-armed maniac!',
    author: 'J. Jonah Jameson',
    date: 'SEP 15'
  },
  {
    id: '7',
    headline: 'SPIDER-MAN: SUPER-HERO OR SUPER-ZERO?',
    subhead: 'Citizens question the effectiveness of the masked vigilante as property damage costs skyrocket across Manhattan.',
    author: 'Betty Brant',
    date: 'MAY 03'
  },
  {
    id: '8',
    headline: 'NEW YORK FEARS COSTUMED FREAK!',
    subhead: 'Who is the man behind the mask? The Daily Bugle demands accountability and unmasking for the safety of all.',
    author: 'J. Jonah Jameson',
    date: 'JUN 11'
  }
];

export const DailyBugleNews: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#F4F1EA] overflow-y-auto no-scrollbar relative paper-cutout">
      <div className="absolute inset-0 halftone-heavy opacity-10 pointer-events-none mix-blend-multiply" />
      
      <div className="relative z-10 w-full border-b-[8px] border-black pb-4 pt-6 px-6 text-center bg-[#F4F1EA]">
        <h1 className="font-playfair font-black text-6xl text-black tracking-tighter uppercase" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
          The Daily Bugle
        </h1>
        <div className="flex justify-between items-center border-t-2 border-b-2 border-black mt-2 py-1 px-2 font-oswald text-xs uppercase font-bold text-black">
          <span>New York's Finest</span>
          <span>Price: 50¢</span>
          <span>Vol. CCX No. 42</span>
        </div>
      </div>

      <div className="relative z-10 p-6 flex flex-col gap-8 pb-12">
        {articles.map((article, index) => {
          
          const renderHeadline = (text: string) => {
            if (article.flair === 'marker' && text.includes('MENACE')) {
              const parts = text.split('MENACE');
              return (
                <>
                  {parts[0]}
                  <span className="relative inline-block">
                    MENACE
                    <svg className="absolute -inset-2 w-[120%] h-[140%] text-red-600 z-10 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path d="M5,20 C5,5 95,5 95,20 C95,35 5,35 15,20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ filter: 'drop-shadow(1px 1px 0px rgba(255,0,0,0.5))' }} />
                    </svg>
                  </span>
                  {parts[1]}
                </>
              );
            }
            return text;
          };

          return (
            <article key={article.id} className="relative flex flex-col gap-2">
              {index > 0 && (
                <div className="absolute -top-5 left-0 w-full h-2 bg-black" style={{ clipPath: 'polygon(0% 40%, 10% 60%, 20% 30%, 30% 70%, 40% 20%, 50% 80%, 60% 10%, 70% 90%, 80% 20%, 90% 60%, 100% 40%, 100% 100%, 0% 100%)' }} />
              )}
              
              <div className="flex justify-between items-end mb-1 font-oswald text-sm font-bold text-gray-800 uppercase border-b-2 border-black pb-1">
                <span>By {article.author}</span>
                <span>{article.date}</span>
              </div>
              
              <h2 className="font-oswald font-black text-5xl leading-none text-black uppercase tracking-tight">
                {renderHeadline(article.headline)}
              </h2>
              
              <p className="font-playfair text-xl text-black font-bold italic leading-snug mt-2">
                {article.subhead}
              </p>

              {article.flair === 'stamp' && (
                <div className="absolute -top-2 right-4 transform rotate-12 z-20 pointer-events-none opacity-80 mix-blend-multiply">
                  <div className="border-4 border-red-600 text-red-600 font-bangers text-4xl px-4 py-1 rounded-sm tracking-widest shadow-[2px_2px_0px_rgba(255,0,0,0.3)]">
                    TRASH!
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
