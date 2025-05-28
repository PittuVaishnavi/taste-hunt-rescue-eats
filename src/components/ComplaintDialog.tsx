
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Upload, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComplaintDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintDialog = ({ isOpen, onClose }: ComplaintDialogProps) => {
  const [complaint, setComplaint] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!complaint.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe the issue with your food order.",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "Evidence Required",
        description: "Please upload photos or videos as evidence for your complaint.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate complaint submission
    setTimeout(() => {
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted with evidence. We'll review and respond within 24 hours.",
      });
      onClose();
      setComplaint("");
      setFiles([]);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setComplaint("");
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            File a Food Complaint
          </DialogTitle>
          <DialogDescription>
            Help us maintain quality by reporting food issues with proper evidence
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Important Notice */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start">
              <Camera className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  Evidence Required for Complaints
                </h3>
                <p className="text-sm text-yellow-700">
                  To ensure fair resolution for both customers and restaurants, we require photo/video evidence 
                  of food quality issues. This helps us process genuine complaints quickly and protect restaurants 
                  from false claims.
                </p>
              </div>
            </div>
          </div>

          {/* Complaint Description */}
          <div className="space-y-2">
            <Label htmlFor="complaint">Describe the Issue</Label>
            <Textarea
              id="complaint"
              placeholder="Please describe the problem with your food order (e.g., missing items, quality issues, foreign objects found, etc.)"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="min-h-24"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {complaint.length}/500 characters
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label>Upload Evidence (Photos/Videos)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload clear photos or videos of the food issue
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
            </div>
          </div>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({files.length})</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolution Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">What would you like?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" defaultChecked />
                Full refund
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" />
                Replace with new order
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" />
                Partial refund
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
