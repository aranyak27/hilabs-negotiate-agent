import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MessageSquare, Tag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const changes = [
  {
    clause: "Payment Terms",
    original: "Payment shall be made within 60 days of invoice submission.",
    revised: "Payment shall be made within 90 days of invoice submission.",
    status: "provider-change",
    counter: "Payment shall be made within 75 days of invoice submission, with early payment discount of 2% for payments within 45 days.",
  },
  {
    clause: "Termination Notice",
    original: "Either party may terminate with 90 days written notice.",
    revised: "Either party may terminate with 30 days written notice.",
    status: "non-compliant",
    counter: "Either party may terminate with ninety (90) days written notice. Provider shall continue care for current patients for up to six (6) months transition period.",
  },
  {
    clause: "Rate Escalation",
    original: "Annual rate increase capped at 5%.",
    revised: "Annual rate increase of 8%.",
    status: "high-impact",
    counter: "Annual rate increase capped at 5%, with additional 2% quality-based performance incentive tied to NABH scores and patient satisfaction metrics.",
  },
];

const Redlining = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Smart Redlining Workspace</h1>
              <p className="text-muted-foreground">
                Track and respond to clause changes across contract revisions
              </p>
            </div>
            <Button onClick={() => navigate("/approvals")} className="gap-2">
              Submit for Approval
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {changes.map((change, idx) => (
              <Card key={idx} className="p-6 border-border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{change.clause}</h3>
                    <Badge
                      variant="outline"
                      className={
                        change.status === "non-compliant"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : change.status === "high-impact"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                      }
                    >
                      {change.status === "non-compliant"
                        ? "Non-Compliant"
                        : change.status === "high-impact"
                        ? "High Financial Impact"
                        : "Provider Change"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Original Language</p>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm text-foreground">{change.original}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Provider Redline</p>
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-900">
                          <del className="text-red-500 opacity-70">{change.original}</del>
                          <br />
                          <ins className="text-red-700 no-underline font-medium">{change.revised}</ins>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-primary uppercase">HiLabs Counter-Proposal</p>
                      <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">
                        AI-Suggested
                      </Badge>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-900">{change.counter}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Internal Notes</p>
                    <Textarea placeholder="Add comments for Legal, Finance, or other stakeholders..." className="min-h-20" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Add Comment
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Tag className="w-3 h-3" />
                      Tag Legal
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <User className="w-3 h-3" />
                      Tag Finance
                    </Button>
                    <Button size="sm" className="ml-auto bg-green-600 hover:bg-green-700">
                      Accept Counter-Proposal
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Audit Trail:</strong> All changes, comments, and approvals are automatically logged for compliance and future reference.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Redlining;
