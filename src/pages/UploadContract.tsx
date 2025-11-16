import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Loader2, AlertTriangle, CheckCircle, TrendingUp, Calculator, MessageSquare, FileDown, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const clauses = [
  { title: "Payment Terms", status: "Compliant", risk: "low", lastSeen: "Q2 2024 - Apollo Chennai", notes: "90-day payment cycle" },
  { title: "Rate Escalation", status: "Variation", risk: "medium", lastSeen: "Q1 2024 - Max Delhi", notes: "8% annual vs standard 5%" },
  { title: "Termination Rights", status: "Non-Standard", risk: "high", lastSeen: "Never", notes: "30-day notice vs standard 90-day" },
  { title: "Quality Metrics", status: "Compliant", risk: "low", lastSeen: "Q3 2024 - Fortis Mumbai", notes: "NABH standards aligned" },
  { title: "Dispute Resolution", status: "Non-Standard", risk: "high", lastSeen: "Q4 2023 - Manipal", notes: "Arbitration clause missing" },
  { title: "Data Security", status: "Compliant", risk: "low", lastSeen: "Q2 2024 - Multiple", notes: "ISO 27001 certified" },
  { title: "Service Level Agreement", status: "Variation", risk: "medium", lastSeen: "Q1 2024 - Apollo Hyderabad", notes: "95% uptime vs 98% standard" },
  { title: "Auto-Renewal Clause", status: "Compliant", risk: "low", lastSeen: "Q3 2024 - Multiple", notes: "Standard 12-month renewal" },
];

const alerts = [
  {
    title: "Termination Rights - Non-Standard",
    severity: "high",
    description: "Proposed contract allows provider to terminate with 30-day notice. Our playbook requires minimum 90-day notice period.",
    impact: "High operational risk during transition periods",
    fallback: "Standard 90-day termination clause with 6-month transition assistance",
  },
  {
    title: "Dispute Resolution - Missing Arbitration",
    severity: "high",
    description: "Contract lacks approved arbitration language. Per regulatory compliance, all contracts must include ICADR-aligned dispute resolution.",
    impact: "Regulatory non-compliance, potential litigation exposure",
    fallback: "ICADR arbitration clause with Mumbai jurisdiction as per legal playbook",
  },
  {
    title: "Rate Escalation - Above Threshold",
    severity: "medium",
    description: "8% annual escalation proposed vs 5% maximum approved rate.",
    impact: "₹2.4 Cr additional cost over 3-year term",
    fallback: "5% annual escalation with quality-based performance incentives",
  },
];

const providers = [
  { name: "Apollo Hospitals (Current)", rate: 4200, year: "2025", status: "proposed" },
  { name: "Apollo Hospitals", rate: 3800, year: "2024", status: "contracted" },
  { name: "Max Healthcare", rate: 3600, year: "2024", status: "contracted" },
  { name: "Fortis Memorial", rate: 3500, year: "2024", status: "contracted" },
  { name: "Manipal Hospitals", rate: 3400, year: "2023", status: "contracted" },
];

