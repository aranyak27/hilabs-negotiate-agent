import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const approvers = [
  { role: "Negotiator", name: "Sarah Chen", status: "approved", date: "2025-01-15 14:30", notes: "Counter-proposals aligned with playbook" },
  { role: "Legal", name: "Raj Malhotra", status: "pending", date: null, notes: null },
  { role: "Finance", name: "Priya Sharma", status: "pending", date: null, notes: null },
  { role: "Leadership", name: "Dr. Anil Kumar", status: "pending", date: null, notes: null },
];

const Approvals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Internal Approvals</h1>
              <p className="text-muted-foreground">
                Apollo Hospitals - Master Service Agreement (Rev 3)
              </p>
            </div>
            <Button onClick={() => navigate("/summary")} variant="outline" className="gap-2">
              View Summary
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <Card className="p-6 border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Approval Matrix</h2>
            <div className="space-y-4">
              {approvers.map((approver, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {approver.status === "approved" ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : approver.status === "rejected" ? (
                      <XCircle className="w-6 h-6 text-red-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{approver.name}</p>
                      <span className="text-xs text-muted-foreground">• {approver.role}</span>
                    </div>
                    {approver.status === "approved" && (
                      <div>
                        <p className="text-sm text-green-600 font-medium">✓ Approved</p>
                        <p className="text-xs text-muted-foreground">{approver.date}</p>
                        {approver.notes && (
                          <p className="text-xs text-muted-foreground italic mt-1">"{approver.notes}"</p>
                        )}
                      </div>
                    )}
                    {approver.status === "pending" && (
                      <p className="text-sm text-yellow-600 font-medium">⏳ Pending Review</p>
                    )}
                  </div>

                  {approver.status === "pending" && approver.role === "Legal" && (
                    <Button size="sm">Review Now</Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Changes Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Rate Adjustment</p>
                    <p className="text-muted-foreground text-xs">Counter-proposed ₹3,850 (vs ₹4,200 requested)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Escalation Cap</p>
                    <p className="text-muted-foreground text-xs">Reduced to 5% with quality incentive</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Termination Notice</p>
                    <p className="text-muted-foreground text-xs">Restored to 90-day standard with transition period</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Dispute Resolution</p>
                    <p className="text-muted-foreground text-xs">Added ICADR arbitration clause</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Financial Impact</h3>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-xs text-green-700 mb-1">Estimated Savings</p>
                  <p className="text-2xl font-bold text-green-900">₹12.8 Cr</p>
                  <p className="text-xs text-green-700">Over 3-year contract term</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-xs text-blue-700 mb-1">Total Contract Value</p>
                  <p className="text-2xl font-bold text-blue-900">₹54.6 Cr</p>
                  <p className="text-xs text-blue-700">Including quality incentives</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-900">
              <strong>Audit Log:</strong> All approval decisions, timestamps, and comments are recorded for compliance tracking and future audits. This record will be attached to the final negotiation packet.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Approvals;
