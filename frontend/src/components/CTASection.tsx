
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onReservation: () => void;
}

export const CTASection = ({ onReservation }: CTASectionProps) => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-slate-blue to-slate-blue/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30"></div>
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
          Prêt pour une expérience unique ?
        </h2>
        <p className="text-champagne mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200 text-sm sm:text-base leading-relaxed px-4">
          Rejoignez-nous pour un voyage culinaire qui éveillera tous vos sens 
          et vous fera découvrir les trésors de la gastronomie africaine.
        </p>
        <Button
          size="lg"
          onClick={onReservation}
          className="bg-emerald-green hover:bg-emerald-green/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-green/25 animate-fade-in animation-delay-400"
        >
          <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          Réserver une Table
        </Button>
      </div>
    </section>
  );
};
