
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { HeroSection } from '@/components/HeroSection';
import { QRScanner } from '@/components/QRScanner';
import { SpecialDishes } from '@/components/SpecialDishes';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CTASection } from '@/components/CTASection';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleReservation = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      // Simulate reservation
      alert('Réservation en cours...');
    }
  };

  const simulateQRScan = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      setShowQRScanner(false);
      alert('Table #5 détectée ! Vous pouvez maintenant commander.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne via-background to-champagne overflow-hidden">
      <Header />
      
      <HeroSection onQRScan={simulateQRScan} />
      
      <QRScanner isVisible={showQRScanner} />
      
      <SpecialDishes />
      
      <FeaturesSection />
      
      <CTASection onReservation={handleReservation} />

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Index;
