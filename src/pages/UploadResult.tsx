import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";

const UploadResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileName = searchParams.get("fileName") || "document";
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const blob = new Blob(
      [
        `Auto-filled document for: ${fileName}\n\n` +
          `Company: Rapid Comply Solutions\n` +
          `Document Type: Compliance Form\n` +
          `Generated: ${new Date().toLocaleString()}\n\n` +
          `This is a sample auto-filled document with pre-populated answers based on the uploaded file.\n\n` +
          `Section 1: Company Information\n` +
          `- Company Name: [Auto-filled based on document analysis]\n` +
          `- Registration Number: [Extracted from uploaded document]\n` +
          `- Address: [Auto-populated from file]\n\n` +
          `Section 2: Compliance Requirements\n` +
          `- Regulatory Framework: [Identified automatically]\n` +
          `- Compliance Status: [Generated based on analysis]\n` +
          `- Required Actions: [Auto-suggested]\n\n` +
          `Section 3: Risk Assessment\n` +
          `- Risk Level: [Calculated automatically]\n` +
          `- Mitigation Strategies: [Auto-recommended]\n\n` +
          `Please review all auto-filled information and make necessary adjustments.`,
      ],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapid-comply-autofilled-${fileName.split(".")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <DashboardLayout>
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
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {isReady ? (
                <CheckCircle className="h-16 w-16 text-success" />
              ) : (
                <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isReady
                ? "Auto-filled File Ready!"
                : "Processing Your Document..."}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            {isReady ? (
              <>
                <p className="text-muted-foreground">
                  Your document has been successfully processed and an
                  auto-filled compliance form has been generated based on the
                  uploaded file: <strong>{fileName}</strong>
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        rapid-comply-autofilled-{fileName.split(".")[0]}.txt
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Auto-filled compliance document
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleDownload} className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download Auto-filled Document
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>What's included:</strong>
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-1">
                    <li>• Pre-populated company information</li>
                    <li>• Auto-identified compliance requirements</li>
                    <li>• Generated risk assessment</li>
                    <li>• Recommended mitigation strategies</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Please wait while we analyze your document and generate the
                  auto-filled compliance form...
                </p>
                <div className="text-sm text-muted-foreground">
                  Analyzing: <strong>{fileName}</strong>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadResult;
