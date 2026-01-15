
import React, { useState } from 'react';
import { Smile, Frown, Meh, Heart, MessageSquareText, Wind, Sparkles, Loader2 } from 'lucide-react';
import { analyzeMood } from '../services/geminiService';

const MentalHealth: React.FC = () => {
  const [journal, setJournal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ sentiment: string, feedback: string, tip: string } | null>(null);

  const handleAnalyze = async () => {
    if (!journal.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeMood(journal);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">心理健康助手</h2>
        <p className="text-slate-500 mt-2">倾诉您的心情，让我为您提供温柔的陪伴与建议。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood Journaling */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col space-y-6">
          <div className="flex items-center space-x-3 text-indigo-600">
            <MessageSquareText size={24} />
            <h3 className="text-xl font-bold">心情随笔</h3>
          </div>
          <p className="text-sm text-slate-500">最近感觉如何？有什么压力或者开心的事吗？</p>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="w-full flex-1 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[200px] text-sm leading-relaxed"
            placeholder="今天过得..."
          />
          <button
            onClick={handleAnalyze}
            disabled={!journal.trim() || isAnalyzing}
            className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} />
            )}
            <span>分析心情</span>
          </button>
        </div>

        {/* AI Response & Self-care */}
        <div className="space-y-6">
          {result ? (
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {result.sentiment}
                </span>
                <Heart className="text-pink-500 fill-pink-500" size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">AI 暖心反馈</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {result.feedback}
              </p>
              <div className="p-4 bg-white rounded-2xl border border-indigo-100">
                <div className="flex items-center space-x-2 text-indigo-700 mb-2">
                  <Wind size={18} />
                  <span className="font-bold text-xs uppercase tracking-widest">今日自愈小贴士</span>
                </div>
                <p className="text-sm text-slate-600 italic">"{result.tip}"</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 border border-slate-100 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Smile size={48} className="mb-4 opacity-20" />
              <p className="text-sm">在左侧写下您的日记，<br/>我会为您提供情绪监测和疏导建议。</p>
            </div>
          )}

          {/* Calm Corner */}
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">冥想角</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/5">
                <div className="text-left">
                  <p className="font-bold text-sm">5分钟考前减压</p>
                  <p className="text-[10px] opacity-60">引导呼吸与正念</p>
                </div>
                <Wind size={20} className="text-indigo-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/5">
                <div className="text-left">
                  <p className="font-bold text-sm">深度睡眠助眠曲</p>
                  <p className="text-[10px] opacity-60">环境白噪音与轻音乐</p>
                </div>
                <Heart size={20} className="text-pink-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
