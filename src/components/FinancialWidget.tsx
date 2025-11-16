import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

interface FinancialWidgetProps {
  savings?: number;
  payoutChange?: number;
  riskLevel?: "low" | "medium" | "high";
  compact?: boolean;
}

const FinancialWidget = ({ savings, payoutChange, riskLevel = "low", compact = false }: FinancialWidgetProps) => {
  const riskColors = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };

  const riskBg = {
    low: "bg-green-50 border-green-200",
    medium: "bg-yellow-50 border-yellow-200",
    high: "bg-red-50 border-red-200",
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm">
        {savings !== undefined && (
          <div className="flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-700">₹{savings.toFixed(1)} Cr saved</span>
          </div>
        )}
        {payoutChange !== undefined && (
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span className="font-semibold text-red-700">+₹{payoutChange.toFixed(1)} Cr</span>
          </div>
        )}
        <div className={`flex items-center gap-1 ${riskColors[riskLevel]}`}>
          <AlertTriangle className="w-4 h-4" />
          <span className="font-semibold capitalize">{riskLevel} Risk</span>
        </div>
      </div>
    );
  }

  return (
    <Card className={`p-4 ${riskBg[riskLevel]} border`}>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-5 h-5 ${riskColors[riskLevel]}`} />
          <span className={`font-semibold ${riskColors[riskLevel]} capitalize`}>
            {riskLevel} Risk Contract
          </span>
        </div>
        
        {savings !== undefined && (
          <div className="flex items-center justify-between p-2 bg-white rounded-md">
            <span className="text-xs text-muted-foreground">Potential Savings</span>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-700">₹{savings.toFixed(1)} Cr</span>
            </div>
          </div>
        )}

        {payoutChange !== undefined && (
          <div className="flex items-center justify-between p-2 bg-white rounded-md">
            <span className="text-xs text-muted-foreground">Payout Change</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="font-bold text-red-700">+₹{payoutChange.toFixed(1)} Cr</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FinancialWidget;
