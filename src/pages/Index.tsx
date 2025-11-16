import FeatureCard from "@/components/FeatureCard";
import {
  FileSearch,
  ShieldCheck,
  TrendingUp,
  Calculator,
  MessageSquare,
  Lightbulb,
  FileEdit,
  LayoutDashboard,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: FileSearch,
      title: "NLP Clause Intelligence",
      description: "Auto-extract and structure clauses from PDFs/Word/scanned contracts.",
    },
    {
      icon: ShieldCheck,
      title: "Playbook & Compliance Guardrails",
      description: "Flag deviations from approved regulatory and policy language.",
    },
    {
      icon: TrendingUp,
      title: "Historical Deal & Benchmark Insights",
      description: "Surface past rates, clauses and negotiation history for similar providers.",
    },
    {
      icon: Calculator,
      title: "Financial Impact Preview",
      description: "Forecast payout impact of rate and term changes before approval using claims volume.",
    },
    {
      icon: MessageSquare,
      title: "Negotiation Co-Pilot (Chat + Search)",
      description: "Ask questions in natural language and retrieve relevant contract insights instantly.",
    },
    {
      icon: Lightbulb,
      title: "Evidence-Backed Counter Positions",
      description: "Recommend counter-language and fallback clauses based on playbooks and past deals.",
    },
    {
      icon: FileEdit,
      title: "Smart Redlining Workspace",
      description: "Highlight clause changes across drafts, support tagging, approvals, and audit traceability.",
    },
    {
      icon: LayoutDashboard,
      title: "Negotiation Performance Dashboard",
      description: "Track cycle time, deviations, savings, and onboarding velocity across teams.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-2">
            <div className="text-sm font-medium text-primary tracking-wider uppercase">
              HiLabs Platform
            </div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Core Features of the Negotiation Assist Platform
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Turning messy unstructured healthcare data into clean, accurate, actionable 
              intelligence for confident decision-making.
            </p>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Helping every payer–provider negotiation become faster, smarter, and financially 
            sound — the HiLabs way.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
