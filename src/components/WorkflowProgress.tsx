import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";

const steps = [
  { path: "/upload", label: "Upload & Analyze" },
  { path: "/redlining", label: "Redline" },
  { path: "/approvals", label: "Approvals" },
  { path: "/summary", label: "Summary" },
];

const WorkflowProgress = () => {
  const location = useLocation();
  const currentIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        
        return (
          <div key={step.path} className="flex items-center flex-1">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                isCompleted 
                  ? "bg-green-600 text-white" 
                  : isCurrent 
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20" 
                    : "bg-muted text-muted-foreground"
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={`text-sm font-medium whitespace-nowrap ${
                isCurrent ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                isCompleted ? "bg-green-600" : "bg-border"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkflowProgress;
