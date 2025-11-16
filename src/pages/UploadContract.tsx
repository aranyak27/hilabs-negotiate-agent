import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import WorkflowProgress from "@/components/WorkflowProgress";
import NextActionBanner from "@/components/NextActionBanner";
import FinancialWidget from "@/components/FinancialWidget";
import PastInstancesModal from "@/components/PastInstancesModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Upload, FileText, Loader2, AlertTriangle, CheckCircle, TrendingUp, Calculator, MessageSquare, FileDown, Info, Filter, CheckCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [baseRate, setBaseRate] = useState(4200);
  const [escalation, setEscalation] = useState(8);
  const [incentive, setIncentive] = useState(10);
  const [riskFilter, setRiskFilter] = useState("all");
  const [resolvedAlerts, setResolvedAlerts] = useState<number[]>([]);
  const [pastInstancesModal, setPastInstancesModal] = useState<{ open: boolean; clauseTitle: string; alertIndex: number }>({ open: false, clauseTitle: "", alertIndex: -1 });
  const [statusFilter, setStatusFilter] = useState("all");

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
      toast({
        title: "Contract processed successfully",
        description: "42 clauses extracted • 2 compliance issues detected",
      });
    }, 3000);
  };

  const handleAcceptCompliant = () => {
    toast({
      title: "Compliant clauses accepted",
      description: "5 clauses marked as approved",
    });
  };

  const handleApplyFallback = (alertIndex: number, alertTitle: string) => {
    setResolvedAlerts([...resolvedAlerts, alertIndex]);
    toast({
      title: "Fallback applied",
      description: `${alertTitle} - Ready for Legal review`,
      action: (
        <Button size="sm" onClick={() => navigate("/approvals")}>
          Notify Legal
        </Button>
      ),
    });
  };

  const handleViewPastInstances = (clauseTitle: string, alertIndex: number) => {
    setPastInstancesModal({ open: true, clauseTitle, alertIndex });
  };

  const pastInstances = [
    {
      contract: "Apollo Hospitals Chennai - 2024",
      date: "Q2 2024",
      outcome: "accepted" as const,
      notes: "Accepted 90-day termination with 6-month transition period. No issues during contract term."
    },
    {
      contract: "Max Healthcare Delhi - 2024",
      date: "Q1 2024",
      outcome: "accepted" as const,
      notes: "Implemented standard clause. Provider initially resisted but accepted after showing market benchmarks."
    },
    {
      contract: "Fortis Mumbai - 2023",
      date: "Q4 2023",
      outcome: "risky" as const,
      notes: "Accepted 60-day notice. Led to operational challenges during transition period. Not recommended."
    },
  ];

  const filteredClauses = clauses.filter(clause => {
    const matchesRisk = riskFilter === "all" || clause.risk === riskFilter;
    const matchesStatus = statusFilter === "all" || clause.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesRisk && matchesStatus;
  });

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
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <Breadcrumbs />
          <WorkflowProgress />

          {/* Header with Financial Widget */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">Contract Analysis Complete</h1>
              <p className="text-muted-foreground mb-4">
                Apollo Hospitals - Master Service Agreement • Extracted 42 clauses
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Est. approval time: <strong className="text-foreground">5-7 days</strong></span>
                </div>
              </div>
            </div>
            <FinancialWidget
              savings={12.8}
              payoutChange={19.4}
              riskLevel="high"
            />
          </div>

          {/* Next Action Banner */}
          <NextActionBanner
            title="Next Best Action"
            description="Review 2 high-severity compliance alerts before proceeding"
            action="Jump to Compliance"
            onAction={() => document.getElementById("compliance-section")?.scrollIntoView({ behavior: "smooth" })}
            variant="urgent"
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center hover-scale">
              <p className="text-3xl font-bold text-green-700 mb-1">5</p>
              <p className="text-sm text-green-600">Compliant Clauses</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center hover-scale">
              <p className="text-3xl font-bold text-yellow-700 mb-1">2</p>
              <p className="text-sm text-yellow-600">Variations Detected</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center hover-scale">
              <p className="text-3xl font-bold text-red-700 mb-1">2</p>
              <p className="text-sm text-red-600">Non-Standard Issues</p>
            </div>
          </div>

          {/* Benchmark & Financial Impact - MOVED UP */}
          <div id="financial-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-20">
            {/* Benchmark */}
            <Card className="p-6 border-border animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Benchmark Analysis
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Compare proposed rates against historical contracts and market data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
              <div className="space-y-3">
                {providers.map((provider, idx) => (
                  <div key={idx} className="space-y-2 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
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
                        className={`h-full rounded-md transition-all ${provider.status === "proposed" ? "bg-red-500" : "bg-primary"}`}
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
                  <strong>Alert:</strong> Proposed rate is <strong>14% higher</strong> than similar providers.
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Recommendation: Negotiate down to ₹3,600-₹3,900 range for market competitiveness
                </p>
              </div>
            </Card>

            {/* Financial Impact Simulator */}
            <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Financial Impact Simulator
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Adjust rates and escalation to see real-time financial impact</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                  <p className="text-xs text-muted-foreground">Playbook recommended: ₹3,600-₹3,900</p>
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
                  <p className="text-xs text-muted-foreground">Playbook maximum: 5%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-md transition-all hover:bg-muted/70">
                  <span className="text-sm font-medium">Year 1</span>
                  <span className="text-lg font-bold">₹{impact.year1} Cr</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md transition-all hover:bg-muted/70">
                  <span className="text-sm font-medium">Year 2</span>
                  <span className="text-lg font-bold">₹{impact.year2} Cr</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md transition-all hover:bg-muted/70">
                  <span className="text-sm font-medium">Year 3</span>
                  <span className="text-lg font-bold">₹{impact.year3} Cr</span>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Contract Value</span>
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

          {/* Compliance Alerts */}
          <Card id="compliance-section" className="p-6 border-border scroll-mt-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Compliance Alerts
              </h2>
              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                2 High Severity
              </Badge>
            </div>
            <div className="space-y-4">
              {alerts.map((alert, idx) => {
                const isResolved = resolvedAlerts.includes(idx);
                return (
                  <Card 
                    key={idx} 
                    data-alert={alert.severity}
                    className={`p-6 border-l-4 animate-fade-in transition-all ${isResolved ? 'opacity-50' : ''}`}
                    style={{ 
                      borderLeftColor: isResolved ? "rgb(34, 197, 94)" : (alert.severity === "high" ? "rgb(220, 38, 38)" : "rgb(234, 179, 8)"),
                      animationDelay: `${idx * 100}ms`
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {isResolved ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : alert.severity === "high" ? (
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                            <div className="flex items-center gap-2">
                              {isResolved ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                  ✓ RESOLVED
                                </span>
                              ) : (
                                <>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    alert.severity === "high" 
                                      ? "bg-red-100 text-red-700" 
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}>
                                    SEVERITY {alert.severity === "high" ? "5/5" : "3/5"}
                                  </span>
                                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                                    ₹2.4 Cr impact
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{alert.description}</p>
                          
                          {/* Side by Side Comparison */}
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                              <p className="text-xs font-semibold text-red-900 mb-1">Provider Language</p>
                              <p className="text-sm text-red-700">{alert.description}</p>
                            </div>
                            <div className={`p-3 border rounded-md ${isResolved ? 'bg-green-100 border-green-300' : 'bg-green-50 border-green-200'}`}>
                              <p className="text-xs font-semibold text-green-900 mb-1">
                                {isResolved ? 'Applied Fallback ✓' : 'Recommended Fallback'}
                              </p>
                              <p className="text-sm text-green-700">{alert.fallback}</p>
                            </div>
                          </div>

                          <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                            <p className="text-sm text-amber-700">
                              <strong>Impact:</strong> {alert.impact}
                            </p>
                          </div>
                        </div>

                        {!isResolved && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApplyFallback(idx, alert.title)}
                            >
                              Apply Fallback Clause
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewPastInstances(alert.title, idx)}
                            >
                              View Past Instances
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Preview Contract After Applying All Fallbacks
            </Button>
          </Card>

          {/* Clause Intelligence */}
          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Clause Intelligence
              </h2>
              <div className="flex items-center gap-2">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="variation">Variation</SelectItem>
                    <SelectItem value="non-standard">Non-Standard</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" onClick={handleAcceptCompliant} className="gap-1">
                  <CheckCheck className="w-4 h-4" />
                  Accept All Compliant
                </Button>
              </div>
            </div>
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
                  {filteredClauses.map((clause, idx) => (
                    <TableRow 
                      key={idx} 
                      className="hover:bg-muted/30 cursor-pointer transition-colors animate-fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                      onClick={() => toast({
                        title: clause.title,
                        description: `View details and ${clause.lastSeen}`,
                      })}
                    >
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
                <Button variant="outline">Generate Negotiation Email</Button>
                <Button variant="outline">Generate Talking Points</Button>
                <Button variant="outline">Summarize Changes</Button>
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
              <Button onClick={() => navigate("/approvals")} className="gap-2 hover-scale">
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </main>

      <PastInstancesModal
        open={pastInstancesModal.open}
        onOpenChange={(open) => setPastInstancesModal({ ...pastInstancesModal, open })}
        clauseTitle={pastInstancesModal.clauseTitle}
        instances={pastInstances}
        recommendation="Based on historical data, we recommend implementing the standard 90-day termination clause with a 6-month transition period. This approach has been successfully negotiated in 85% of similar contracts and reduces operational risk during provider transitions."
      />
    </div>
  );
};

export default UploadContract;