const UploadContract = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [baseRate, setBaseRate] = useState(4200);
  const [escalation, setEscalation] = useState(8);
  const [incentive, setIncentive] = useState(10);

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-700 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "high": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const calculateImpact = () => {
    const monthlyVolume = 450;
    const year1 = baseRate * monthlyVolume * 12;
    const year2 = baseRate * (1 + escalation / 100) * monthlyVolume * 12;
    const year3 = baseRate * Math.pow(1 + escalation / 100, 2) * monthlyVolume * 12;
    const total = year1 + year2 + year3;
    const incentiveAmount = (total * incentive) / 100;
    
    return {
      year1: (year1 / 10000000).toFixed(2),
      year2: (year2 / 10000000).toFixed(2),
      year3: (year3 / 10000000).toFixed(2),
      total: ((total + incentiveAmount) / 10000000).toFixed(2),
      incentiveAmount: (incentiveAmount / 10000000).toFixed(2),
    };
  };

  const impact = calculateImpact();

  if (!showResults) {
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
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Contract Analysis Complete</h1>
              <p className="text-muted-foreground">
                Apollo Hospitals - Master Service Agreement • Extracted 42 clauses
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/approvals")} className="gap-2">
                Submit for Approval
              </Button>
              <Button variant="outline" className="gap-2">
                <FileDown className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-green-700 mb-1">5</p>
              <p className="text-sm text-green-600">Compliant Clauses</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-yellow-700 mb-1">2</p>
              <p className="text-sm text-yellow-600">Variations Detected</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-red-700 mb-1">2</p>
              <p className="text-sm text-red-600">Non-Standard Issues</p>
            </div>
          </div>

          {/* Clause Intelligence */}
          <Card className="p-6 border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Clause Intelligence
            </h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Clause Title</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Risk Level</TableHead>
                    <TableHead className="font-semibold">Last Seen In</TableHead>
                    <TableHead className="font-semibold">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clauses.map((clause, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground">{clause.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRiskColor(clause.risk)}>
                          {clause.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            clause.risk === "low" ? "bg-green-500" :
                            clause.risk === "medium" ? "bg-yellow-500" : "bg-red-500"
                          }`}></div>
                          <span className="text-sm capitalize">{clause.risk}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{clause.lastSeen}</TableCell>
                      <TableCell className="text-sm">{clause.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Compliance Alerts */}
          <Card className="p-6 border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Compliance Alerts
            </h2>
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <Card key={idx} className="p-6 border-l-4" style={{ 
                  borderLeftColor: alert.severity === "high" ? "rgb(220, 38, 38)" : "rgb(234, 179, 8)" 
                }}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {alert.severity === "high" ? (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            alert.severity === "high" 
                              ? "bg-red-100 text-red-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {alert.severity.toUpperCase()} SEVERITY
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{alert.description}</p>
                        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                          <p className="text-sm text-red-700">
                            <strong>Impact:</strong> {alert.impact}
                          </p>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800 mb-1 text-sm">Recommended Fallback Clause</p>
                            <p className="text-sm text-green-700">{alert.fallback}</p>
                          </div>
                        </div>
                        <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                          Apply Fallback Clause
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Benchmark & Financial Impact Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Benchmark */}
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Benchmark Analysis
              </h2>
              <div className="space-y-3">
                {providers.map((provider, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={provider.status === "proposed" ? "font-semibold text-foreground" : "text-muted-foreground"}>
                        {provider.name}
                      </span>
                      <span className={provider.status === "proposed" ? "font-bold text-red-600" : "text-foreground"}>
                        ₹{provider.rate.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative h-8 bg-secondary rounded-md overflow-hidden">
                      <div 
                        className={`h-full rounded-md ${provider.status === "proposed" ? "bg-red-500" : "bg-primary"}`}
                        style={{ width: `${(provider.rate / 4200) * 100}%` }}
                      ></div>
                      <span className="absolute inset-0 flex items-center px-3 text-xs text-white font-medium">
                        {provider.year} {provider.status === "proposed" && "• Proposed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">
                  <strong>Alert:</strong> Proposed rate is <strong>14% higher</strong> than similar providers in this region.
                </p>
              </div>
            </Card>

            {/* Financial Impact */}
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Financial Impact
              </h2>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-sm">Base Rate (Per Diem)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">₹</span>
                    <Input
                      id="rate"
                      type="number"
                      value={baseRate}
                      onChange={(e) => setBaseRate(Number(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="esc" className="text-sm">Annual Escalation</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="esc"
                      type="number"
                      value={escalation}
                      onChange={(e) => setEscalation(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span className="text-sm font-medium">Year 1</span>
                  <span className="text-lg font-bold">₹{impact.year1} Cr</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span className="text-sm font-medium">Year 2</span>
                  <span className="text-lg font-bold">₹{impact.year2} Cr</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span className="text-sm font-medium">Year 3</span>
                  <span className="text-lg font-bold">₹{impact.year3} Cr</span>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Value</span>
                    <span className="text-2xl font-bold">₹{impact.total} Cr</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-900 mb-1">Material Impact Warning</p>
                    <p className="text-xs text-red-700">
                      <strong>+₹19.4 Cr annually</strong> if accepted as drafted vs. playbook rates.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Co-Pilot Section */}
          <Card className="p-6 border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Ask Negotiation Co-Pilot
            </h2>
            <div className="space-y-4">
              <Textarea 
                placeholder="Ask questions about this contract, past deals, or negotiation strategies..." 
                className="min-h-24"
              />
              <div className="flex gap-2">
                <Button onClick={() => navigate("/copilot")} className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Open Full Co-Pilot Chat
                </Button>
                <Button variant="outline">Quick Question</Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "What did we sign with Apollo last time?",
                  "Give justification for lowering escalation",
                  "Suggest fallback for termination rights",
                  "Compare this rate with similar providers",
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    className="text-left text-xs p-2 border border-border rounded-md hover:bg-accent transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Upload Another Contract
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/redlining")} className="gap-2">
                Start Redlining
              </Button>
              <Button onClick={() => navigate("/approvals")} className="gap-2">
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadContract;
