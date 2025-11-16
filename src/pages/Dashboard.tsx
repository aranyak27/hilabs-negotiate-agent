import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import NextActionBanner from "@/components/NextActionBanner";
import FinancialWidget from "@/components/FinancialWidget";
import ActivityFeed from "@/components/ActivityFeed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Clock, Shield, TrendingDown, Zap, Eye, Play, MessageSquare, Share2, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const contracts = [
    { 
      name: "Apollo Hospitals - Bangalore", 
      status: "Awaiting Legal Review", 
      days: 3,
      urgency: "high",
      riskLevel: "high" as const,
      savings: 8.2,
      nextAction: "Send to Legal for arbitration review",
      actionOwner: "Legal Team"
    },
    { 
      name: "Max Healthcare - Delhi NCR", 
      status: "Financial Impact Analysis", 
      days: 7,
      urgency: "high",
      riskLevel: "medium" as const,
      savings: 5.4,
      nextAction: "Finance team to validate escalation impact",
      actionOwner: "Finance Team"
    },
    { 
      name: "Fortis Memorial - Gurgaon", 
      status: "Benchmark Comparison", 
      days: 5,
      urgency: "medium",
      riskLevel: "low" as const,
      savings: 3.1,
      nextAction: "Review compliance alerts",
      actionOwner: "Contracting Team"
    },
  ];

  const handleQuickAction = (action: string, contractName: string) => {
    toast({
      title: "Action initiated",
      description: `${action} for ${contractName}`,
    });
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <Breadcrumbs />

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
              Welcome back, Sarah Chen
            </h1>
            <p className="text-muted-foreground">
              Contract Negotiation Lead • Payer Contracting Team
            </p>
          </div>

          {/* Next Action Banner */}
          <NextActionBanner
            title="Next Best Action"
            description="3 contracts require immediate attention"
            action="Review High Priority"
            onAction={() => {
              navigate("/upload");
              setTimeout(() => {
                const firstAlert = document.querySelector('[data-alert="high"]');
                firstAlert?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 100);
            }}
            variant="urgent"
          />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-border hover-scale transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Cycle Time</p>
                  <p className="text-2xl font-bold text-foreground">18 days</p>
                  <p className="text-xs text-green-600">↓ 23% vs last quarter</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border hover-scale transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leakage Prevented</p>
                  <p className="text-2xl font-bold text-foreground">₹47.2 Cr</p>
                  <p className="text-xs text-green-600">This fiscal year</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border hover-scale transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-xs text-muted-foreground">Across 127 contracts</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border hover-scale transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Onboarding TAT</p>
                  <p className="text-2xl font-bold text-foreground">12 days</p>
                  <p className="text-xs text-green-600">↓ 31% improvement</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending Contracts - 2/3 width */}
            <div className="lg:col-span-2">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Pending Contracts</h2>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                    3 Urgent
                  </Badge>
                </div>
                <div className="space-y-3">
                  {contracts.map((contract, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg hover:bg-accent transition-all animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{contract.name}</p>
                            <Badge variant="outline" className={
                              contract.riskLevel === "high" ? "bg-red-100 text-red-700 border-red-200" :
                              contract.riskLevel === "medium" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                              "bg-green-100 text-green-700 border-green-200"
                            }>
                              {contract.riskLevel.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{contract.status}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className={`px-2 py-1 rounded-full ${
                              contract.days >= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {contract.days} days old
                            </span>
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingDown className="w-3 h-3" />
                              <span className="font-semibold">₹{contract.savings} Cr potential savings</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-xs font-medium text-foreground">Next: {contract.nextAction}</p>
                            <p className="text-xs text-muted-foreground">{contract.actionOwner}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleQuickAction("View", contract.name)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => navigate("/upload")}
                            className="h-8 w-8 p-0"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleQuickAction("Ask Co-Pilot", contract.name)}
                            className="h-8 w-8 p-0"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleQuickAction("Share", contract.name)}
                            className="h-8 w-8 p-0"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Activity Feed - 1/3 width */}
            <div>
              <ActivityFeed />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
