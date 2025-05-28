
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-yellow-300">Taste Hunt</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Smart food delivery with waste management, fraud detection, and personalized recommendations
        </p>
        
        {/* Hero Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Enter your delivery address..."
              className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-lg text-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700">
              Find Food
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-4 py-2 rounded-full">🍕 Pizza</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">🍜 Biryani</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">🍔 Burgers</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">🍰 Desserts</span>
        </div>
      </div>
    </section>
  );
};
