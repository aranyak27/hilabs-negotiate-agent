import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Clock, Shield, TrendingDown, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Sarah Chen
            </h1>
            <p className="text-muted-foreground">
              Contract Negotiation Lead • Payer Contracting Team
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-border">
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

            <Card className="p-6 border-border">
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

            <Card className="p-6 border-border">
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

            <Card className="p-6 border-border">
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

          {/* Pending Contracts */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Pending Contracts</h2>
            <div className="space-y-3">
              {[
                { name: "Apollo Hospitals - Bangalore", status: "Awaiting Legal Review", priority: "high", days: 3 },
                { name: "Max Healthcare - Delhi NCR", status: "Financial Impact Analysis", priority: "medium", days: 7 },
                { name: "Fortis Memorial - Gurgaon", status: "Benchmark Comparison", priority: "medium", days: 5 },
              ].map((contract, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{contract.name}</p>
                    <p className="text-sm text-muted-foreground">{contract.status}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contract.days >= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {contract.days} days old
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="flex justify-center pt-4">
            <Link to="/upload">
              <Button size="lg" className="gap-2">
                <Upload className="w-5 h-5" />
                Upload Provider Contract
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
