"use client";

import { MessageCircle, Tag, Store, Image as ImageIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DealProps {
  id: string; // Nouvel identifiant nécessaire pour la navigation
  title: string;
  merchantName: string;
  merchantPhone: string;
  oldPrice?: number;
  newPrice: number;
  category?: string;
  imageUrl?: string;
}

export default function DealCard({ 
  id,
  title, 
  merchantName, 
  merchantPhone, 
  oldPrice, 
  newPrice, 
  category,
  imageUrl 
}: DealProps) {
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    // Empêche le clic de déclencher le Link parent si on clique sur le bouton
    e.preventDefault();
    e.stopPropagation();

    if (!merchantPhone || merchantPhone.trim() === "") {
      alert("Le numéro WhatsApp de ce marchand n'est pas configuré.");
      return;
    }

    const cleanPhone = merchantPhone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Bonjour ${merchantName} ! Je suis intéressé par votre promo "${title}" vue sur PromosLshi.`
    );

    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
      
      {/* LIEN VERS LA PAGE DE DÉTAILS (Image + Texte) */}
      <Link href={`/deals/${id}`} className="flex-grow cursor-pointer">
        {/* SECTION IMAGE */}
        <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageIcon size={40} strokeWidth={1} />
              <span className="text-xs mt-2 italic">Pas de photo</span>
            </div>
          )}
          
          {/* Badge flottant */}
          {oldPrice && (
            <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
              -{Math.round(((oldPrice - newPrice) / oldPrice) * 100)}%
            </div>
          )}
        </div>

        {/* CONTENU TEXTE */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 mb-2 uppercase tracking-widest">
            <Tag size={12} />
            {category || 'Promo'}
          </div>

          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
            <Store size={14} />
            <span className="font-medium truncate">{merchantName}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-red-600">{newPrice}$</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through font-semibold">{oldPrice}$</span>
            )}
          </div>
          
          <div className="text-blue-500 text-xs font-bold flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Voir les détails <ChevronRight size={14} />
          </div>
        </div>
      </Link>

      {/* BOUTON WHATSAPP (Toujours en bas) */}
      <div className="p-5 pt-0 mt-auto">
        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <MessageCircle size={18} />
          Commander
        </button>
      </div>
    </div>
  );
}