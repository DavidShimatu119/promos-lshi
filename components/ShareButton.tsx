"use client";

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton({ title, merchant }: { title: string, merchant: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "PromosLshi",
      text: `Regarde cette promo : ${title} chez ${merchant} !`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.log("Erreur de partage:", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="w-full bg-gray-100 text-gray-700 text-base font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95"
    >
      {copied ? (
        <>
          <Check size={20} className="text-green-600" />
          Lien copié !
        </>
      ) : (
        <>
          <Share2 size={20} />
          Partager la promo
        </>
      )}
    </button>
  );
}