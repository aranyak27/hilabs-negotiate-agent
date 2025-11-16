import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, Mail, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-3">
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
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-2xl font-bold text-green-700 mb-1">100%</p>
                <p className="text-xs text-green-600">Playbook Aligned</p>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-2xl font-bold text-green-700 mb-1">4/4</p>
                <p className="text-xs text-green-600">Approvals Received</p>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-2xl font-bold text-green-700 mb-1">0</p>
                <p className="text-xs text-green-600">Regulatory Issues</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
            <ol className="space-y-2 text-sm list-decimal list-inside text-foreground">
              <li>Provider to countersign final agreement (target: 5 business days)</li>
              <li>Contract admin to update system records and rate tables</li>
              <li>Provider relations to schedule onboarding call</li>
              <li>Claims team to configure new rates effective from contract start date</li>
              <li>Quality team to set up performance metric tracking dashboard</li>
            </ol>
          </Card>

          <div className="flex items-center gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2">
              <FileDown className="w-5 h-5" />
              Export Negotiation Packet (PDF)
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
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
