import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { MessageCircle, ArrowLeft, Store, Tag } from 'lucide-react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton'; // On va créer ce petit fichier juste après

export default async function DealDetails({ params }: { params: Promise<{ id: string }> }) {
  // On attend que les paramètres arrivent (indispensable en Next.js 15)
  const { id } = await params;

  // Récupération de la promo et du marchand associé
  const { data: deal, error } = await supabase
    .from('deals')
    .select('*, merchants(*)')
    .eq('id', id)
    .single();

  if (error || !deal) {
    notFound();
  }

  const whatsappLink = `https://wa.me/${deal.merchants.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Bonjour ${deal.merchants.name}, je suis intéressé par votre promo "${deal.title}" vue sur PromosLshi.`
  )}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
          <ArrowLeft size={20} /> Retour aux promos
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-4">
        {/* Colonne Gauche : Image */}
        <div className="rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-2xl aspect-square border border-gray-100">
          <img 
            src={deal.image_url || 'https://via.placeholder.com/600'} 
            alt={deal.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Colonne Droite : Infos & Actions */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase mb-3 tracking-[0.2em]">
            <Tag size={14} strokeWidth={3} /> {deal.merchants.category}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-[1.1]">
            {deal.title}
          </h1>
          
          <div className="flex items-center gap-3 text-gray-600 mb-8 pb-8 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Store size={20} />
            </div>
            <span className="text-xl font-semibold tracking-tight">{deal.merchants.name}</span>
          </div>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-5xl font-black text-red-600">{deal.new_price}$</span>
            {deal.old_price && (
              <span className="text-2xl text-gray-300 line-through font-bold">{deal.old_price}$</span>
            )}
          </div>

          {/* ESPACE ACTIONS */}
          <div className="space-y-4">
            <a 
              href={whatsappLink}
              target="_blank"
              className="w-full bg-[#25D366] text-white text-lg font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-green-200 hover:bg-[#128C7E] transition-all transform active:scale-95"
            >
              <MessageCircle size={28} />
              Commander sur WhatsApp
            </a>

            {/* Notre nouveau bouton de partage */}
            <ShareButton title={deal.title} merchant={deal.merchants.name} />
          </div>
        </div>
      </div>
    </main>
  );
}