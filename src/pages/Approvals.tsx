import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import WorkflowProgress from "@/components/WorkflowProgress";
import NextActionBanner from "@/components/NextActionBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, ArrowRight, Bell, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const approvers = [
  { role: "Negotiator", name: "Sarah Chen", status: "approved", date: "2025-01-15 14:30", notes: "Counter-proposals aligned with playbook", dueDate: "2025-01-15" },
  { role: "Legal", name: "Raj Malhotra", status: "pending", date: null, notes: null, dueDate: "2025-01-18", overdue: true },
  { role: "Finance", name: "Priya Sharma", status: "pending", date: null, notes: null, dueDate: "2025-01-19", overdue: true },
  { role: "Leadership", name: "Dr. Anil Kumar", status: "pending", date: null, notes: null, dueDate: "2025-01-20", overdue: false },
];

const Approvals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleReminder = (name: string) => {
    toast({
      title: "Reminder sent",
      description: `Notification sent to ${name}`,
    });
  };

  const handleAutoEscalate = () => {
    toast({
      title: "Auto-escalation enabled",
      description: "Contract will escalate to Leadership after 3 days if not approved",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <Breadcrumbs />
          <WorkflowProgress />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">Internal Approvals</h1>
              <p className="text-muted-foreground">
                Apollo Hospitals - Master Service Agreement (Rev 3)
              </p>
            </div>
            <Button onClick={() => navigate("/summary")} variant="outline" className="gap-2">
              View Summary
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <NextActionBanner
            title="Pending Approvals"
            description="Waiting for Legal and Finance review - 2 days overdue"
            action="Send Reminder to All"
            onAction={() => handleReminder("All pending approvers")}
            variant="urgent"
          />

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Approval Matrix</h2>
              <Button onClick={handleAutoEscalate} size="sm" variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
                Enable Auto-Escalation (3 days)
              </Button>
            </div>
            <div className="space-y-4">
              {approvers.map((approver, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border border-border rounded-lg animate-fade-in hover:bg-muted/30 transition-all" style={{ animationDelay: `${idx * 100}ms` }}>
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
                      {approver.overdue && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                          OVERDUE
                        </Badge>
                      )}
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
                      <div>
                        <p className="text-sm text-yellow-600 font-medium">⏳ Pending Review</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Common approval reasons: Playbook aligned • Market competitive • Compliance verified
                        </p>
                      </div>
                    )}
                  </div>

                   {approver.status === "pending" && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate("/upload")}
                        className="gap-1"
                      >
                        View Contract
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReminder(approver.name)}
                        className="gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        Send Reminder
                      </Button>
                      {approver.role === "Legal" && (
                        <Button size="sm">Review Now</Button>
                      )}
                    </div>
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
