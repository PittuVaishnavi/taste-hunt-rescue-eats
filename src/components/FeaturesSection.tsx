
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Camera, Star } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Food Waste Management",
      description: "Get discounted food from restaurants before closing time. Save money while reducing food waste!",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Anomaly Detection",
      description: "Advanced order verification system to prevent fraudulent orders and protect both customers and restaurants.",
      color: "text-blue-600"
    },
    {
      icon: Camera,
      title: "Video Complaint System",
      description: "Submit photo/video evidence for genuine food complaints. Fair resolution for all parties involved.",
      color: "text-purple-600"
    },
    {
      icon: Star,
      title: "Smart Recommendations",
      description: "Personalized food suggestions based on your order history and preferences.",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Taste Hunt?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary features that make food delivery smarter, safer, and more sustainable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
