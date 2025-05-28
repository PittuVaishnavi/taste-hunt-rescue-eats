
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Restaurant {
  id: number;
  name: string;
}

interface AnomalyOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
}

export const AnomalyOrderDialog = ({ isOpen, onClose, restaurant }: AnomalyOrderDialogProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState(1); // 1: Alert, 2: OTP Input
  const { toast } = useToast();

  const handleSendOTP = () => {
    setStep(2);
    toast({
      title: "OTP Sent",
      description: "Verification code sent to your registered mobile number.",
    });
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === "123456") {
        toast({
          title: "Order Confirmed",
          description: "Your high-value order has been verified and placed successfully.",
        });
        onClose();
        setStep(1);
        setOtp("");
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct verification code.",
          variant: "destructive",
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setOtp("");
  };

  if (!restaurant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-600">
            <Shield className="h-5 w-5 mr-2" />
            Order Verification Required
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Unusual order pattern detected" : "Enter verification code"}
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="py-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">
                    Anomaly Order Detected
                  </h3>
                  <p className="text-sm text-amber-700">
                    Your order amount (₹7,000) is significantly higher than your usual orders (₹2,000 average). 
                    For security purposes, we need to verify this order.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Restaurant:</span>
                <span className="font-medium">{restaurant.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Amount:</span>
                <span className="font-medium text-red-600">₹7,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average Order:</span>
                <span className="font-medium">₹2,000</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  OTP sent to your registered mobile number ending with ****67
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-xs text-gray-500 text-center">
                  Didn't receive OTP? <button className="text-blue-600 underline">Resend</button>
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel Order
          </Button>
          {step === 1 ? (
            <Button 
              className="bg-amber-600 hover:bg-amber-700" 
              onClick={handleSendOTP}
            >
              Send OTP
            </Button>
          ) : (
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify & Order"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
