import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = useCallback(() => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a document to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto redirect to document processing
          setTimeout(() => {
            navigate(`/document-processing?fileName=${encodeURIComponent(file?.name || "document")}`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [file, toast]);

  const handleSubmit = () => {
    if (uploadProgress === 100) {
      navigate(`/document-processing?fileName=${encodeURIComponent(file?.name || "document")}`);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <DashboardLayout title="Upload Document">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground text-center">
              Upload Document
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Choose a document to upload
                </h3>
                <p className="text-muted-foreground">
                  Select a PDF, DOCX, or other document file
                </p>
                <Input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                  className="max-w-xs mx-auto"
                />
              </div>
            </div>

            {file && (
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">{file.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {uploading && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uploading...</span>
                      <span className="text-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                {!uploading && (
                  <Button onClick={handleUpload} className="w-full">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Upload;