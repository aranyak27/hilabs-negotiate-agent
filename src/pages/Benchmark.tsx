import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Benchmark = () => {
  const navigate = useNavigate();

  const providers = [
    { name: "Apollo Hospitals (Current)", rate: 4200, year: "2025", status: "proposed" },
    { name: "Apollo Hospitals", rate: 3800, year: "2024", status: "contracted" },
    { name: "Max Healthcare", rate: 3600, year: "2024", status: "contracted" },
    { name: "Fortis Memorial", rate: 3500, year: "2024", status: "contracted" },
    { name: "Manipal Hospitals", rate: 3400, year: "2023", status: "contracted" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Benchmark & Past Deals</h1>
              <p className="text-muted-foreground">
                Compare proposed rates against historical contracts and market benchmarks
              </p>
            </div>
            <Button onClick={() => navigate("/simulator")} className="gap-2">
              Run Financial Impact
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rate Comparison Chart */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Per Diem Rate Comparison (Cardiology)
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
                  <strong>Alert:</strong> Proposed rate is <strong>14% higher</strong> than similar providers in this region and specialty mix.
                </p>
              </div>
            </Card>

            {/* Historical Performance */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Historical Performance Data</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-medium text-blue-900 mb-1">Previous Apollo Contract (2024)</p>
                  <p className="text-xs text-blue-700 mb-2">Negotiated down from ₹4,100 to ₹3,800</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-blue-600">Final Rate:</span>
                      <span className="font-semibold ml-1">₹3,800</span>
                    </div>
                    <div>
                      <span className="text-blue-600">Escalation:</span>
                      <span className="font-semibold ml-1">5% annual</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-md">
                  <p className="text-sm font-medium text-foreground mb-2">Key Negotiation Points (2024)</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Provider agreed to 90-day termination notice</li>
                    <li>• Quality metrics tied to 10% of incentives</li>
                    <li>• Added tele-consultation at no extra cost</li>
                    <li>• Dispute resolution through ICADR arbitration</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm font-medium text-green-900 mb-1">Market Benchmark (2025)</p>
                  <p className="text-xs text-green-700">Tier-1 hospital, cardiology specialty</p>
                  <div className="mt-2 text-xs">
                    <span className="text-green-600">Recommended Range:</span>
                    <span className="font-semibold ml-1 text-green-900">₹3,600 - ₹3,900</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Negotiation Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Similar Providers (2024)</p>
                <p className="text-2xl font-bold text-foreground">₹3,550</p>
                <p className="text-xs text-green-600">Average rate for comparable facilities</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Negotiation Leverage</p>
                <p className="text-2xl font-bold text-foreground">Strong</p>
                <p className="text-xs text-primary">Historical relationship + volume commitment</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Market Position</p>
                <p className="text-2xl font-bold text-foreground">Above</p>
                <p className="text-xs text-yellow-600">Proposed rate in top 10th percentile</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Benchmark;
