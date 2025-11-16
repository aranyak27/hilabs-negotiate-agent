import Navigation from "@/components/Navigation";
import CoPilotOutputModal from "@/components/CoPilotOutputModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MessageSquare, Send, Mail, MessageCircle, FileText, TrendingDown, BarChart, AlertCircle, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  actions?: { label: string; onClick: () => void }[];
}

const CoPilot = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"quick" | "chat">("quick");
  const [insightMode, setInsightMode] = useState<"contract" | "general">("contract");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your Negotiation Co-Pilot. I can help you with contract insights, past deal comparisons, and negotiation strategies. What would you like to know?",
      sources: ["Contract Database", "Negotiation Playbook"],
      actions: []
    },
  ]);
  const [input, setInput] = useState("");
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [outputModal, setOutputModal] = useState<{ open: boolean; title: string; content: string; type: "email" | "talking-points" | "summary" | "justification" | "comparison" }>({ 
    open: false, 
    title: "", 
    content: "",
    type: "email"
  });

  // Contract context data (would come from props/context in real app)
  // Set to null to simulate "no contract uploaded" state
  const hasContract = true; // Toggle this to test both states
  const contractContext = hasContract ? {
    provider: "Apollo Hospitals",
    lastModified: "Jan 15, 2025",
    openRisks: 3,
    potentialSavings: "₹12.8 Cr",
    riskLevel: "high" as const
  } : null;

  const getDynamicSuggestions = () => {
    if (insightMode === "general") {
      return [
        "What are negotiation best practices for healthcare contracts?",
        "How do I handle difficult vendor escalations?",
        "What are common price negotiation tactics?",
        "How to build leverage in contract negotiations?",
      ];
    }
    return [
      "What are the high-risk clauses in this contract?",
      "How does Apollo's rate compare to market benchmarks?",
      "Draft a counter-proposal for the escalation clause",
      "What termination rights should we negotiate?",
    ];
  };

  const getGeneralQuickActions = () => [
    { 
      title: "Negotiation Best Practices", 
      description: "Get proven strategies for successful contract negotiations",
      icon: Sparkles,
      action: () => handleGeneralAction("best-practices")
    },
    { 
      title: "Industry Benchmarks", 
      description: "Access market rate data and industry standards",
      icon: BarChart,
      action: () => handleGeneralAction("benchmarks")
    },
    { 
      title: "Price Scripts", 
      description: "Ready-to-use scripts for price negotiations",
      icon: MessageCircle,
      action: () => handleGeneralAction("scripts")
    },
    { 
      title: "Escalation Strategies", 
      description: "Tactical approaches for handling difficult situations",
      icon: TrendingUp,
      action: () => handleGeneralAction("escalation")
    },
  ];

  const handleGeneralAction = (type: string) => {
    let title = "";
    let content = "";

    switch (type) {
      case "best-practices":
        title = "Negotiation Best Practices";
        content = `ESSENTIAL NEGOTIATION PRINCIPLES

1. PREPARATION IS POWER
• Research the vendor's market position
• Know your BATNA (Best Alternative to Negotiated Agreement)
• Document your requirements and priorities
• Set clear walk-away points

2. BUILD RELATIONSHIPS FIRST
• Start with rapport building
• Understand vendor's constraints and goals
• Find mutual wins before making demands
• Long-term partnerships > short-term wins

3. ANCHOR STRATEGICALLY
• Make the first offer when you have strong market data
• Anchor high for concessions, but stay reasonable
• Use data to justify your position
• Never accept the first offer

4. LISTEN MORE THAN YOU TALK
• Ask open-ended questions
• Pause after making offers
• Look for non-verbal cues
• Summarize their position to show understanding

5. CREATE VALUE BEFORE CLAIMING IT
• Identify multiple negotiable terms
• Package concessions strategically
• Look for low-cost, high-value trades
• Expand the pie before dividing it`;
        break;

      case "benchmarks":
        title = "Industry Benchmarks Guide";
        content = `ACCESSING & USING MARKET BENCHMARKS

HEALTHCARE PROVIDER RATES (2024-2025)
• Tier-1 Metro Hospitals: ₹3,500 - ₹4,500 per diem
• Tier-2 City Hospitals: ₹2,800 - ₹3,800 per diem
• Specialty Clinics: ₹2,200 - ₹3,200 per diem
• Diagnostic Centers: ₹1,800 - ₹2,500 per diem

ESCALATION CLAUSES
• Medical Inflation (2024): 6.2%
• Standard Annual Increase: 5-7%
• Performance-Based Add-On: 1-3%
• CPI-Linked Adjustments: 3-5%

CONTRACT TERMS
• Payment Terms: 30-60 days standard
• Termination Notice: 60-90 days typical
• Auto-Renewal: 90-120 day notice period
• Volume Discounts: 5-15% for committed volumes

HOW TO USE BENCHMARKS EFFECTIVELY:
1. Cite multiple sources (not just one)
2. Adjust for geographic/size differences
3. Show trending data over time
4. Use ranges, not single point estimates
5. Reference quality/performance metrics`;
        break;

      case "scripts":
        title = "Price Negotiation Scripts";
        content = `PROVEN PRICE NEGOTIATION SCRIPTS

OPENING GAMBIT
"We've done extensive market research and our budget for this engagement is [X]. I'd like to understand how we can structure a partnership within this range while ensuring you're able to deliver your best work."

ANCHORING HIGH
"Based on our analysis of comparable contracts in this space, we were expecting pricing in the range of [lower number]. Can you help me understand the value drivers that justify the gap?"

CHALLENGING A PRICE INCREASE
"I appreciate the escalation request, but our data shows medical inflation at 6.2% this year. Your proposal of [X%] exceeds market benchmarks. Can we discuss a more market-aligned increase?"

ASKING FOR CONCESSIONS
"If we're able to commit to [volume/term/early payment], what pricing adjustments could you offer to make this work within our budget constraints?"

PLAYING GOOD COP
"I really want to make this work, but I need your help. My CFO has set a firm ceiling at [X]. What creative solutions could we explore to bridge this gap?"

THE FLINCH
[After hearing price] "Wow, that's significantly higher than we anticipated. I'm going to need you to walk me through the justification before I can even present this internally."

CREATING URGENCY
"We're reviewing three proposals this week and need to finalize by [date]. If you can meet us at [price], I'm prepared to recommend your proposal immediately."

WALK-AWAY SIGNAL
"I appreciate your time, but at this price point, we may need to explore alternative options. Is there any flexibility before we conclude our discussions?"`;
        break;

      case "escalation":
        title = "Escalation Strategies";
        content = `TACTICAL ESCALATION APPROACHES

WHEN TO ESCALATE
✓ Negotiations stalled for 2+ weeks
✓ Terms significantly exceed benchmarks
✓ Vendor unwilling to justify pricing
✓ Decision-maker not at the table
✗ Too early in the process
✗ Without exhausting ground-level options
✗ As a bluff or emotional reaction

ESCALATION LADDER

LEVEL 1: PEER ESCALATION
"I'd like to involve my Director to discuss the strategic aspects of this partnership. Would your VP be available for a joint call?"

LEVEL 2: DATA-DRIVEN PRESSURE
"I've prepared a detailed benchmark analysis showing a 23% premium in your proposal. Before escalating to my CFO, I wanted to give you the opportunity to review and respond."

LEVEL 3: MULTI-VENDOR COMPARISON
"We're currently evaluating proposals from [Competitor A] and [Competitor B]. Your quality is superior, but the price gap makes it difficult to justify. Can we discuss how to close this?"

LEVEL 4: EXECUTIVE INVOLVEMENT
"This partnership is strategically important to us. I'd like to arrange a discussion between our CPO and your leadership to align on a framework that works for both organizations."

LEVEL 5: WALK-AWAY PREPARATION
"Despite our best efforts, we haven't been able to reach terms that work for our organization. I wanted to thank you for your time and leave the door open for future opportunities."

POST-ESCALATION STRATEGIES:
• Give them 48-72 hours to respond
• Document all positions in writing
• Maintain professional tone throughout
• Be prepared to actually walk away`;
        break;
    }

    setOutputModal({ open: true, title, content, type: "summary" });
  };

  const handleQuickAction = (type: "email" | "talking-points" | "summary" | "justification" | "comparison") => {
    let title = "";
    let content = "";

    switch (type) {
      case "email":
        title = "Negotiation Email - Apollo Hospitals";
        content = `Subject: Re: Master Service Agreement - Counter Proposal

Dear Apollo Hospitals Team,

Thank you for submitting the proposed Master Service Agreement. After a comprehensive review and benchmarking analysis, we would like to propose the following amendments:

1. Base Rate: ₹3,850 per diem (vs proposed ₹4,200)
   Our analysis shows this rate aligns with tier-1 hospital contracts in metropolitan areas while maintaining competitive positioning.

2. Escalation: 5% annual with 2% quality incentive (vs proposed 8%)
   Market benchmark data indicates medical inflation at 6.2% in 2024. We propose a 5% base escalation with an additional 2% tied to NABH scores and patient satisfaction metrics.

3. Termination Notice: 90-day notice period with 6-month transition (vs proposed 30-day)
   This ensures continuity of care for existing patients and adequate time for both parties to plan transitions.

We believe these terms create a sustainable partnership that balances financial viability with quality patient care. We're happy to discuss these proposals in detail and provide supporting benchmark data.

Looking forward to your response.

Best regards,
Sarah Chen
Contract Negotiation Lead, HiLabs`;
        break;

      case "talking-points":
        title = "Talking Points for Provider Call";
        content = `NEGOTIATION TALKING POINTS
Apollo Hospitals - Master Service Agreement

OPENING
• Express appreciation for partnership opportunity
• Acknowledge their strong quality track record (NABH accreditation)
• Frame discussion as creating sustainable long-term partnership

KEY POINTS - BASE RATE

Point: Proposed rate is 14% above market benchmark
- Max Healthcare: ₹3,600
- Fortis Memorial: ₹3,500
- Manipal Hospitals: ₹3,400
Counter-offer: ₹3,850 (8% above market avg)
Justification: Recognizes Apollo's premium positioning while maintaining payer competitiveness

KEY POINTS - ESCALATION

Point: 8% escalation exceeds medical inflation trends
- 2024 medical inflation: 6.2%
- Industry standard: 5%
Counter-offer: 5% base + 2% quality incentive
Justification: Aligns with market while rewarding quality outcomes

KEY POINTS - TERMINATION

Point: 30-day notice creates operational risk
- Industry standard: 90 days
- Patient care continuity concerns
Counter-offer: 90-day notice with 6-month transition period
Justification: Protects patient care, used in 85% of similar contracts

ANTICIPATED OBJECTIONS

"Other payers accept our terms"
Response: We've analyzed recent contracts - most tier-1 hospitals accepted 5% escalation. Can provide specific examples.

"Our costs are rising faster"
Response: We understand cost pressures. That's why we're proposing quality incentives - shared value creation.

CLOSING
• Emphasize long-term partnership goals
• Offer to share detailed benchmark data
• Suggest follow-up call to discuss financial modeling`;
        break;

      case "summary":
        title = "Changes Summary - Rev 2 to Rev 3";
        content = `NEGOTIATION SUMMARY: Apollo Hospitals MSA
Revision 2 → Revision 3 (Current)

FINANCIAL TERMS

Base Rate
- Rev 2: ₹4,200 per diem
- Rev 3: ₹3,850 per diem
- Change: -₹350 (-8.3%)
- Impact: ₹12.8 Cr savings over 3 years

Annual Escalation
- Rev 2: 8% fixed
- Rev 3: 5% base + 2% quality incentive
- Change: -3% guaranteed, +2% performance-based
- Impact: ₹4.8 Cr savings (if quality targets not met)

CONTRACT TERMS

Termination Notice
- Rev 2: 30 days
- Rev 3: 90 days with 6-month transition
- Impact: Reduced operational risk, improved patient care continuity

Dispute Resolution
- Rev 2: Not specified
- Rev 3: ICADR arbitration (Mumbai jurisdiction)
- Impact: Regulatory compliance, reduced litigation exposure

Quality Metrics
- Rev 2: Not specified
- Rev 3: 2% incentive tied to NABH scores and patient satisfaction
- Impact: Aligned incentives for quality outcomes

OVERALL IMPACT
• Total 3-year value: ₹54.6 Cr (vs ₹67.4 Cr in Rev 2)
• Total savings: ₹12.8 Cr
• Risk reduction: High → Medium
• Compliance: Improved (added arbitration clause)
• Quality alignment: Strong (performance incentives)

NEXT STEPS
1. Legal review of revised language
2. Finance approval of financial terms
3. Provider response within 7 days
4. Target signature: Feb 5, 2025`;
        break;

      case "justification":
        title = "Justification for Lowering Escalation";
        content = `ESCALATION REDUCTION JUSTIFICATION
From 8% to 5% + 2% Quality Incentive

MARKET BENCHMARK DATA

Medical Inflation Trends
• 2024 India Medical Inflation: 6.2%
• 2023 India Medical Inflation: 6.8%
• Projected 2025: 5.9%
Source: Aon Global Medical Trend Rates Report 2024

Peer Hospital Escalation Rates
• Max Healthcare (Delhi NCR): 5% fixed
• Fortis Memorial (Gurgaon): 5% fixed
• Manipal Hospitals (Bangalore): 4.5% + 1.5% quality
• Columbia Asia: 5% + 1% quality
• Average: 5.1% base escalation

FINANCIAL IMPACT ANALYSIS

3-Year Cost Difference
• At 8% escalation: ₹67.4 Cr total contract value
• At 5% escalation: ₹62.6 Cr total contract value
• Difference: ₹4.8 Cr additional cost

Per-Member-Per-Month Impact
• At 8%: ₹1,248 PMPM (Year 3)
• At 5%: ₹1,187 PMPM (Year 3)
• Difference: ₹61 PMPM increase

STRATEGIC RATIONALE

Risk-Based Pricing
• Higher escalation rates increase long-term financial exposure
• Economic uncertainty requires conservative planning
• Board mandate: maintain medical cost trend below 7%

Value-Based Alternative
• Propose 2% quality incentive pool
• Tied to objective metrics (NABH scores, patient satisfaction)
• Aligns provider incentives with outcomes
• Creates shared value vs. fixed cost increase

Historical Precedent
• 2024 Apollo contract: accepted 5% escalation
• 2024 Max contract: accepted 5% escalation
• 2023 Fortis renewal: reduced from 7% to 5%

NEGOTIATION POSITIONING

Opening Position
"Market data shows medical inflation at 6.2%, and peer hospitals are accepting 5% escalation. We propose matching market rate with quality upside."

If Provider Resists
"We understand cost pressures. That's why we're offering a 2% quality incentive - potential to reach 7% if targets met, aligning our interests."

Final Compromise
"We can consider 6% fixed if removing quality incentive, but prefer shared-risk approach that rewards outcomes."`;
        break;

      case "comparison":
        title = "Rate Comparison with Similar Providers";
        content = `PROVIDER RATE COMPARISON ANALYSIS
Apollo Hospitals Bangalore - Benchmarking Study

TIER-1 HOSPITALS (METROPOLITAN)

Apollo Hospitals Bangalore - PROPOSED
• Base Rate: ₹4,200 per diem
• Year: 2025 (proposed)
• Escalation: 8% annual
• Quality Incentives: None
• Contract Status: Under negotiation

Max Healthcare (Delhi NCR) - CONTRACTED
• Base Rate: ₹3,600 per diem
• Year: 2024
• Escalation: 5% annual
• Quality Incentives: None
• Contract Status: Active
• Deviation: -14% below Apollo proposal

Fortis Memorial (Gurgaon) - CONTRACTED
• Base Rate: ₹3,500 per diem
• Year: 2024
• Escalation: 5% annual
• Quality Incentives: None
• Contract Status: Active
• Deviation: -17% below Apollo proposal

Manipal Hospitals (Bangalore) - CONTRACTED
• Base Rate: ₹3,400 per diem
• Year: 2023
• Escalation: 4.5% annual
• Quality Incentives: 1.5% quality bonus
• Contract Status: Active
• Deviation: -19% below Apollo proposal

Apollo Hospitals (Chennai) - CONTRACTED
• Base Rate: ₹3,800 per diem
• Year: 2024
• Escalation: 5% annual
• Quality Incentives: 10% tied to NABH
• Contract Status: Active
• Deviation: -10% below Bangalore proposal

STATISTICAL SUMMARY

Mean Rate (Tier-1 Metro): ₹3,575
Median Rate: ₹3,600
Standard Deviation: ₹173
Apollo Proposal Position: +17% above mean

Escalation Rate Summary
Mean: 5.0%
Median: 5.0%
Range: 4.5% - 5.0%
Apollo Proposal: +60% above mean (8% vs 5%)

RECOMMENDATION

Counter-Offer Rate: ₹3,850
• +7.7% above market mean
• Recognizes Apollo's premium positioning
• Within 1 standard deviation
• Competitive vs Chennai facility

Counter-Offer Escalation: 5% + 2% quality
• Matches market standard
• Adds performance incentive
• Total potential: 7% (above Apollo Chennai)

NEGOTIATION LEVERAGE

Strong Points for Our Position
• Apollo Chennai accepted ₹3,800 (same brand, similar market)
• All peer hospitals at 5% escalation
• ₹4,200 rate is statistically significant outlier
• Proposal exceeds budget authorization

Anticipated Provider Arguments
"We're NABH accredited" → So is Chennai facility at ₹3,800
"Our costs are higher" → Similar for all hospitals, not reflected in market
"Other payers accept it" → Request specific examples; likely not tier-1 hospitals

FINANCIAL IMPACT

At ₹3,850 vs ₹4,200
• Annual savings: ₹4.2 Cr
• 3-year savings: ₹12.8 Cr
• PMPM reduction: ₹65

Market Positioning
• ₹3,850 is 8% above average peer rate
• Maintains Apollo premium positioning
• Defensible to board and regulators
• Sustainable long-term partnership rate`;
        break;
    }

    setOutputModal({ open: true, title, content, type });
  };

  const handleSend = (message?: string) => {
    const userMessage = message || input;
    if (!userMessage.trim()) return;

    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      let sources: string[] = [];
      let actions: { label: string; onClick: () => void }[] = [];
      let suggestions: string[] = [];

      if (userMessage.includes("Apollo last time") || userMessage.includes("high-risk")) {
        response = "## Apollo Hospitals 2024 Contract Summary\n\nIn our 2024 contract with Apollo Hospitals Bangalore, we negotiated:\n\n• **Base rate**: ₹3,800 per diem (down from ₹4,100)\n• **Escalation**: 5% annual\n• **Termination**: 90-day notice period\n• **Quality metrics**: 10% of payments tied to NABH scores\n• **Dispute resolution**: ICADR arbitration in Mumbai\n\nThe negotiation took 21 days and saved an estimated **₹8.2 Cr** over the 3-year term.";
        sources = ["Apollo 2024 Contract", "Historical Deal Database"];
        actions = [
          { label: "View Full Contract", onClick: () => navigate("/repository") },
          { label: "Compare to Current Terms", onClick: () => handleQuickAction("comparison") },
        ];
        suggestions = [
          "What were the key negotiation points?",
          "How can we improve on the 2024 terms?",
          "Draft email referencing historical agreement"
        ];
      } else if (userMessage.includes("escalation") || userMessage.includes("counter-proposal")) {
        response = "## Escalation Justification\n\nHere's your negotiation justification for requesting **5% instead of 8%** escalation:\n\n### Market Benchmark\nMedical inflation in India averaged 6.2% in 2024. The proposed 8% exceeds market trends.\n\n### Comparable Contracts\n• Max Healthcare: 5%\n• Fortis: 5%\n• Manipal: 4.5%\n\nAll tier-1 hospitals accepted 5% or lower.\n\n### Financial Impact\nThe 3% difference equates to **₹4.8 Cr additional cost** over 3 years.\n\n**Recommendation**: Propose 5% escalation with a 2% quality incentive pool tied to patient outcomes.";
        sources = ["Market Benchmark Report 2024", "Contract Database", "Negotiation Playbook"];
        actions = [
          { label: "Draft Counter-Proposal", onClick: () => alert("Generating counter-proposal...") },
          { label: "Generate Email", onClick: () => handleQuickAction("email") },
          { label: "Share with CFO", onClick: () => alert("Sharing justification with CFO...") }
        ];
        suggestions = [
          "What are the risks of accepting 8%?",
          "Show me quality incentive examples",
          "Create CFO justification document"
        ];
      } else if (userMessage.includes("fallback") && userMessage.includes("termination")) {
        response = "## Recommended Fallback Clause\n\n### Standard Playbook Language (Legal Approved)\n\n*\"Either party may terminate this Agreement with ninety (90) days written notice. In the event of termination, Provider shall continue to provide care for all patients currently under treatment for a transition period of up to six (6) months at the contracted rates to ensure care continuity.\"*\n\n### Justification\nThis clause protects patient care continuity while giving both parties adequate planning time. Used successfully in **14 similar contracts** in 2024.";
        sources = ["Legal Playbook v3.2", "Contract Templates"];
        actions = [
          { label: "Apply Fallback Clause", onClick: () => alert("Applying clause to contract...") },
          { label: "Send to Legal", onClick: () => alert("Forwarding to Legal team...") }
        ];
        suggestions = [
          "What other termination clauses should we consider?",
          "Show me provider pushback scenarios",
          "Draft talking points for this clause"
        ];
      } else {
        response = "I can help you with that. Based on our contract database and negotiation playbooks, I found relevant information.\n\n### Available Actions\n• Provide specific details on rates\n• Analyze contract clauses\n• Generate negotiation strategies\n• Compare with past deals\n\nWhat would you like to explore?";
        sources = ["Contract Database", "Negotiation Playbook"];
        actions = [
          { label: "Show Benchmarks", onClick: () => handleQuickAction("comparison") },
          { label: "Generate Talking Points", onClick: () => handleQuickAction("talking-points") }
        ];
        suggestions = [
          "What are the key risks in this contract?",
          "Compare rates with competitors",
          "Draft counter-proposal email"
        ];
      }

      setMessages(prev => [...prev, { role: "assistant", content: response, sources, actions }]);
      setFollowUpSuggestions(suggestions);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Negotiation Co-Pilot</h1>
            <p className="text-muted-foreground">AI-powered insights for smarter contract negotiations</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Mode:</span>
            <Button 
              variant={insightMode === "contract" ? "default" : "outline"}
              size="sm"
              onClick={() => setInsightMode("contract")}
              className="gap-2"
            >
              <span className={insightMode === "contract" ? "text-primary-foreground" : ""}>●</span>
              Contract Insights
            </Button>
            <Button 
              variant={insightMode === "general" ? "default" : "outline"}
              size="sm"
              onClick={() => setInsightMode("general")}
              className="gap-2"
            >
              <span className={insightMode === "general" ? "text-primary-foreground" : ""}>○</span>
              General Insights
            </Button>
          </div>
        </div>

          {/* Contract Insights Mode - Show Detailed Analysis */}
          {insightMode === "contract" && contractContext && (
            <div className="space-y-6">
              {/* Contract Context Panel */}
              <Card className="bg-accent/50 border-border">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{contractContext.provider}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last modified: {contractContext.lastModified}
                      </p>
                    </div>
                    <Badge variant={contractContext.riskLevel === "high" ? "destructive" : "secondary"}>
                      {contractContext.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-xs text-foreground"><span className="font-semibold">{contractContext.openRisks}</span> open risks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-foreground">Potential savings: <span className="font-semibold">{contractContext.potentialSavings}</span></span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI grounded to this contract + playbook + past deals + benchmarks
                  </p>
                </div>
              </Card>

              {/* Detailed Contract Analysis */}
              <div className="grid gap-6">
                {/* Key Terms & Pricing */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-primary" />
                      Key Terms & Pricing Analysis
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Base Rate (Proposed)</p>
                          <p className="text-2xl font-bold text-foreground">₹4,200 <span className="text-sm font-normal text-muted-foreground">per diem</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Annual Escalation</p>
                          <p className="text-2xl font-bold text-destructive">8% <span className="text-sm font-normal text-muted-foreground">per year</span></p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">Market Comparison</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Market Average Rate</span>
                            <span className="text-sm font-semibold text-foreground">₹3,575</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Apollo Proposal Premium</span>
                            <span className="text-sm font-semibold text-destructive">+17% above market</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Market Escalation Range</span>
                            <span className="text-sm font-semibold text-foreground">4.5% - 5.0%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* High Risk Clauses */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      High Risk Clauses
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Badge variant="destructive" className="mt-0.5">HIGH</Badge>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground mb-1">8% Annual Escalation Clause</h4>
                            <p className="text-sm text-muted-foreground mb-2">Clause 4.2 - Price Escalation</p>
                            <p className="text-sm text-foreground mb-2">
                              The proposed 8% annual escalation is 60% higher than market standard (5%) and significantly above medical inflation rate of 6.2%.
                            </p>
                            <p className="text-sm font-medium text-foreground">Financial Impact: ₹12.8 Cr over 3 years</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Badge variant="destructive" className="mt-0.5">HIGH</Badge>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground mb-1">Unlimited Liability Clause</h4>
                            <p className="text-sm text-muted-foreground mb-2">Clause 8.1 - Indemnification</p>
                            <p className="text-sm text-foreground mb-2">
                              No cap on liability exposure for claim processing delays. Standard market practice includes caps at 2x annual contract value.
                            </p>
                            <p className="text-sm font-medium text-foreground">Risk: Unlimited financial exposure</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Badge variant="secondary" className="mt-0.5 bg-yellow-500/20">MEDIUM</Badge>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground mb-1">Restrictive Termination Rights</h4>
                            <p className="text-sm text-muted-foreground mb-2">Clause 12.3 - Termination</p>
                            <p className="text-sm text-foreground mb-2">
                              Requires 180-day notice with 6-month penalty payment. Industry standard is 90-day notice without penalty.
                            </p>
                            <p className="text-sm font-medium text-foreground">Risk: Reduced flexibility to exit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Recommendations */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Negotiation Recommendations
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-600 text-xs font-bold">1</span>
                          Counter-Offer: ₹3,850 Base Rate
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Propose ₹3,850 per diem (+7.7% above market mean). This recognizes Apollo's premium positioning while staying within 1 standard deviation of peer rates.
                        </p>
                        <p className="text-sm font-medium text-green-600">Potential Savings: ₹4.2 Cr annually</p>
                      </div>

                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-600 text-xs font-bold">2</span>
                          Escalation: 5% + 2% Quality Incentive
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Replace fixed 8% with 5% base escalation (matching market) plus 2% quality-based incentive tied to NABH scores and patient satisfaction.
                        </p>
                        <p className="text-sm font-medium text-green-600">Benefit: Aligns incentives with outcomes</p>
                      </div>

                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-600 text-xs font-bold">3</span>
                          Cap Liability at 2x Annual Contract Value
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Add liability cap following industry standard practice. Reference similar provisions in Max Healthcare and Fortis contracts.
                        </p>
                        <p className="text-sm font-medium text-green-600">Benefit: Limits financial exposure</p>
                      </div>

                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-600 text-xs font-bold">4</span>
                          Reduce Notice Period to 90 Days
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Request standard 90-day termination notice without penalty payment. This provides operational flexibility while maintaining reasonable transition time.
                        </p>
                        <p className="text-sm font-medium text-green-600">Benefit: Increased contract flexibility</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Peer Comparison */}
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-primary" />
                      Peer Hospital Comparison
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-4 pb-2 border-b border-border text-xs font-semibold text-muted-foreground">
                        <div>Hospital</div>
                        <div>Base Rate</div>
                        <div>Escalation</div>
                        <div>vs Apollo</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="text-sm font-medium text-foreground">Max Healthcare (Delhi)</div>
                        <div className="text-sm text-foreground">₹3,600</div>
                        <div className="text-sm text-foreground">5%</div>
                        <div className="text-sm text-green-600 font-semibold">-14%</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="text-sm font-medium text-foreground">Fortis Memorial</div>
                        <div className="text-sm text-foreground">₹3,500</div>
                        <div className="text-sm text-foreground">5%</div>
                        <div className="text-sm text-green-600 font-semibold">-17%</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="text-sm font-medium text-foreground">Manipal Hospitals</div>
                        <div className="text-sm text-foreground">₹3,400</div>
                        <div className="text-sm text-foreground">4.5%</div>
                        <div className="text-sm text-green-600 font-semibold">-19%</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="text-sm font-medium text-foreground">Apollo Chennai</div>
                        <div className="text-sm text-foreground">₹3,800</div>
                        <div className="text-sm text-foreground">5%</div>
                        <div className="text-sm text-green-600 font-semibold">-10%</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-center pt-2 border-t border-border">
                        <div className="text-sm font-bold text-foreground">Apollo Bangalore (Proposed)</div>
                        <div className="text-sm font-bold text-destructive">₹4,200</div>
                        <div className="text-sm font-bold text-destructive">8%</div>
                        <div className="text-sm font-bold text-destructive">BASELINE</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg" onClick={() => handleQuickAction("email")}>
                    <Mail className="w-4 h-4 mr-2" />
                    Draft Negotiation Email
                  </Button>
                  <Button variant="outline" className="flex-1" size="lg" onClick={() => handleQuickAction("talking-points")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Generate Talking Points
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setInsightMode("general")}>
                    Ask Co-Pilot
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* General Insights Mode - Show Chat Interface */}
          {insightMode === "general" && (
            <Tabs value={mode} onValueChange={(v) => setMode(v as "quick" | "chat")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="quick" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Quick Outputs
                </TabsTrigger>
                <TabsTrigger value="chat" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Full Co-Pilot Chat
                </TabsTrigger>
              </TabsList>

            <TabsContent value="quick" className="space-y-6">
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Button 
                  variant="outline" 
                  className="flex-col h-auto py-4 gap-2 hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleQuickAction("email")}
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center font-medium">Email</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-auto py-4 gap-2 hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleQuickAction("talking-points")}
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center font-medium">Talking Points</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-auto py-4 gap-2 hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleQuickAction("summary")}
                >
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center font-medium">Exec Summary</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-auto py-4 gap-2 hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleQuickAction("justification")}
                >
                  <TrendingDown className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center font-medium">CFO Justification</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-auto py-4 gap-2 hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleQuickAction("comparison")}
                >
                  <BarChart className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center font-medium">Price Benchmarks</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-col h-auto py-4 gap-2 hover:bg-accent hover:border-primary transition-all"
                  onClick={() => {
                    handleQuickAction("email");
                    // In a real app, this would generate a counter-proposal
                  }}
                >
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center font-medium">Counter-Proposal</span>
                </Button>
              </div>

              {/* Contract Context Panel */}
              <Card className="bg-accent/50 border-border">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{contractContext.provider}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last modified: {contractContext.lastModified}
                      </p>
                    </div>
                    <Badge variant={contractContext.riskLevel === "high" ? "destructive" : "secondary"}>
                      {contractContext.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-xs text-foreground"><span className="font-semibold">{contractContext.openRisks}</span> open risks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-foreground">Potential savings: <span className="font-semibold">{contractContext.potentialSavings}</span></span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI grounded to this contract + playbook + past deals + benchmarks
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              {/* Contract Context Panel */}
              <Card className="bg-accent/50 border-border">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{contractContext.provider}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last modified: {contractContext.lastModified}
                      </p>
                    </div>
                    <Badge variant={contractContext.riskLevel === "high" ? "destructive" : "secondary"}>
                      {contractContext.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-xs text-foreground"><span className="font-semibold">{contractContext.openRisks}</span> open risks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-foreground">Potential savings: <span className="font-semibold">{contractContext.potentialSavings}</span></span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI grounded to this contract + playbook + past deals + benchmarks
                  </p>
                </div>
              </Card>

              {/* Enhanced Chat Interface */}
              <Card className="border-border">
                <div className="h-[500px] flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[75%] rounded-lg p-4 ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted text-foreground border border-border"
                            }`}
                          >
                            {msg.role === "assistant" && (
                              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                <span className="text-xs font-semibold text-primary">Co-Pilot</span>
                              </div>
                            )}
                            <div 
                              className={`text-sm ${msg.role === "assistant" ? "prose prose-sm max-w-none" : ""}`}
                              dangerouslySetInnerHTML={{ 
                                __html: msg.role === "assistant" 
                                  ? msg.content
                                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/^## (.*$)/gm, '<h2 class="text-base font-bold mb-2 mt-3 text-foreground">$1</h2>')
                                      .replace(/^### (.*$)/gm, '<h3 class="text-sm font-semibold mb-2 mt-2 text-foreground">$1</h3>')
                                      .replace(/^• (.*$)/gm, '<li class="ml-4">$1</li>')
                                      .replace(/\n/g, '<br>')
                                  : msg.content.replace(/\n/g, '<br>')
                              }}
                            />
                            
                            {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-1">Sources referenced:</p>
                                <div className="flex flex-wrap gap-1">
                                  {msg.sources.map((source, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {source}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {msg.role === "assistant" && msg.actions && msg.actions.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-border space-y-2">
                                <p className="text-xs text-muted-foreground mb-2">Recommended next steps:</p>
                                <div className="flex flex-wrap gap-2">
                                  {msg.actions.map((action, idx) => (
                                    <Button
                                      key={idx}
                                      size="sm"
                                      variant="outline"
                                      onClick={action.onClick}
                                      className="text-xs h-8"
                                    >
                                      {action.label}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Follow-up suggestions after AI messages */}
                        {msg.role === "assistant" && idx === messages.length - 1 && followUpSuggestions.length > 0 && (
                          <div className="flex justify-start">
                            <div className="max-w-[75%] space-y-2">
                              <p className="text-xs text-muted-foreground px-2">Continue with:</p>
                              <div className="flex flex-wrap gap-2">
                                {followUpSuggestions.slice(0, 3).map((suggestion, sidx) => (
                                  <Button
                                    key={sidx}
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleSend(suggestion)}
                                    className="text-xs h-auto py-2 px-3 border border-border hover:bg-accent hover:border-primary"
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Suggested Prompts */}
                  {messages.length === 1 && (
                    <div className="px-6 pb-4">
                      <p className="text-xs text-muted-foreground mb-2">Suggested prompts based on contract analysis:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {getDynamicSuggestions().map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(prompt)}
                            className="text-left text-xs p-3 border border-border rounded-md hover:bg-accent hover:border-primary transition-all"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="border-t border-border p-4 bg-background">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask about risks, benchmarks, clauses, or negotiation strategies..."
                        className="flex-1"
                      />
                      <Button onClick={() => handleSend()} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          )}
      </main>

      <CoPilotOutputModal
        open={outputModal.open}
        onOpenChange={(open) => setOutputModal({ ...outputModal, open })}
        title={outputModal.title}
        content={outputModal.content}
        type={outputModal.type}
      />
    </div>
  );
};

export default CoPilot;
