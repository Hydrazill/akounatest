
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ open, onOpenChange }) => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { toast } = useToast();

  const handleOrder = () => {
    if (items.length === 0) return;
    
    toast({
      title: "Commande passée !",
      description: `Votre commande de ${total.toFixed(2)}€ a été envoyée en cuisine.`,
    });
    
    clearCart();
    onOpenChange(false);
  };

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Votre panier</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Votre panier est vide</p>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-4"
              variant="outline"
            >
              Continuer mes achats
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Votre panier ({items.length} articles)</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => clearCart()}>
              Vider le panier
            </Button>
            <Button 
              onClick={handleOrder}
              className="flex-1 bg-emerald-green hover:bg-emerald-green/90"
            >
              Commander
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
