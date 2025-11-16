import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CoPilot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your Negotiation Co-Pilot. I can help you with contract insights, past deal comparisons, and negotiation strategies. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");

  const suggestedPrompts = [
    "What did we sign with Apollo last time?",
    "Give negotiation justification for lowering escalation.",
    "Suggest fallback clause for termination rights.",
    "Compare this rate with similar providers.",
  ];

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

          <Card className="border-border">
            <div className="h-[500px] flex flex-col">
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
    </div>
  );
};

export default CoPilot;
