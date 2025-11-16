import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ArrowRight, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Simulator = () => {
  const navigate = useNavigate();
  const [baseRate, setBaseRate] = useState(4200);
  const [escalation, setEscalation] = useState(8);
  const [incentive, setIncentive] = useState(10);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Financial Impact Simulator</h1>
              <p className="text-muted-foreground">
                Forecast payout impact based on claims volume and contract terms
              </p>
            </div>
            <Button onClick={() => navigate("/copilot")} className="gap-2">
              Ask Negotiation Co-Pilot
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Parameters */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Contract Parameters
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="baseRate">Base Rate (Per Diem)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">₹</span>
                    <Input
                      id="baseRate"
                      type="number"
                      value={baseRate}
                      onChange={(e) => setBaseRate(Number(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Current proposal: ₹4,200</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="escalation">Annual Escalation Rate</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="escalation"
                      type="number"
                      value={escalation}
                      onChange={(e) => setEscalation(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Playbook maximum: 5%</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incentive">Quality Incentive Pool</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="incentive"
                      type="number"
                      value={incentive}
                      onChange={(e) => setIncentive(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Of total annual payout</p>
                </div>

                <div className="p-4 bg-muted rounded-md space-y-2">
                  <p className="text-sm font-medium">Claims Volume Assumptions</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Monthly Volume:</span>
                      <span className="font-semibold ml-1">450 cases</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Annual Growth:</span>
                      <span className="font-semibold ml-1">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Output Projection */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">3-Year Financial Projection</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="text-sm font-medium">Year 1 (2025)</span>
                    <span className="text-lg font-bold">₹{impact.year1} Cr</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="text-sm font-medium">Year 2 (2026)</span>
                    <span className="text-lg font-bold">₹{impact.year2} Cr</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="text-sm font-medium">Year 3 (2027)</span>
                    <span className="text-lg font-bold">₹{impact.year3} Cr</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-900">Quality Incentive Pool</span>
                    <span className="text-lg font-bold text-blue-900">₹{impact.incentiveAmount} Cr</span>
                  </div>
                  <p className="text-xs text-blue-700">Based on {incentive}% of total payout</p>
                </div>

                <div className="p-6 bg-primary text-primary-foreground rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Contract Value</span>
                    <span className="text-3xl font-bold">₹{impact.total} Cr</span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">3-year term including incentives</p>
                </div>

                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-md">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-900 mb-1">Material Impact Warning</p>
                      <p className="text-xs text-red-700">
                        Financial impact: <strong>+₹19.4 Cr annually</strong> if accepted as drafted vs. playbook-compliant rates (₹3,800 base, 5% escalation).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Simulator;
