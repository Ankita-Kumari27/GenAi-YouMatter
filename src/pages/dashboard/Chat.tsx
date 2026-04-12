import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Plus, Phone, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  "I'm feeling overwhelmed today",
  "Help me process some anxiety",
  "I need someone to talk to",
  "Guide me through a tough day",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hey there 💜 I'm Aasha, your emotional wellness companion. How are you feeling right now? I'm here to listen without any judgment." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulated response (replace with edge function call)
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Thank you for sharing that with me. It takes courage to express how you're feeling. Remember, whatever you're going through is valid. Would you like to tell me more about what's been on your mind? 🌿",
      };
      setMessages(prev => [...prev, reply]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-lavender-glow flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-semibold">Aasha</h2>
            <p className="text-xs text-muted-foreground font-body">Your companion • Always here</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" aria-label="New chat">
            <Plus className="h-4 w-4" />
          </Button>
          <a href="tel:988">
            <Button variant="ghost" size="icon" className="text-destructive" aria-label="Crisis line">
              <Phone className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3.5 text-sm font-body ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : 'glass-card rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="glass-card rounded-2xl rounded-bl-sm p-3.5 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {suggestedPrompts.map(p => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="shrink-0 text-xs font-body bg-lavender-light/50 text-primary px-3 py-1.5 rounded-full hover:bg-lavender-light transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-3 border-t border-border">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="Type your message..."
          className="rounded-full"
        />
        <Button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || typing}
          size="icon"
          className="shrink-0"
        >
          {typing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Chat;
