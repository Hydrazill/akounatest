
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dishes } from '@/data/dishes';

export const SpecialDishes = () => {
  const specialDishes = dishes.filter(dish => dish.isSpecialOfDay);

  return (
    <section className="py-12 sm:py-16 px-4 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-blue mb-8 sm:mb-12 animate-fade-in">
          Plats du Jour
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {specialDishes.map((dish, index) => (
            <Card key={dish.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in group" style={{animationDelay: `${index * 150}ms`}}>
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 bg-royal-gold text-slate-blue px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                  Spécial
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-blue mb-2 group-hover:text-emerald-green transition-colors">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
                  {dish.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-green">
                    {dish.price.toFixed(2)}€
                  </span>
                  <Button className="bg-emerald-green hover:bg-emerald-green/90 hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base px-3 sm:px-4 py-2">
                    Commander
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
