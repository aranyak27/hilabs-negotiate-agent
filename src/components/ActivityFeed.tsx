import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  type: "comment" | "approval" | "alert" | "update";
  user: string;
  message: string;
  timestamp: string;
  unread?: boolean;
}

const activities: Activity[] = [
  { id: "1", type: "approval", user: "Legal", message: "Approved termination clause changes", timestamp: "5m ago", unread: true },
  { id: "2", type: "comment", user: "Finance", message: "Requested clarification on escalation rate", timestamp: "12m ago", unread: true },
  { id: "3", type: "alert", user: "System", message: "Rate variance detected vs benchmark", timestamp: "1h ago" },
  { id: "4", type: "update", user: "Sarah Chen", message: "Updated counter-proposal for payment terms", timestamp: "2h ago" },
  { id: "5", type: "approval", user: "Leadership", message: "Contract escalated for review", timestamp: "3h ago" },
];

const ActivityFeed = () => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "comment": return <MessageSquare className="w-4 h-4" />;
      case "approval": return <CheckCircle className="w-4 h-4" />;
      case "alert": return <AlertTriangle className="w-4 h-4" />;
      case "update": return <FileText className="w-4 h-4" />;
    }
  };

  const getColor = (type: Activity["type"]) => {
    switch (type) {
      case "comment": return "text-blue-600";
      case "approval": return "text-green-600";
      case "alert": return "text-red-600";
      case "update": return "text-primary";
    }
  };

  return (
    <Card className="border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Activity Feed</h3>
          </div>
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            2 New
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="p-4 space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex gap-3 p-3 rounded-lg transition-colors ${
                activity.unread ? "bg-blue-50 border border-blue-200" : "hover:bg-muted"
              }`}
            >
              <div className={`flex-shrink-0 ${getColor(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-xs text-foreground">{activity.user}</span>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-foreground">{activity.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActivityFeed;
