import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const clauses = [
  { title: "Payment Terms", status: "Compliant", risk: "low", lastSeen: "Q2 2024 - Apollo Chennai", notes: "90-day payment cycle" },
  { title: "Rate Escalation", status: "Variation", risk: "medium", lastSeen: "Q1 2024 - Max Delhi", notes: "8% annual vs standard 5%" },
  { title: "Termination Rights", status: "Non-Standard", risk: "high", lastSeen: "Never", notes: "30-day notice vs standard 90-day" },
  { title: "Quality Metrics", status: "Compliant", risk: "low", lastSeen: "Q3 2024 - Fortis Mumbai", notes: "NABH standards aligned" },
  { title: "Dispute Resolution", status: "Non-Standard", risk: "high", lastSeen: "Q4 2023 - Manipal", notes: "Arbitration clause missing" },
  { title: "Data Security", status: "Compliant", risk: "low", lastSeen: "Q2 2024 - Multiple", notes: "ISO 27001 certified" },
  { title: "Service Level Agreement", status: "Variation", risk: "medium", lastSeen: "Q1 2024 - Apollo Hyderabad", notes: "95% uptime vs 98% standard" },
  { title: "Auto-Renewal Clause", status: "Compliant", risk: "low", lastSeen: "Q3 2024 - Multiple", notes: "Standard 12-month renewal" },
];

const ClauseIntelligence = () => {
  const navigate = useNavigate();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-700 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "high": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Clause Intelligence</h1>
              <p className="text-muted-foreground">
                Apollo Hospitals - Master Service Agreement • Extracted 42 clauses
              </p>
            </div>
            <Button onClick={() => navigate("/compliance")} className="gap-2">
              Review Compliance Issues
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Clause Title</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold">Last Seen In</TableHead>
                  <TableHead className="font-semibold">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clauses.map((clause, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 cursor-pointer">
                    <TableCell className="font-medium text-foreground">{clause.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRiskColor(clause.risk)}>
                        {clause.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          clause.risk === "low" ? "bg-green-500" :
                          clause.risk === "medium" ? "bg-yellow-500" : "bg-red-500"
                        }`}></div>
                        <span className="text-sm capitalize">{clause.risk}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{clause.lastSeen}</TableCell>
                    <TableCell className="text-sm">{clause.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-green-700 mb-1">5</p>
              <p className="text-sm text-green-600">Compliant Clauses</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-yellow-700 mb-1">2</p>
              <p className="text-sm text-yellow-600">Variation Detected</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-red-700 mb-1">2</p>
              <p className="text-sm text-red-600">Non-Standard Issues</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClauseIntelligence;
