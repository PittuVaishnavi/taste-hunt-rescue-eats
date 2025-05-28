
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Bell } from "lucide-react";
import { DiscountAlert } from "@/components/DiscountAlert";
import { AnomalyOrderDialog } from "@/components/AnomalyOrderDialog";
import { ComplaintDialog } from "@/components/ComplaintDialog";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  hasDiscount: boolean;
  discountItem?: string;
  discountPercent?: number;
  recommended?: boolean;
}

interface RestaurantListProps {
  selectedCategory: string;
}

export const RestaurantList = ({ selectedCategory }: RestaurantListProps) => {
  const [showDiscountAlert, setShowDiscountAlert] = useState(false);
  const [showAnomalyDialog, setShowAnomalyDialog] = useState(false);
  const [showComplaintDialog, setShowComplaintDialog] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Biryani Palace",
      cuisine: "Indian, Biryani",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      image: "🍛",
      hasDiscount: true,
      discountItem: "Chicken Biryani",
      discountPercent: 30,
      recommended: true
    },
    {
      id: 2,
      name: "Pizza Corner",
      cuisine: "Italian, Fast Food",
      rating: 4.2,
      deliveryTime: "20-25 mins",
      image: "🍕",
      hasDiscount: false
    },
    {
      id: 3,
      name: "Burger Junction",
      cuisine: "American, Burgers",
      rating: 4.0,
      deliveryTime: "15-20 mins",
      image: "🍔",
      hasDiscount: true,
      discountItem: "Cheese Burger Combo",
      discountPercent: 25
    }
  ];

  const handleOrder = (restaurant: Restaurant) => {
    // Simulate anomaly detection (order above usual amount)
    const isAnomalyOrder = Math.random() > 0.7; // 30% chance of anomaly
    
    if (isAnomalyOrder) {
      setSelectedRestaurant(restaurant);
      setShowAnomalyDialog(true);
    } else {
      console.log(`Normal order placed for ${restaurant.name}`);
    }
  };

  const handleDiscountAlert = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDiscountAlert(true);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Restaurants Near You</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowComplaintDialog(true)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            File Complaint
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{restaurant.image}</div>
                  <div className="flex flex-col gap-2">
                    {restaurant.hasDiscount && (
                      <Badge variant="destructive" className="bg-red-500">
                        {restaurant.discountPercent}% OFF
                      </Badge>
                    )}
                    {restaurant.recommended && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Recommended
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.cuisine}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleOrder(restaurant)}
                  >
                    Order Now
                  </Button>
                  
                  {restaurant.hasDiscount && (
                    <Button 
                      variant="outline" 
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleDiscountAlert(restaurant)}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Discount Alert: {restaurant.discountItem}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DiscountAlert 
        isOpen={showDiscountAlert}
        onClose={() => setShowDiscountAlert(false)}
        restaurant={selectedRestaurant}
      />
      
      <AnomalyOrderDialog 
        isOpen={showAnomalyDialog}
        onClose={() => setShowAnomalyDialog(false)}
        restaurant={selectedRestaurant}
      />
      
      <ComplaintDialog 
        isOpen={showComplaintDialog}
        onClose={() => setShowComplaintDialog(false)}
      />
    </section>
  );
};
