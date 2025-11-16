import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UploadContract = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/clauses");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Upload Provider Contract</h1>
            <p className="text-muted-foreground">
              Upload PDF, Word, or scanned documents for AI-powered clause extraction
            </p>
          </div>

          <Card className="p-12 border-2 border-dashed border-border hover:border-primary transition-colors">
            {!isProcessing ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Drop your contract here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, DOCX, and scanned images
                  </p>
                </div>
                <Button onClick={handleUpload} size="lg" className="gap-2">
                  <FileText className="w-5 h-5" />
                  Select File
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Processing Contract
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Extracting clauses with NLP Intelligence...
                  </p>
                  <div className="max-w-md mx-auto bg-secondary rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full w-2/3 animate-pulse"></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Apollo Hospitals - Master Service Agreement.pdf
                  </p>
                </div>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">127</p>
                <p className="text-sm text-muted-foreground">Contracts Processed</p>
              </div>
            </Card>
            <Card className="p-4 border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
            </Card>
            <Card className="p-4 border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">18s</p>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadContract;
