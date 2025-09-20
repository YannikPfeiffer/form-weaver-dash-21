import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Send, Users, Building2, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Document, pdfjs } from "react-pdf";

// Use the .mjs worker from public folder
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const DocumentProcessing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileName = searchParams.get("fileName") || "document";

  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const [answersProgress, setAnswersProgress] = useState(0);
  const [pendingAnswers] = useState(3);
  const [chatMessage, setChatMessage] = useState("");

  const customerInfo = {
    name: "Sarah Johnson",
    company: "Microsoft Corporation",
    email: "s.johnson@microsoft.com",
    phone: "+1 (555) 123-4567",
  };

  const collaborators = [
    { id: "1", name: "John Doe", initials: "JD", avatar: "" },
    { id: "2", name: "Jane Smith", initials: "JS", avatar: "" },
    { id: "3", name: "Mike Johnson", initials: "MJ", avatar: "" },
    { id: "4", name: "Sarah Wilson", initials: "SW", avatar: "" },
    { id: "5", name: "Tom Brown", initials: "TB", avatar: "" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessed(true);
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

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleBack = () => {
    navigate("/upload");
  };

  return (
    <DashboardLayout showSearch={false} showUploadButton={false}>
      <div className="h-full flex flex-col space-y-6">
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
                    <span className="text-foreground">
                      {processingProgress}%
                    </span>
                  </div>
                  <Progress value={processingProgress} />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex gap-6">
              {/* Left - PDF Viewer */}
              <div className="w-1/2">
                <Document file="assets/03_Lieferantenstammdaten (1).pdf" />
              </div>

              {/* Right - Analysis Panel */}
              <div className="w-1/2 flex flex-col gap-4">
                {/* Customer Info & Status */}
                <div className="flex flex-row w-full gap-4">
                  <Card className="shadow-card flex-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {customerInfo.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {customerInfo.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {customerInfo.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {customerInfo.phone}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card flex-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold text-foreground">
                        Processing Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 w-100">
                      <div className="flex flex-col w-full">
                        <div style={{ paddingBottom: "4rem" }}>
                          <div
                            className="flex justify-between items-center"
                            style={{ paddingBottom: "0.3rem" }}
                          >
                            <span className="text-sm text-muted-foreground">
                              Answer Completion
                            </span>
                            <span className="text-sm font-medium text-foreground">
                              {answersProgress}%
                            </span>
                          </div>
                          <Progress value={answersProgress} className="h-2" />
                        </div>

                        {/* Collaborators */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {collaborators.slice(0, 4).map((c) => (
                                <Avatar
                                  key={c.id}
                                  className="h-6 w-6 border-2 border-card"
                                >
                                  <AvatarImage src={c.avatar} alt={c.name} />
                                  <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                                    {c.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {collaborators.length > 4 && (
                                <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                                  <span className="text-xs font-semibold text-muted-foreground">
                                    +{collaborators.length - 4}
                                  </span>
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {pendingAnswers} pending
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                          >
                            View All
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Assistant */}
                <Card className="shadow-card flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-foreground">
                      AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="flex-1 bg-muted/20 rounded-lg p-3 min-h-[200px] space-y-3 overflow-y-auto">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary-foreground">
                            AI
                          </span>
                        </div>
                        <div className="bg-background rounded-lg p-3 border flex-1">
                          <p className="text-sm text-foreground">
                            I've analyzed your document and auto-filled{" "}
                            {answersProgress}% of the questions. I found
                            information about environmental compliance and
                            financial data that needs review. How can I help you
                            today?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        placeholder="Ask about the document..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        onKeyPress={(e) =>
                          e.key === "Enter" && setChatMessage("")
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => setChatMessage("")}
                        disabled={!chatMessage.trim()}
                      >
                        Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="border-t border-border bg-card/50 p-4 mt-6">
              <div className="flex justify-end">
                <Button onClick={handleSend} className="px-8">
                  <Send className="h-4 w-4 mr-2" /> Send
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
