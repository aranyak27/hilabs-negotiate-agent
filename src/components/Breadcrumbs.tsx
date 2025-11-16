import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const pathNames: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Contract Analysis",
  "/redlining": "Redlining",
  "/approvals": "Approvals",
  "/summary": "Summary",
};

const Breadcrumbs = () => {
  const location = useLocation();
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      {location.pathname !== "/" && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">
            {pathNames[location.pathname] || "Page"}
          </span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
