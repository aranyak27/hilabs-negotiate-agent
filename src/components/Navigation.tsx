import { Home, Upload, FileText, Shield, TrendingUp, Calculator, MessageSquare, FileEdit, CheckSquare, FileDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/upload", icon: Upload, label: "Upload" },
  { path: "/repository", icon: FileText, label: "Repository" },
  { path: "/copilot", icon: MessageSquare, label: "Ask Negotiation Co-Pilot" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base">NA</span>
            </div>
            <span className="text-xl font-bold text-foreground">NegotiateAI</span>
          </Link>
          
          <div className="flex gap-1">
            <TooltipProvider>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden lg:inline">{item.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="lg:hidden">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
