
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  Utensils, 
  Calendar,
  TrendingUp,
  ShoppingBag,
  AlertCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { dishes } from '@/data/dishes';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    navigate('/');
    return null;
  }

  // Données simulées pour le dashboard
  const dashboardStats = {
    totalRevenue: 2450.75,
    todayOrders: 23,
    activeReservations: 8,
    totalCustomers: 156,
    avgOrderValue: 18.50,
    popularDish: 'Tiep Bou Dien'
  };

  const recentOrders = [
    { id: '1', customer: 'Marie Diop', items: 2, total: 24.00, status: 'en_cours', time: '12:30' },
    { id: '2', customer: 'Jean Martin', items: 1, total: 18.50, status: 'pret', time: '12:25' },
    { id: '3', customer: 'Fatou Sall', items: 3, total: 32.00, status: 'livre', time: '12:20' },
    { id: '4', customer: 'Pierre Durand', items: 2, total: 26.50, status: 'en_cours', time: '12:15' },
  ];

  const reservations = [
    { id: '1', customer: 'Sophie Lambert', table: 5, time: '19:00', guests: 4, status: 'confirmee' },
    { id: '2', customer: 'Ahmed Ba', table: 2, time: '19:30', guests: 2, status: 'en_attente' },
    { id: '3', customer: 'Lisa Chen', table: 8, time: '20:00', guests: 6, status: 'confirmee' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-yellow-500';
      case 'pret': return 'bg-blue-500';
      case 'livre': return 'bg-green-500';
      case 'confirmee': return 'bg-green-500';
      case 'en_attente': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'pret': return 'Prêt';
      case 'livre': return 'Livré';
      case 'confirmee': return 'Confirmée';
      case 'en_attente': return 'En attente';
      default: return status;
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
              Retour au site
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-blue">
                Dashboard Administrateur
              </h1>
              <p className="text-muted-foreground">
                Gestion complète de votre restaurant AKOUNAMATATA
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Chiffre d'affaires
                  </p>
                  <p className="text-2xl font-bold text-emerald-green">
                    {dashboardStats.totalRevenue.toFixed(2)}€
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Commandes aujourd'hui
                  </p>
                  <p className="text-2xl font-bold text-slate-blue">
                    {dashboardStats.todayOrders}
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-slate-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Réservations actives
                  </p>
                  <p className="text-2xl font-bold text-royal-gold">
                    {dashboardStats.activeReservations}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-royal-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total clients
                  </p>
                  <p className="text-2xl font-bold text-emerald-green">
                    {dashboardStats.totalCustomers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-emerald-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Commandes en temps réel</TabsTrigger>
            <TabsTrigger value="menu">Gestion du menu</TabsTrigger>
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                  Commandes en cours ({recentOrders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {getStatusText(order.status)}
                        </Badge>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items} articles • {order.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-green">
                          {order.total.toFixed(2)}€
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Voir détails
                          </Button>
                          {order.status === 'en_cours' && (
                            <Button size="sm" className="bg-emerald-green hover:bg-emerald-green/90">
                              Marquer prêt
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management Tab */}
          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Utensils className="h-5 w-5 mr-2" />
                    Gestion du menu ({dishes.length} plats)
                  </CardTitle>
                  <Button className="bg-emerald-green hover:bg-emerald-green/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un plat
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dishes.slice(0, 6).map((dish) => (
                    <div key={dish.id} className="border rounded-lg p-4">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{dish.name}</h3>
                          <span className="text-emerald-green font-semibold">
                            {dish.price.toFixed(2)}€
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {dish.description}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Modifier
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Réservations du jour ({reservations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={`${getStatusColor(reservation.status)} text-white`}>
                          {getStatusText(reservation.status)}
                        </Badge>
                        <div>
                          <p className="font-medium">{reservation.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            Table {reservation.table} • {reservation.guests} personnes
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-blue">
                          {reservation.time}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Voir détails
                          </Button>
                          {reservation.status === 'en_attente' && (
                            <Button size="sm" className="bg-emerald-green hover:bg-emerald-green/90">
                              Confirmer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Statistiques de vente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Panier moyen</span>
                      <span className="font-semibold text-emerald-green">
                        {dashboardStats.avgOrderValue.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Plat le plus populaire</span>
                      <span className="font-semibold text-slate-blue">
                        {dashboardStats.popularDish}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Croissance mensuelle</span>
                      <span className="font-semibold text-emerald-green">
                        +12.5%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Taux de satisfaction</span>
                      <span className="font-semibold text-royal-gold">
                        4.8/5
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clients actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Nouveaux clients ce mois</span>
                      <span className="font-semibold text-emerald-green">+24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Clients fidèles</span>
                      <span className="font-semibold text-slate-blue">132</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Taux de rétention</span>
                      <span className="font-semibold text-royal-gold">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
