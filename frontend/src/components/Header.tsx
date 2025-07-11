
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { AuthModal } from './AuthModal';
import { CartModal } from './CartModal';
import { QRScannerModal } from './QRScannerModal';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };
  const handleQRScanSuccess = (decodedText) => {
    console.log(`/dashboard-client?table_id=${decodedText}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full afro-gradient"></div>
            <span className="text-lg sm:text-xl font-bold text-slate-blue">AKOUNAMATATA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/menu" className="text-sm font-medium hover:text-emerald-green transition-colors">
              Menu
            </Link>
            {/* <Button variant="ghost" size="sm" className="text-sm font-medium">
              <QrCode className="h-4 w-4 mr-2" />
              Scanner QR
            </Button> */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowQRScanner(true)}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Scanner QR
            </Button>

          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCartModal(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-green text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(user.isAdmin ? '/admin' : '/dashboard')}
                >
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}>
                Connexion
              </Button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCartModal(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-green text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container px-4 py-4 space-y-4">
              <Link 
                to="/menu" 
                className="block text-base font-medium hover:text-emerald-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-base font-medium p-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                <QrCode className="h-5 w-5 mr-2" />
                Scanner QR
              </Button>
              
              {user ? (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base p-0"
                    onClick={() => {
                      navigate(user.isAdmin ? '/admin' : '/dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {user.name}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-base p-0" 
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Connexion
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <CartModal open={showCartModal} onOpenChange={setShowCartModal} />
      <QRScannerModal 
        open={showQRScanner} 
        onClose={() => setShowQRScanner(false)} 
      />
    </>
  );
};
