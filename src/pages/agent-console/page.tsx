import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { findAgentResponse, agentResponses } from '@/mocks/agentResponses';

interface AgentLayer {
  name: string;
  agents: AgentInfo[];
}

interface AgentInfo {
  id: string;
  name: string;
  domain: string;
  icon: string;
  color: string;
  emoji: string;
}

interface ChatMessage {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

const AGENT_LAYERS: AgentLayer[] = [
  {
    name: 'Strategic',
    agents: [
      { id: 'strategy', name: 'Strategy AI', domain: 'Analyse & Planification', icon: 'ri-lightbulb-flash-line', color: '#4A7A1E', emoji: '🎯' },
      { id: 'risk', name: 'Risk AI', domain: 'Enterprise Risk Management', icon: 'ri-alert-line', color: '#C2410C', emoji: '⚠️' },
      { id: 'ceo-copilot', name: 'CEO Copilot', domain: 'Synthèse & Pilotage', icon: 'ri-vip-crown-line', color: '#1A1A2E', emoji: '👑' },
      { id: 'data-analytics', name: 'Data Analytics AI', domain: 'Dashboards & Prédictif', icon: 'ri-bar-chart-grouped-line', color: '#8B3040', emoji: '📊' },
    ],
  },
  {
    name: 'Compliance & Regulatory',
    agents: [
      { id: 'compliance', name: 'Compliance AI', domain: 'Conformité Réglementaire', icon: 'ri-shield-check-line', color: '#86BC25', emoji: '🛡️' },
      { id: 'aml', name: 'AML AI', domain: 'LBC/FT, KYC & Sanctions', icon: 'ri-fingerprint-line', color: '#8B3A4A', emoji: '🔍' },
      { id: 'transfer-pricing', name: 'Transfer Pricing AI', domain: 'BEPS & Documentation', icon: 'ri-exchange-dollar-line', color: '#0D7B5F', emoji: '💱' },
      { id: 'tax', name: 'Tax AI', domain: 'Fiscalité UEMOA/CEMAC', icon: 'ri-file-list-3-line', color: '#6B4A3A', emoji: '📋' },
      { id: 'audit', name: 'Audit AI', domain: 'Audit & Due Diligence', icon: 'ri-search-eye-line', color: '#4A5568', emoji: '🔎' },
      { id: 'regulatory-intelligence', name: 'Regulatory Intel AI', domain: 'Veille 24/7', icon: 'ri-radar-line', color: '#2D5A3F', emoji: '📡' },
    ],
  },
  {
    name: 'Knowledge & Content',
    agents: [
      { id: 'knowledge', name: 'Knowledge AI', domain: 'Base Documentaire RAG', icon: 'ri-book-open-line', color: '#9B7B2C', emoji: '📚' },
      { id: 'knowledge-graph', name: 'Knowledge Graph AI', domain: 'Graphe Sémantique', icon: 'ri-git-branch-line', color: '#7B5C2A', emoji: '🕸️' },
      { id: 'content', name: 'Content AI', domain: 'SEO, GEO & Contenu', icon: 'ri-article-line', color: '#7A9B2A', emoji: '✍️' },
      { id: 'thought-leadership', name: 'Thought Leadership', domain: 'Livres Blancs & Études', icon: 'ri-quill-pen-line', color: '#B8543A', emoji: '📝' },
    ],
  },
  {
    name: 'Growth & Client',
    agents: [
      { id: 'business-development', name: 'Business Dev AI', domain: 'Prospection & Pipeline', icon: 'ri-user-search-line', color: '#5C6B7A', emoji: '🚀' },
      { id: 'proposal', name: 'Proposal AI', domain: 'Offres & Appels d\'Offres', icon: 'ri-draft-line', color: '#5B8C2A', emoji: '📄' },
      { id: 'client-success', name: 'Client Success AI', domain: 'Satisfaction & NPS', icon: 'ri-heart-line', color: '#8B7330', emoji: '💚' },
      { id: 'learning', name: 'Learning AI', domain: 'Formation & Académie', icon: 'ri-graduation-cap-line', color: '#2D7A3A', emoji: '🎓' },
      { id: 'growth-influence', name: 'Growth & Influence', domain: 'Marque & RP', icon: 'ri-megaphone-line', color: '#C05A3A', emoji: '📢' },
    ],
  },
  {
    name: 'Innovation & Quality',
    agents: [
      { id: 'quality-review', name: 'Quality Review AI', domain: 'Contrôle Qualité', icon: 'ri-check-double-line', color: '#6B7280', emoji: '✅' },
      { id: 'innovation-lab', name: 'Innovation Lab AI', domain: 'Veille IA & RegTech', icon: 'ri-rocket-line', color: '#A0456A', emoji: '💡' },
    ],
  },
];

const ALL_AGENTS = AGENT_LAYERS.flatMap((l) => l.agents);

export default function AgentConsolePage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedAgentId, setSelectedAgentId] = useState<string>('strategy');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedAgent = ALL_AGENTS.find((a) => a.id === selectedAgentId) || ALL_AGENTS[0];

  useEffect(() => {
    const greeting = findAgentResponse(selectedAgentId, '__greeting__');
    setMessages([{
      role: 'agent',
      content: `Bonjour, je suis **${selectedAgent.name}**, votre expert en ${selectedAgent.domain.toLowerCase()}. Je suis opérationnel et prêt à vous assister.\n\nPosez-moi votre question ou choisissez une suggestion ci-dessous. 👇`,
      timestamp: new Date(),
    }]);
  }, [selectedAgentId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setSidebarOpen(false);
    setMessages([]);
    setInput('');
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const response = findAgentResponse(selectedAgentId, trimmed);
      const agentMsg: ChatMessage = { role: 'agent', content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, agentMsg]);
      setIsThinking(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (q: string) => {
    setInput(q);
    setTimeout(() => {
      const trimmed = q.trim();
      const userMsg: ChatMessage = { role: 'user', content: trimmed, timestamp: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsThinking(true);
      setTimeout(() => {
        const response = findAgentResponse(selectedAgentId, trimmed);
        const agentMsg: ChatMessage = { role: 'agent', content: response, timestamp: new Date() };
        setMessages((prev) => [...prev, agentMsg]);
        setIsThinking(false);
      }, 800 + Math.random() * 1200);
    }, 200);
  };

  const getSuggestedQuestions = (): string[] => {
    return agentResponses[selectedAgentId]?.suggestedQuestions || [];
  };

  const suggestedQuestions = getSuggestedQuestions();

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      <SeoHead
        title="KHEPRA OS 2 Agent Console — Console Interactive des 21 Agents IA | KHEPRA EXPERTS"
        description="Console interactive KHEPRA OS 2 : dialoguez avec nos 21 agents IA spécialisés en stratégie, risques, conformité, LBC/FT, prix de transfert, fiscalité, audit et plus. 5 couches, Master Orchestrator, réponses sourcées BCEAO/COBAC/OHADA/GAFI. Disponible 24/7."
        keywords="KHEPRA OS 2 Agent Console, agents IA interactifs, Strategy AI, Risk AI, Compliance AI, AML AI, Transfer Pricing AI, dialogue agent IA, intelligence réglementaire augmentée, console IA KHEPRA"
        canonicalPath="/agent-console"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />
      <Navigation />

      <main className="flex-1 flex flex-col lg:flex-row pt-20">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-foreground-950 text-white shadow-xl flex items-center justify-center cursor-pointer"
        >
          <i className={`${sidebarOpen ? 'ri-close-line' : 'ri-robot-line'} text-xl`} />
        </button>

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-white border-r border-background-200 z-40
          transform transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 border-b border-background-200">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-foreground-950 flex items-center justify-center">
                <i className="ri-robot-line text-white text-sm" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground-950 font-heading">KHEPRA OS 2</h2>
                <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Agent Console</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase">21 Agents Actifs</span>
            </div>
          </div>

          <div className="p-3">
            {AGENT_LAYERS.map((layer) => (
              <div key={layer.name} className="mb-3">
                <div className="flex items-center gap-1.5 px-1 mb-1.5">
                  <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-widest">
                    {layer.name}
                  </span>
                  <div className="flex-1 h-px bg-background-200" />
                </div>
                {layer.agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => handleSelectAgent(agent.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer mb-0.5 ${
                      selectedAgentId === agent.id
                        ? 'bg-foreground-950 text-white shadow-md'
                        : 'hover:bg-background-100 text-foreground-700'
                    }`}
                  >
                    <span className="text-sm flex-shrink-0">{agent.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${selectedAgentId === agent.id ? 'text-white' : 'text-foreground-900'}`}>
                        {agent.name}
                      </p>
                      <p className={`text-[10px] truncate ${selectedAgentId === agent.id ? 'text-gray-400' : 'text-foreground-400'}`}>
                        {agent.domain}
                      </p>
                    </div>
                    {selectedAgentId === agent.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-background-200 mt-auto">
            <a
              href="/agents-experts"
              className="flex items-center gap-2 text-xs text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer"
            >
              <i className="ri-team-line" />
              Voir les 21 agents en détail
            </a>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-5rem)] bg-background-50">
          {/* Agent header */}
          <div className="bg-white border-b border-background-200 px-6 py-4 flex items-center gap-4 sticky top-20 z-20">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${selectedAgent.color}15` }}>
              {selectedAgent.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-foreground-950 font-heading">{selectedAgent.name}</h2>
              <p className="text-xs text-foreground-500">{selectedAgent.domain}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-700 uppercase">En ligne</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-100">
                <i className="ri-shield-check-line text-xs text-foreground-500" />
                <span className="text-[10px] font-bold text-foreground-500 uppercase">Score ≥ 95/100</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'agent' && (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${selectedAgent.color}15` }}>
                      <span className="text-sm">{selectedAgent.emoji}</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-foreground-950 text-white rounded-br-md'
                        : 'bg-white border border-background-200 text-foreground-800 rounded-bl-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                        .replace(/\n/g, '<br/>')
                        .replace(/\|/g, '│'),
                    }} />
                    <p className="text-[10px] mt-2 opacity-50 text-right">
                      {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-foreground-950 flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-user-line text-white text-xs" />
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${selectedAgent.color}15` }}>
                    <span className="text-sm">{selectedAgent.emoji}</span>
                  </div>
                  <div className="bg-white border border-background-200 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-foreground-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-foreground-400 animate-bounce" style={{ animationDelay: '200ms' }} />
                      <div className="w-2 h-2 rounded-full bg-foreground-400 animate-bounce" style={{ animationDelay: '400ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && suggestedQuestions.length > 0 && (
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4">
              <p className="text-[10px] text-foreground-400 uppercase tracking-wider font-bold mb-2">
                Questions suggérées
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="px-4 py-2 rounded-full border border-background-200 bg-white text-xs text-foreground-600 hover:border-foreground-300 hover:text-foreground-800 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-background-200 bg-white px-4 sm:px-6 lg:px-8 py-4 sticky bottom-0">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Posez votre question à ${selectedAgent.name}...`}
                className="flex-1 px-4 py-3 rounded-xl border border-background-200 bg-background-50 text-sm text-foreground-800 placeholder-foreground-400 focus:outline-none focus:border-foreground-300 focus:ring-1 focus:ring-foreground-300 transition-all"
                disabled={isThinking}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="w-11 h-11 rounded-xl bg-foreground-950 text-white flex items-center justify-center cursor-pointer hover:bg-foreground-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <i className="ri-send-plane-fill text-sm" />
              </button>
            </div>
            <p className="text-[10px] text-foreground-400 text-center mt-2 max-w-3xl mx-auto">
              KHEPRA OS 2 — Les réponses sont générées par les agents IA. Pour une consultation personnalisée,{' '}
              <button
                onClick={() => navigate('/contact')}
                className="underline cursor-pointer hover:text-foreground-600"
              >
                contactez un expert humain
              </button>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}