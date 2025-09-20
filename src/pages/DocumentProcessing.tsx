import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Send, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentProcessing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileName = searchParams.get("fileName") || "document";
  
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const [answersProgress, setAnswersProgress] = useState(0);


  useEffect(() => {
    // Simulate document processing
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessed(true);
          // Set random answers completion percentage
          setAnswersProgress(Math.floor(Math.random() * 30) + 70); // 70-100%
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);


  const handleSend = () => {
    toast({
      title: "Document sent successfully",
      description: "Document has been sent for collaboration.",
    });

    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/upload');
  };

  return (
    <DashboardLayout 
      title="Document Processing" 
      showSearch={false} 
      showUploadButton={false}
    >
      <div className="h-full flex flex-col space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Upload
        </Button>

        {!isProcessed ? (
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-foreground">
                Processing Document
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Analyzing and auto-filling: <strong>{fileName}</strong>
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing...</span>
                    <span className="text-foreground">{processingProgress}%</span>
                  </div>
                  <Progress value={processingProgress} />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Split Layout */}
            <div className="flex-1 flex gap-6">
              {/* Left - PDF Viewer */}
              <div className="w-1/2">
                <Card className="shadow-card h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {fileName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full">
                    <div className="bg-muted/30 border border-border rounded-lg h-full min-h-[600px] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">PDF Viewer</p>
                        <p className="text-sm text-muted-foreground mt-2">Document preview would appear here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right - Analysis Panel */}
              <div className="w-1/2 flex flex-col gap-4">
                {/* Answers Progress */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Processing Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Answers filled:</span>
                        <span className="text-sm font-medium text-foreground">{answersProgress}%</span>
                      </div>
                      <Progress value={answersProgress} />
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Answers Preview */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Pending Collaborator Input</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm font-medium text-amber-800">Environmental Certifications</p>
                        <p className="text-xs text-amber-600 mt-1">Waiting for compliance team review</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Financial Information</p>
                        <p className="text-xs text-blue-600 mt-1">Pending finance department approval</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Chat Bot */}
                <Card className="shadow-card flex-1">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">AI Assistant</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="flex-1 bg-muted/30 border border-border rounded-lg p-4 min-h-[200px]">
                      <div className="space-y-3">
                        <div className="bg-background p-3 rounded-lg border">
                          <p className="text-sm text-muted-foreground">💡 <strong>AI:</strong> I've analyzed your document and auto-filled {answersProgress}% of the questions. Ask me anything about the document or where to find specific information!</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Ask about the document..." 
                        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                      <Button size="sm">Ask</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Footer with Send Button */}
            <div className="border-t border-border bg-card/50 p-4 mt-6">
              <div className="flex justify-end">
                <Button 
                  onClick={handleSend}
                  className="px-8"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DocumentProcessing;