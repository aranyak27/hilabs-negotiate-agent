import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const alerts = [
  {
    title: "Termination Rights - Non-Standard",
    severity: "high",
    description: "Proposed contract allows provider to terminate with 30-day notice. Our playbook requires minimum 90-day notice period to ensure care continuity.",
    impact: "High operational risk during transition periods",
    fallback: "Standard 90-day termination clause with 6-month transition assistance for patient handoff",
  },
  {
    title: "Dispute Resolution - Missing Arbitration",
    severity: "high",
    description: "Contract lacks approved arbitration language. Per regulatory compliance, all provider contracts must include ICADR-aligned dispute resolution.",
    impact: "Regulatory non-compliance, potential litigation exposure",
    fallback: "ICADR arbitration clause with Mumbai jurisdiction as per legal playbook",
  },
  {
    title: "Rate Escalation - Above Threshold",
    severity: "medium",
    description: "8% annual escalation proposed vs 5% maximum approved rate. This exceeds our medical inflation benchmark of 6.2%.",
    impact: "₹2.4 Cr additional cost over 3-year term",
    fallback: "5% annual escalation with quality-based performance incentives",
  },
];

const Compliance = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Playbook & Compliance Alerts</h1>
              <p className="text-muted-foreground">
                3 deviations detected from approved policy language
              </p>
            </div>
            <Button onClick={() => navigate("/benchmark")} className="gap-2">
              Review Benchmarks
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

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
                  <div className="flex-1 space-y-4">
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
                      <p className="text-muted-foreground mb-3">{alert.description}</p>
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
                          <p className="font-medium text-green-800 mb-1">Recommended Fallback Clause</p>
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

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Playbook Compliance Summary</p>
                <p className="text-sm text-blue-700">
                  38 of 42 clauses are compliant with approved policy language. 
                  Remaining issues flagged for Legal and Finance review.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Compliance;
