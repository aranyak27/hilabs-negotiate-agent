import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import WorkflowProgress from "@/components/WorkflowProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, MessageSquare, Tag, User, CheckCircle, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [reviewedClauses, setReviewedClauses] = useState<number[]>([]);
  const [assignedTo, setAssignedTo] = useState<{[key: number]: string}>({});

  const handleAcceptProposal = (idx: number, type: "provider" | "hilabs") => {
    setReviewedClauses([...reviewedClauses, idx]);
    toast({
      title: `${type === "provider" ? "Provider" : "NegotiateAI"} proposal accepted`,
      description: `${changes[idx].clause} updated successfully`,
    });
  };

  const reviewProgress = (reviewedClauses.length / changes.length) * 100;
  const allReviewed = reviewedClauses.length === changes.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <Breadcrumbs />
          <WorkflowProgress />
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Smart Redlining Workspace</h1>
              <p className="text-muted-foreground">
                Track and respond to clause changes across contract revisions
              </p>
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <Progress value={reviewProgress} className="w-48" />
                  <span className="text-sm text-muted-foreground">
                    {reviewedClauses.length} of {changes.length} clauses reviewed
                  </span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/approvals")} 
              className="gap-2"
              disabled={!allReviewed}
            >
              Submit for Approval
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {!allReviewed && (
            <Card className="p-4 bg-amber-50 border-amber-200">
              <p className="text-sm text-amber-700">
                ⚠️ Review all clauses before submitting for approval
              </p>
            </Card>
          )}

          <div className="space-y-6">
            {changes.map((change, idx) => {
              const isReviewed = reviewedClauses.includes(idx);
              return (
              <Card key={idx} className={`p-6 border-border ${isReviewed ? 'opacity-60' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">{change.clause}</h3>
                      {isReviewed && (
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Reviewed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => navigate("/upload")}
                        className="gap-1"
                      >
                        <LinkIcon className="w-3 h-3" />
                        View Compliance Item
                      </Button>
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
                      <p className="text-xs font-semibold text-primary uppercase">NegotiateAI Counter-Proposal</p>
                      <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">
                        AI-Suggested
                      </Badge>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-900">{change.counter}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Assign to</p>
                      <Select 
                        value={assignedTo[idx] || "unassigned"}
                        onValueChange={(value) => setAssignedTo({...assignedTo, [idx]: value})}
                      >
                        <SelectTrigger className="w-40 h-8">
                          <SelectValue placeholder="Assign to..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          <SelectItem value="legal">Legal Team</SelectItem>
                          <SelectItem value="finance">Finance Team</SelectItem>
                          <SelectItem value="contracting">Contracting Team</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea placeholder="Add comments for Legal, Finance, or other stakeholders..." className="min-h-20" />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAcceptProposal(idx, "provider")}
                      disabled={isReviewed}
                    >
                      Accept Provider Revision
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAcceptProposal(idx, "hilabs")}
                      disabled={isReviewed}
                    >
                      Accept NegotiateAI Proposal
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={isReviewed}
                    >
                      Edit Counter-Proposal
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button size="sm" variant="ghost" className="gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Comment
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <Tag className="w-3 h-3" />
                        Tag Team
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
            })}
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
