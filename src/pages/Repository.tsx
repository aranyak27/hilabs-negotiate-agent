import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Play, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const allContracts = [
  { 
    provider: "Apollo Hospitals - Bangalore", 
    status: "In Progress",
    stage: "Legal Review",
    risk: "high",
    savings: 8.2,
    modified: "2025-01-15",
    owner: "Sarah Chen"
  },
  { 
    provider: "Max Healthcare - Delhi NCR", 
    status: "In Progress",
    stage: "Financial Analysis",
    risk: "medium",
    savings: 5.4,
    modified: "2025-01-12",
    owner: "Sarah Chen"
  },
  { 
    provider: "Fortis Memorial - Gurgaon", 
    status: "In Progress",
    stage: "Benchmark Comparison",
    risk: "low",
    savings: 3.1,
    modified: "2025-01-10",
    owner: "Raj Malhotra"
  },
  { 
    provider: "Manipal Hospitals - Bangalore", 
    status: "Completed",
    stage: "Completed",
    risk: "low",
    savings: 6.8,
    modified: "2024-12-28",
    owner: "Priya Sharma"
  },
  { 
    provider: "Apollo Hospitals - Chennai", 
    status: "Completed",
    stage: "Completed",
    risk: "medium",
    savings: 7.5,
    modified: "2024-12-15",
    owner: "Sarah Chen"
  },
  { 
    provider: "Fortis Healthcare - Mumbai", 
    status: "Completed",
    stage: "Completed",
    risk: "low",
    savings: 4.2,
    modified: "2024-11-30",
    owner: "Raj Malhotra"
  },
];

const Repository = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredContracts = allContracts.filter(contract =>
    contract.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <Breadcrumbs />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Contract Repository</h1>
              <p className="text-muted-foreground">
                View and manage all provider contracts
              </p>
            </div>
          </div>

          <Card className="p-6 border-border">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by provider name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Savings Impact</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{contract.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        contract.status === "Completed" 
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                      }>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{contract.stage}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        contract.risk === "high" ? "bg-red-100 text-red-700 border-red-200" :
                        contract.risk === "medium" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                        "bg-green-100 text-green-700 border-green-200"
                      }>
                        {contract.risk.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-green-600 font-semibold">₹{contract.savings} Cr</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{contract.modified}</TableCell>
                    <TableCell className="text-sm">{contract.owner}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {contract.status === "In Progress" && (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={() => navigate("/upload")}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Repository;
