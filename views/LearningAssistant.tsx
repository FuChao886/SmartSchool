
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Book, FileText, Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { askTutor, summarizeNotes } from '../services/geminiService';
import { ChatMessage } from '../types';

const LearningAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是你的 AI 学习助手。你可以问我学术问题，或者把课堂录音/文本发给我来整理笔记。', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'qa' | 'notes'>('qa');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let aiResponse = '';
      if (activeMode === 'qa') {
        aiResponse = await askTutor(input);
      } else {
        aiResponse = await summarizeNotes(input);
      }
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: aiResponse || '抱歉，我无法处理这个请求。', 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'API 调用失败，请检查网络或密钥设置。', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setActiveMode('qa')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeMode === 'qa' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
        >
          <BrainCircuit size={18} />
          <span>智能答疑</span>
        </button>
        <button 
          onClick={() => setActiveMode('notes')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${activeMode === 'notes' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
        >
          <FileText size={18} />
          <span>笔记整理</span>
        </button>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden relative">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'
              }`}>
                <div className="flex items-center space-x-2 mb-1 opacity-60">
                  {m.role === 'model' && <Sparkles size={14} />}
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {m.role === 'user' ? 'You' : 'SmartAI'}
                  </span>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-slate">
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center space-x-3">
                <Loader2 size={18} className="animate-spin text-indigo-600" />
                <span className="text-sm text-slate-500 italic">正在思考并整理答案...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl px-4 py-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <button className="text-slate-400 hover:text-indigo-600 p-2">
              <Mic size={20} />
            </button>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={activeMode === 'qa' ? "请输入学术问题 (例如: 解释一下薛定谔方程)..." : "粘贴课堂速记或长文本，我将为您自动整理笔记..."}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 max-h-32 resize-none"
            />
            <button 
              disabled={loading || !input.trim()}
              onClick={handleSend}
              className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            AI 助手的回答仅供参考，请根据教材和老师讲解进行核对。
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningAssistant;
