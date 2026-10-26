import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, ArrowUpRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { SAMPLE_PROPERTIES } from '../../data/properties';
import { Property, AIMessage } from '../../types/property';
import { formatINR } from '../../utils/formatters';

interface EstateMateAIProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export const EstateMateAI: React.FC<EstateMateAIProps> = ({
  isOpen,
  onClose,
  onSelectProperty
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am EstateMate AI, your architectural property discovery advisor. Tell me your preferred city, budget in Lakhs/Crores, bedroom count, or lifestyle features (e.g. "I want a 3-BHK in Indore under ₹1 Cr with pool or terrace").',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickPrompts = [
    '3 BHK in Indore under ₹1 Crore',
    'Luxury villa with private pool in Super Corridor',
    'Eco smart home in Bengaluru Whitefield',
    'Lake view residence in Bhopal Arera Colony'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Intelligent recommendation logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matched = [...SAMPLE_PROPERTIES];

      // City filter
      if (lower.includes('indore')) matched = matched.filter(p => p.city === 'Indore');
      else if (lower.includes('bhopal')) matched = matched.filter(p => p.city === 'Bhopal');
      else if (lower.includes('bengaluru') || lower.includes('bangalore')) matched = matched.filter(p => p.city === 'Bengaluru');
      else if (lower.includes('delhi') || lower.includes('gurgaon')) matched = matched.filter(p => p.city === 'Delhi NCR');
      else if (lower.includes('mumbai')) matched = matched.filter(p => p.city === 'Mumbai');

      // Bedrooms
      if (lower.includes('3 bhk') || lower.includes('3-bhk') || lower.includes('3 bed')) {
        matched = matched.filter(p => p.bedrooms >= 3);
      } else if (lower.includes('4 bhk') || lower.includes('4-bhk') || lower.includes('4 bed')) {
        matched = matched.filter(p => p.bedrooms >= 4);
      } else if (lower.includes('5 bhk')) {
        matched = matched.filter(p => p.bedrooms >= 5);
      }

      // Budget detection (e.g. 1 cr, 90 lakh, 2 cr)
      if (lower.includes('under 1 cr') || lower.includes('under 1 crore') || lower.includes('under ₹1 cr') || lower.includes('under 90 lakh')) {
        matched = matched.filter(p => p.price <= 10000000);
      } else if (lower.includes('under 2 cr') || lower.includes('under 2 crore')) {
        matched = matched.filter(p => p.price <= 20000000);
      }

      // Feature search (pool, terrace, lake, golf, eco)
      if (lower.includes('pool')) {
        matched = matched.filter(p => p.amenities.some(a => a.toLowerCase().includes('pool')) || p.description.toLowerCase().includes('pool'));
      }
      if (lower.includes('lake')) {
        matched = matched.filter(p => p.title.toLowerCase().includes('lake') || p.description.toLowerCase().includes('lake'));
      }

      // If no strict match, fallback to top 2 closest
      const finalMatches = matched.length > 0 ? matched.slice(0, 3) : SAMPLE_PROPERTIES.slice(0, 2);

      let replyText = '';
      if (matched.length > 0) {
        replyText = `I found ${matched.length} property match${matched.length > 1 ? 'es' : ''} in our database that align with your criteria. Here are the top recommendations:`;
      } else {
        replyText = `I couldn't find an exact match for all those parameters simultaneously, but here are the closest architectural alternatives that might inspire you:`;
      }

      const botReply: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        recommendedPropertyIds: finalMatches.map(p => p.id),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
      setIsProcessing(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-midnight-900 border border-gold-400/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-midnight-950/90 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-400 text-midnight-950 flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
                EstateMate AI Advisor
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-semibold">
                  Active
                </span>
              </h3>
              <p className="text-[11px] text-stone-400">Intelligent Architectural Discovery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gold-400 text-midnight-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-midnight-950/80 text-stone-200 border border-stone-800 rounded-tl-none shadow-md'
                }`}
              >
                <p>{msg.text}</p>

                {/* Render recommended property preview cards inside assistant message */}
                {msg.recommendedPropertyIds && msg.recommendedPropertyIds.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-800 space-y-2">
                    {msg.recommendedPropertyIds.map(id => {
                      const prop = SAMPLE_PROPERTIES.find(p => p.id === id);
                      if (!prop) return null;
                      return (
                        <div
                          key={prop.id}
                          onClick={() => {
                            onClose();
                            onSelectProperty(prop);
                          }}
                          className="p-2.5 rounded-xl bg-midnight-900 border border-stone-700/60 hover:border-gold-400 transition cursor-pointer flex items-center justify-between gap-2 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              className="w-12 h-10 object-cover rounded-lg shrink-0"
                            />
                            <div className="truncate">
                              <h5 className="font-serif font-bold text-xs text-white truncate group-hover:text-gold-300">
                                {prop.title}
                              </h5>
                              <p className="text-[10px] text-stone-400">{prop.locality}, {prop.city} • {prop.bedrooms} BHK</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-serif font-bold text-xs text-gold-300 block">
                              {formatINR(prop.price)}
                            </span>
                            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 justify-end">
                              View <ArrowUpRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <span
                  className={`text-[9px] block mt-1 ${
                    msg.sender === 'user' ? 'text-midnight-900/70 text-right' : 'text-stone-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-stone-400 pl-10">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" />
              EstateMate is evaluating architectural database matches...
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-midnight-950/60 border-t border-stone-800/80 overflow-x-auto flex items-center gap-2">
          <span className="text-[10px] text-stone-500 uppercase tracking-wider shrink-0">Try:</span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-midnight-900 hover:bg-stone-800 text-stone-300 hover:text-gold-300 border border-stone-800 shrink-0 whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="p-3 bg-midnight-950 border-t border-stone-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about properties (e.g., '3 BHK in Indore under ₹1 Cr with pool')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputQuery)}
            className="flex-1 bg-midnight-900 text-stone-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-800 focus:border-gold-400 focus:outline-none"
          />
          <button
            onClick={() => handleSend(inputQuery)}
            disabled={!inputQuery.trim() || isProcessing}
            className="p-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-midnight-950 disabled:opacity-40 transition shadow"
          >
            <Send className="w-4 h-4 stroke-[2.4]" />
          </button>
        </div>
      </div>
    </div>
  );
};
