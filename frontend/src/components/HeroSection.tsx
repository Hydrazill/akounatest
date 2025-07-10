
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onQRScan: () => void;
}

export const HeroSection = ({ onQRScan }: HeroSectionProps) => {
  // Éléments gastronomiques pour les animations
  const gastronomicElements = [
    { emoji: '🍽️', name: 'Plat traditionnel' },
    { emoji: '🥘', name: 'Tajine épicé' },
    { emoji: '🍖', name: 'Viande grillée' },
    { emoji: '🥗', name: 'Salade fraîche' },
    { emoji: '🍚', name: 'Riz parfumé' },
    { emoji: '🌶️', name: 'Épices africaines' },
    { emoji: '🥭', name: 'Mangue sucrée' },
    { emoji: '🍃', name: 'Herbes fraîches' },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 min-h-[70vh] sm:min-h-[80vh] flex items-center">
      {/* Floating Elements - Left Side - Hidden on small screens */}
      <div className="absolute left-0 top-0 h-full w-16 sm:w-24 lg:w-32 pointer-events-none overflow-hidden hidden sm:block">
        <div className="animate-[scroll-up_20s_linear_infinite] flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
          {[...gastronomicElements, ...gastronomicElements].map((element, index) => (
            <div
              key={`left-${index}`}
              className="flex flex-col items-center text-center p-2 sm:p-3 lg:p-4 bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-white/20 shadow-lg"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">{element.emoji}</span>
              <span className="text-[10px] sm:text-xs text-slate-blue font-medium hidden lg:block">{element.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements - Right Side - Hidden on small screens */}
      <div className="absolute right-0 top-0 h-full w-16 sm:w-24 lg:w-32 pointer-events-none overflow-hidden hidden sm:block">
        <div className="animate-[scroll-down_25s_linear_infinite] flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
          {[...gastronomicElements.reverse(), ...gastronomicElements].map((element, index) => (
            <div
              key={`right-${index}`}
              className="flex flex-col items-center text-center p-2 sm:p-3 lg:p-4 bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-white/20 shadow-lg"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">{element.emoji}</span>
              <span className="text-[10px] sm:text-xs text-slate-blue font-medium hidden lg:block">{element.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Logo/Brand with floating animation */}
          <div className="mb-6 sm:mb-8 animate-[float_6s_ease-in-out_infinite]">
            <div className="inline-block p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-emerald-green/20 to-royal-gold/20 rounded-full backdrop-blur-sm border border-white/30">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-blue mb-2">
                AKOUNAMATATA
              </h1>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-emerald-green font-medium mb-3 sm:mb-4 animate-fade-in">
            "Oublie tes soucis"
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200 leading-relaxed">
            Découvrez une expérience culinaire digitale unique qui célèbre les saveurs authentiques 
            de l'Afrique dans un cadre moderne et convivial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in animation-delay-400">
            <Button
              size="lg"
              onClick={onQRScan}
              className="w-full sm:w-auto bg-emerald-green hover:bg-emerald-green/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <QrCode className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Scanner QR Code
            </Button>
            
            <Link to="/menu" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Utensils className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Voir le Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
