import Navigation from "@/components/Navigation";
import CoPilotOutputModal from "@/components/CoPilotOutputModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageSquare, Send, Mail, MessageCircle, FileText, TrendingDown, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CoPilot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Negotiation Co-Pilot. I can help you with contract insights, past deal comparisons, and negotiation strategies. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [outputModal, setOutputModal] = useState<{ open: boolean; title: string; content: string; type: "email" | "talking-points" | "summary" | "justification" | "comparison" }>({ 
    open: false, 
    title: "", 
    content: "",
    type: "email"
  });

  const suggestedPrompts = [
    "What did we sign with Apollo last time?",
    "Give negotiation justification for lowering escalation.",
    "Suggest fallback clause for termination rights.",
    "Compare this rate with similar providers.",
  ];

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
      if (userMessage.includes("Apollo last time")) {
        response = "In our 2024 contract with Apollo Hospitals Bangalore, we negotiated:\n\n• Base rate: ₹3,800 per diem (down from ₹4,100)\n• Escalation: 5% annual\n• Termination: 90-day notice period\n• Quality metrics: 10% of payments tied to NABH scores\n• Dispute resolution: ICADR arbitration in Mumbai\n\nThe negotiation took 21 days and saved an estimated ₹8.2 Cr over the 3-year term.";
      } else if (userMessage.includes("escalation")) {
        response = "Here's your negotiation justification for requesting 5% instead of 8% escalation:\n\n**Market Benchmark**: Medical inflation in India averaged 6.2% in 2024. The proposed 8% exceeds market trends.\n\n**Comparable Contracts**: Max Healthcare (5%), Fortis (5%), Manipal (4.5%) - all tier-1 hospitals accepted 5% or lower.\n\n**Historical Precedent**: Our 2024 Apollo contract used 5% escalation with quality-based incentives as an alternative value-sharing mechanism.\n\n**Financial Impact**: The 3% difference equates to ₹4.8 Cr additional cost over 3 years.\n\nRecommendation: Propose 5% escalation with a 2% quality incentive pool tied to patient outcomes.";
      } else if (userMessage.includes("fallback") && userMessage.includes("termination")) {
        response = "**Recommended Fallback Clause for Termination Rights**\n\n*Standard playbook language (Legal approved):*\n\n\"Either party may terminate this Agreement with ninety (90) days written notice. In the event of termination, Provider shall continue to provide care for all patients currently under treatment for a transition period of up to six (6) months at the contracted rates to ensure care continuity.\"\n\n**Justification**: This clause protects patient care continuity while giving both parties adequate planning time. Used successfully in 14 similar contracts in 2024.";
      } else {
        response = "I can help you with that. Based on our contract database and negotiation playbooks, I found relevant information. Would you like me to provide specific details on rates, clauses, or negotiation strategies?";
      }
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Negotiation Co-Pilot</h1>
              <p className="text-muted-foreground">
                Ask questions in natural language and get instant contract insights
              </p>
            </div>
            <Button onClick={() => navigate("/redlining")} className="gap-2">
              Start Redlining
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4 gap-2 hover:bg-accent"
              onClick={() => handleQuickAction("email")}
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-xs text-center">Generate Email</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4 gap-2 hover:bg-accent"
              onClick={() => handleQuickAction("talking-points")}
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-xs text-center">Talking Points</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4 gap-2 hover:bg-accent"
              onClick={() => handleQuickAction("summary")}
            >
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-xs text-center">Summarize Changes</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4 gap-2 hover:bg-accent"
              onClick={() => handleQuickAction("justification")}
            >
              <TrendingDown className="w-5 h-5 text-primary" />
              <span className="text-xs text-center">Escalation Justification</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4 gap-2 hover:bg-accent"
              onClick={() => handleQuickAction("comparison")}
            >
              <BarChart className="w-5 h-5 text-primary" />
              <span className="text-xs text-center">Compare Rates</span>
            </Button>
          </div>

          <Card className="border-border">
            <div className="h-[400px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold text-primary">Co-Pilot</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Prompts */}
              {messages.length === 1 && (
                <div className="px-6 pb-4">
                  <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs p-2 border border-border rounded-md hover:bg-accent transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything about contracts, rates, or negotiation strategies..."
                    className="flex-1"
                  />
                  <Button onClick={() => handleSend()} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
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
