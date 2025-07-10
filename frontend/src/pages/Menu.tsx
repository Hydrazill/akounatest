
import React, { useState } from 'react';
import { Search, Heart, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { dishes, categories } from '@/data/dishes';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (dish: typeof dishes[0]) => {
    addItem({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
    toast({
      title: "Ajouté au panier",
      description: `${dish.name} a été ajouté à votre panier.`,
    });
  };

  const toggleFavorite = (dishId: string) => {
    if (isFavorite(dishId)) {
      removeFavorite(dishId);
      toast({
        title: "Retiré des favoris",
        description: "Le plat a été retiré de vos favoris.",
      });
    } else {
      addFavorite(dishId);
      toast({
        title: "Ajouté aux favoris",
        description: "Le plat a été ajouté à vos favoris.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne via-background to-champagne">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-blue mb-4">Notre Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de plats authentiques, chacun avec son histoire 
            et ses informations nutritionnelles détaillées.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap"
            >
              Tous
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleFavorite(dish.id)}
                  className={`absolute top-2 right-2 ${
                    isFavorite(dish.id) 
                      ? 'text-red-500 bg-white/90' 
                      : 'text-white bg-black/20 hover:bg-white/90 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(dish.id) ? 'fill-current' : ''}`} />
                </Button>
                {dish.isSpecialOfDay && (
                  <Badge className="absolute top-2 left-2 bg-royal-gold text-slate-blue">
                    Spécial du jour
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-blue mb-2">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {dish.description}
                </p>
                
                {dish.culturalStory && (
                  <div className="mb-4 p-3 bg-champagne/50 rounded-lg">
                    <p className="text-xs text-slate-blue font-medium mb-1">
                      Histoire culturelle:
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dish.culturalStory}
                    </p>
                  </div>
                )}
                
                {dish.nutritionInfo && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-blue mb-2">
                      Informations nutritionnelles (pour 100g):
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>Calories: {dish.nutritionInfo.calories}</span>
                      <span>Protéines: {dish.nutritionInfo.protein}g</span>
                      <span>Glucides: {dish.nutritionInfo.carbs}g</span>
                      <span>Lipides: {dish.nutritionInfo.fat}g</span>
                    </div>
                  </div>
                )}
                
                {dish.allergens && dish.allergens.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-blue mb-2">Allergènes:</p>
                    <div className="flex flex-wrap gap-1">
                      {dish.allergens.map((allergen) => (
                        <Badge key={allergen} variant="secondary" className="text-xs">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-green">
                    {dish.price.toFixed(2)}€
                  </span>
                  <Button
                    onClick={() => handleAddToCart(dish)}
                    className="bg-emerald-green hover:bg-emerald-green/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Aucun plat trouvé pour cette recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
