import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface PastInstance {
  contract: string;
  date: string;
  outcome: "accepted" | "rejected" | "risky";
  notes: string;
}

interface PastInstancesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clauseTitle: string;
  instances: PastInstance[];
  recommendation: string;
}

const PastInstancesModal = ({ open, onOpenChange, clauseTitle, instances, recommendation }: PastInstancesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Past Instances: {clauseTitle}</DialogTitle>
          <DialogDescription>
            Historical data from similar contracts and recommended decision rationale
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Recommended Decision</p>
            <p className="text-sm text-blue-800">{recommendation}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Historical Contracts</p>
            {instances.map((instance, idx) => (
              <div key={idx} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{instance.contract}</p>
                    <p className="text-xs text-muted-foreground">{instance.date}</p>
                  </div>
                  <Badge variant="outline" className={
                    instance.outcome === "accepted" ? "bg-green-100 text-green-700 border-green-200" :
                    instance.outcome === "rejected" ? "bg-red-100 text-red-700 border-red-200" :
                    "bg-yellow-100 text-yellow-700 border-yellow-200"
                  }>
                    <span className="flex items-center gap-1">
                      {instance.outcome === "accepted" && <CheckCircle className="w-3 h-3" />}
                      {instance.outcome === "rejected" && <XCircle className="w-3 h-3" />}
                      {instance.outcome === "risky" && <AlertTriangle className="w-3 h-3" />}
                      {instance.outcome.charAt(0).toUpperCase() + instance.outcome.slice(1)}
                    </span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{instance.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PastInstancesModal;
