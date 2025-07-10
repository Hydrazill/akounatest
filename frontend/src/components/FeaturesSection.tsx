
import React from 'react';
import { QrCode, Heart, Calendar } from 'lucide-react';

export const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="text-center group hover:scale-105 transition-all duration-300 p-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-green to-emerald-green/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <QrCode className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-blue mb-2 group-hover:text-emerald-green transition-colors">
              Sans Contact
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Scannez le QR code de votre table pour commander instantanément
            </p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-all duration-300 p-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-royal-gold to-royal-gold/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-slate-blue" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-blue mb-2 group-hover:text-royal-gold transition-colors">
              Saveurs Authentiques
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Découvrez les histoires culturelles de chaque plat traditionnel
            </p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-all duration-300 p-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-green to-emerald-green/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-blue mb-2 group-hover:text-emerald-green transition-colors">
              Réservation Facile
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Réservez votre table en quelques clics depuis l'application
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
