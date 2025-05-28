
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Star } from "lucide-react";

interface Restaurant {
  id: number;
  name: string;
  discountItem?: string;
  discountPercent?: number;
}

interface DiscountAlertProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
}

export const DiscountAlert = ({ isOpen, onClose, restaurant }: DiscountAlertProps) => {
  const handleOrderDiscount = () => {
    console.log(`Discount order placed for ${restaurant?.discountItem}`);
    onClose();
  };

  if (!restaurant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-600">
            <Clock className="h-5 w-5 mr-2" />
            Limited Time Offer!
          </DialogTitle>
          <DialogDescription className="text-base">
            <strong>{restaurant.name}</strong> is offering a special discount to reduce food waste.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">
              🍛 {restaurant.discountItem}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                {restaurant.discountPercent}% OFF
              </span>
              <div className="text-sm text-gray-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Closes in 2 hours
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">
            Help us reduce food waste while enjoying delicious food at a great price! 
            This offer is valid until closing time.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            onClick={handleOrderDiscount}
          >
            Order Now with Discount
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
