import { Home, Upload, FileText, Shield, TrendingUp, Calculator, MessageSquare, FileEdit, CheckSquare, FileDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/upload", icon: Upload, label: "Upload" },
  { path: "/clauses", icon: FileText, label: "Clauses" },
  { path: "/compliance", icon: Shield, label: "Compliance" },
  { path: "/benchmark", icon: TrendingUp, label: "Benchmark" },
  { path: "/simulator", icon: Calculator, label: "Simulator" },
  { path: "/copilot", icon: MessageSquare, label: "Co-Pilot" },
  { path: "/redlining", icon: FileEdit, label: "Redlining" },
  { path: "/approvals", icon: CheckSquare, label: "Approvals" },
  { path: "/summary", icon: FileDown, label: "Summary" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base">HL</span>
            </div>
            <span className="text-xl font-bold text-foreground">HiLabs</span>
          </Link>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
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
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
