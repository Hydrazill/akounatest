
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { dishes } from '@/data/dishes';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  if (!user || user.isAdmin) {
    navigate('/');
    return null;
  }

  const favoriteDishes = dishes.filter(dish => favorites.includes(dish.id));
  
  // Simuler des statistiques
  const stats = {
    totalOrders: 12,
    favoriteCount: favorites.length,
    totalSpent: 156.50,
    averageOrderValue: 13.04
  };

  const recentOrders = [
    { id: '1', date: '2024-01-15', items: ['Tiep Bou Dien', 'Bissap Glacé'], total: 24.00 },
    { id: '2', date: '2024-01-10', items: ['Poulet Yassa', 'Thiakry'], total: 24.50 },
    { id: '3', date: '2024-01-05', items: ['Mafé de Bœuf', 'Accras de Morue'], total: 29.50 },
  ];

  const handleDeleteAccount = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne via-background to-champagne">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-blue">
                Bonjour {user.name} !
              </h1>
              <p className="text-muted-foreground">
                Votre tableau de bord personnel AKOUNAMATATA
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-8 w-8 text-emerald-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-blue">
                {stats.totalOrders}
              </div>
              <div className="text-sm text-muted-foreground">
                Commandes totales
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-blue">
                {stats.favoriteCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Plats favoris
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-green mb-1">
                {stats.totalSpent.toFixed(2)}€
              </div>
              <div className="text-sm text-muted-foreground">
                Montant total dépensé
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-royal-gold mb-1">
                {stats.averageOrderValue.toFixed(2)}€
              </div>
              <div className="text-sm text-muted-foreground">
                Panier moyen
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-blue">Commandes récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="font-semibold text-emerald-green">
                        {order.total.toFixed(2)}€
                      </div>
                    </div>
                    <div className="text-sm">
                      {order.items.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Dishes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-blue">Mes plats favoris</CardTitle>
            </CardHeader>
            <CardContent>
              {favoriteDishes.length > 0 ? (
                <div className="space-y-4">
                  {favoriteDishes.slice(0, 3).map((dish) => (
                    <div key={dish.id} className="flex items-center space-x-4">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{dish.name}</div>
                        <div className="text-sm text-emerald-green">
                          {dish.price.toFixed(2)}€
                        </div>
                      </div>
                    </div>
                  ))}
                  {favoriteDishes.length > 3 && (
                    <div className="text-sm text-muted-foreground text-center">
                      +{favoriteDishes.length - 3} autres favoris
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun plat en favoris pour le moment
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Management */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-slate-blue flex items-center">
              <User className="h-5 w-5 mr-2" />
              Gestion du compte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <div className="text-muted-foreground">{user.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="text-muted-foreground">{user.email}</div>
                </div>
                {user.phone && (
                  <div>
                    <label className="text-sm font-medium">Téléphone</label>
                    <div className="text-muted-foreground">{user.phone}</div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button variant="outline">
                  Modifier mes informations
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
