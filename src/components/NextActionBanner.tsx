import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

interface NextActionBannerProps {
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  variant?: "default" | "urgent" | "success";
}

const NextActionBanner = ({ title, description, action, onAction, variant = "default" }: NextActionBannerProps) => {
  const colors = {
    default: "bg-blue-50 border-blue-200",
    urgent: "bg-amber-50 border-amber-200",
    success: "bg-green-50 border-green-200",
  };

  const textColors = {
    default: "text-blue-900",
    urgent: "text-amber-900",
    success: "text-green-900",
  };

  return (
    <Card className={`p-4 ${colors[variant]} border-l-4 animate-fade-in`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className={`font-semibold ${textColors[variant]} text-sm`}>{title}</p>
            <p className={`text-xs ${textColors[variant]} opacity-80`}>{description}</p>
          </div>
        </div>
        <Button onClick={onAction} size="sm" className="gap-2 hover-scale">
          {action}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default NextActionBanner;
