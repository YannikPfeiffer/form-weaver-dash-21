import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [selectedContributors, setSelectedContributors] = useState<string[]>([]);

  const contributors = [
    "Sarah Johnson - Legal Team",
    "Michael Chen - Compliance Officer", 
    "Emma Davis - Risk Management",
    "Robert Wilson - Operations Manager",
    "Lisa Anderson - Quality Assurance"
  ];

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

  const handleContributorChange = (contributor: string, checked: boolean) => {
    if (checked) {
      setSelectedContributors([...selectedContributors, contributor]);
    } else {
      setSelectedContributors(selectedContributors.filter(c => c !== contributor));
    }
  };

  const handleSend = () => {
    if (selectedContributors.length === 0) {
      toast({
        title: "No contributors selected",
        description: "Please select at least one contributor.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Document sent successfully",
      description: `Document sent to ${selectedContributors.length} contributor(s).`,
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
    <DashboardLayout title="Document Processing">
      <div className="max-w-4xl mx-auto space-y-6">
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
          <div className="space-y-6">
            {/* Document with answers filled */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Auto-filled Document
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">
                      Answers filled: {answersProgress}%
                    </div>
                    <Progress value={answersProgress} className="w-32" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="bg-muted/30 border border-border rounded-lg p-6 min-h-[400px]">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Supplier Questionnaire - ONI Wärmetrafo GmbH
                    </h3>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-foreground">Company Name:</label>
                        <div className="bg-success/20 px-2 py-1 rounded mt-1">
                          <span className="text-foreground">Rapid Comply Solutions GmbH</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-foreground">Registration Number:</label>
                        <div className="bg-success/20 px-2 py-1 rounded mt-1">
                          <span className="text-foreground">HRB 123456</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="font-medium text-foreground">Business Address:</label>
                      <div className="bg-success/20 px-2 py-1 rounded mt-1">
                        <span className="text-foreground">Musterstraße 123, 12345 Berlin, Germany</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-foreground">Industry Sector:</label>
                        <div className="bg-success/20 px-2 py-1 rounded mt-1">
                          <span className="text-foreground">Compliance & Risk Management</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-foreground">Number of Employees:</label>
                        <div className="bg-success/20 px-2 py-1 rounded mt-1">
                          <span className="text-foreground">250-500</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="font-medium text-foreground">Quality Management System:</label>
                      <div className="bg-success/20 px-2 py-1 rounded mt-1">
                        <span className="text-foreground">ISO 9001:2015 certified</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="font-medium text-foreground">Environmental Management:</label>
                      <div className="bg-success/20 px-2 py-1 rounded mt-1">
                        <span className="text-foreground">ISO 14001:2015 certified, Carbon neutral operations</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded">
                      <strong>Auto-filled sections:</strong> Company information, certifications, compliance status, risk assessment. 
                      Green highlights indicate automatically populated fields based on document analysis.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contributors selection */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Select Contributors
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Choose team members to review and collaborate on this document:
                </p>
                
                <div className="space-y-3">
                  {contributors.map((contributor) => (
                    <div key={contributor} className="flex items-center space-x-3">
                      <Checkbox
                        id={contributor}
                        checked={selectedContributors.includes(contributor)}
                        onCheckedChange={(checked) => 
                          handleContributorChange(contributor, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={contributor}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {contributor}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSend}
                    className="w-full"
                    disabled={selectedContributors.length === 0}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Contributors ({selectedContributors.length})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DocumentProcessing;