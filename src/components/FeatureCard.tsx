import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="group transition-all duration-300 hover:shadow-lg border border-border bg-card">
      <CardContent className="p-6 flex flex-col items-start space-y-4">
        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
