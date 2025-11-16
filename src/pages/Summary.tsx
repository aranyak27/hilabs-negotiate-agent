import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import WorkflowProgress from "@/components/WorkflowProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileDown, Mail, CheckCircle, TrendingDown, Clock, Database, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Summary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExport = (type: string) => {
    toast({
      title: `Export ${type}`,
      description: `Generating ${type} report...`,
    });
  };

  const handleIntegration = (system: string) => {
    toast({
      title: `Integration: ${system}`,
      description: `Syncing contract data with ${system}...`,
    });
  };

  const milestones = [
    { date: "2025-01-10", event: "Contract received from Apollo Hospitals" },
    { date: "2025-01-11", event: "NLP extraction complete • 42 clauses identified" },
    { date: "2025-01-12", event: "Compliance review • 2 high-severity alerts flagged" },
    { date: "2025-01-14", event: "Counter-proposals drafted • Fallback clauses applied" },
    { date: "2025-01-15", event: "Negotiator approval • Sarah Chen signed off" },
    { date: "2025-01-18", event: "Legal approval • Raj Malhotra approved" },
    { date: "2025-01-19", event: "Finance approval • Priya Sharma approved" },
    { date: "2025-01-20", event: "Leadership approval • Dr. Anil Kumar approved" },
    { date: "2025-01-22", event: "Contract finalized • Ready for provider signature" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <Breadcrumbs />
          <WorkflowProgress />

          <div className="text-center space-y-3 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Negotiation Complete</h1>
            <p className="text-muted-foreground">
              Apollo Hospitals - Master Service Agreement (Final)
            </p>
          </div>

          {/* Before vs After Comparison */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Before vs After Comparison</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Metric</span>
                  <span className="text-sm font-medium text-red-700">Provider Proposal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Base Rate</span>
                  <span className="font-semibold text-red-700">₹4,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Escalation</span>
                  <span className="font-semibold text-red-700">8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Termination Notice</span>
                  <span className="font-semibold text-red-700">30 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">3-Year Value</span>
                  <span className="font-semibold text-red-700">₹67.4 Cr</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Metric</span>
                  <span className="text-sm font-medium text-green-700">Final Agreement</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Base Rate</span>
                  <span className="font-semibold text-green-700">₹3,850</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Escalation</span>
                  <span className="font-semibold text-green-700">5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Termination Notice</span>
                  <span className="font-semibold text-green-700">90 days + transition</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">3-Year Value</span>
                  <span className="font-semibold text-green-700">₹54.6 Cr</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Total Savings Achieved</span>
              </div>
              <span className="text-2xl font-bold text-green-900">₹12.8 Cr</span>
            </div>
          </Card>

          {/* Negotiation Timeline */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Negotiation Timeline
            </h2>
            <div className="space-y-3">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    {idx < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs text-muted-foreground mb-1">{milestone.date}</p>
                    <p className="text-sm text-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-900">
                <strong>Total Duration:</strong> 12 days (38% faster than average cycle time)
              </p>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Executive Summary</h2>
            <div className="space-y-4 text-sm">
              <p className="text-foreground leading-relaxed">
                Successfully negotiated contract renewal with Apollo Hospitals Bangalore. Final terms reflect 
                playbook compliance, market-competitive rates, and significant cost savings while maintaining 
                quality care standards and operational flexibility.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Negotiation Duration</p>
                  <p className="text-lg font-bold text-foreground">18 days</p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Contract Term</p>
                  <p className="text-lg font-bold text-foreground">3 years</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Terms Agreed</h3>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b border-border">
                  <p className="text-muted-foreground text-xs mb-1">Base Rate (Cardiology)</p>
                  <p className="font-semibold text-foreground">₹3,850 per diem</p>
                </div>
                <div className="pb-3 border-b border-border">
                  <p className="text-muted-foreground text-xs mb-1">Annual Escalation</p>
                  <p className="font-semibold text-foreground">5% (max cap)</p>
                </div>
                <div className="pb-3 border-b border-border">
                  <p className="text-muted-foreground text-xs mb-1">Quality Incentive Pool</p>
                  <p className="font-semibold text-foreground">2% of annual payout</p>
                </div>
                <div className="pb-3 border-b border-border">
                  <p className="text-muted-foreground text-xs mb-1">Termination Notice</p>
                  <p className="font-semibold text-foreground">90 days + 6-month transition</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Dispute Resolution</p>
                  <p className="font-semibold text-foreground">ICADR Arbitration, Mumbai</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Financial Impact</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-xs text-green-700 mb-1">Total Savings Achieved</p>
                  <p className="text-3xl font-bold text-green-900">₹12.8 Cr</p>
                  <p className="text-xs text-green-700 mt-1">vs. provider's initial proposal</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-xs text-blue-700 mb-1">Final Contract Value</p>
                  <p className="text-3xl font-bold text-blue-900">₹54.6 Cr</p>
                  <p className="text-xs text-blue-700 mt-1">3-year term including incentives</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-muted rounded">
                    <p className="text-muted-foreground mb-1">Year 1</p>
                    <p className="font-semibold">₹16.2 Cr</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-muted-foreground mb-1">Year 2</p>
                    <p className="font-semibold">₹17.0 Cr</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-muted-foreground mb-1">Year 3</p>
                    <p className="font-semibold">₹17.9 Cr</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-muted-foreground mb-1">Incentives</p>
                    <p className="font-semibold">₹3.5 Cr</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Compliance Status</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md hover-scale">
                <p className="text-2xl font-bold text-green-700 mb-1">100%</p>
                <p className="text-xs text-green-600">Playbook Aligned</p>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md hover-scale">
                <p className="text-2xl font-bold text-green-700 mb-1">4/4</p>
                <p className="text-xs text-green-600">Approvals Received</p>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md hover-scale">
                <p className="text-2xl font-bold text-green-700 mb-1">0</p>
                <p className="text-xs text-green-600">Regulatory Issues</p>
              </div>
            </div>
          </Card>

          {/* Integration Options */}
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              System Integration Options
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 gap-2"
                onClick={() => handleIntegration("FACETS")}
              >
                <Database className="w-6 h-6" />
                <span className="text-sm font-medium">Export to FACETS</span>
                <span className="text-xs text-muted-foreground">Claims system sync</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 gap-2"
                onClick={() => handleIntegration("Salesforce")}
              >
                <Share2 className="w-6 h-6" />
                <span className="text-sm font-medium">Push to Salesforce</span>
                <span className="text-xs text-muted-foreground">CRM integration</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 gap-2"
                onClick={() => handleIntegration("Rate Card")}
              >
                <FileDown className="w-6 h-6" />
                <span className="text-sm font-medium">Update Rate Card</span>
                <span className="text-xs text-muted-foreground">Pricing tables</span>
              </Button>
            </div>
          </Card>

          {/* Onboarding Checklist */}
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps & Onboarding</h3>
            <div className="space-y-2 text-sm">
              {[
                { task: "Provider to countersign final agreement", duration: "5 business days", status: "pending" },
                { task: "Contract admin to update system records", duration: "1 day", status: "pending" },
                { task: "Provider relations to schedule onboarding call", duration: "2 days", status: "pending" },
                { task: "Claims team to configure new rates", duration: "3 days", status: "pending" },
                { task: "Quality team to set up performance tracking", duration: "2 days", status: "pending" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-foreground">{item.task}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2 hover-scale" onClick={() => handleExport("PDF")}>
              <FileDown className="w-5 h-5" />
              Export Negotiation Packet (PDF)
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => handleExport("Email")}>
              <Mail className="w-5 h-5" />
              Email to Stakeholders
            </Button>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summary;
