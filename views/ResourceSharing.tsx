
import React from 'react';
import { Search, Download, Star, FileText, Book, GraduationCap, UploadCloud, ArrowUpRight } from 'lucide-react';
import { Resource } from '../types';

const resources: Resource[] = [
  { id: '1', title: '《高等数学》复习精要及常考题型', author: '学霸张', type: 'Note', rating: 4.9, downloads: 1250 },
  { id: '2', title: '计算机网络 2024 期末试卷 (带答案)', author: '网安社团', type: 'Exam', rating: 4.7, downloads: 890 },
  { id: '3', title: 'Python 科学计算实战讲义', author: '李教授', type: 'Slide', rating: 4.5, downloads: 420 },
  { id: '4', title: '心理学概论 深度阅读建议', author: '心理协会', type: 'Book', rating: 4.8, downloads: 150 },
];

const ResourceSharing: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header>
          <h2 className="text-2xl font-bold text-slate-800">资源共享平台</h2>
          <p className="text-slate-500">发现、分享并学习来自全校同学的智慧。</p>
        </header>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-md">
          <UploadCloud size={20} />
          <span>上传我的资源</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="搜索课程名称、资料关键字、老师名字..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['全部资料', '课堂笔记', '历年考卷', '学术书籍'].map((tag, i) => (
          <button 
            key={i} 
            className={`py-3 rounded-2xl font-semibold text-sm transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-50">
          <div className="p-8 border-r border-slate-50">
            <div className="flex items-center space-x-2 text-indigo-600 mb-4 uppercase tracking-widest text-[10px] font-bold">
              <Star size={14} />
              <span>今日 AI 强烈推荐</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">2024春季数据结构必考点全覆盖</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              根据您的学习记录，您最近正在学习“二叉搜索树”。这份资料由校级金奖获得者整理，涵盖了二叉树所有可能的考点和实战代码。
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 hover:bg-slate-800 transition-colors">
                <Download size={16} />
                <span>立即下载</span>
              </button>
              <button className="text-indigo-600 text-sm font-bold hover:underline">预览全文</button>
            </div>
          </div>
          <div className="p-8 bg-slate-50/30 flex items-center justify-center">
             <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <p className="text-xl font-bold text-indigo-600">4,200+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">总资源</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <p className="text-xl font-bold text-green-600">1.2W+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">下载量</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <p className="text-xl font-bold text-orange-600">98%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">好评率</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <p className="text-xl font-bold text-purple-600">850+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">今日新增</p>
                </div>
             </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">热门下载</h3>
            <button className="text-indigo-600 text-xs font-bold hover:underline flex items-center">
              查看全部 <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res) => (
              <div key={res.id} className="group p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {res.type === 'Note' ? <FileText size={20} /> : res.type === 'Exam' ? <GraduationCap size={20} /> : <Book size={20} />}
                </div>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-2 min-h-[2.5rem] mb-2">{res.title}</h4>
                <p className="text-xs text-slate-400 mb-4">By {res.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold text-slate-600">{res.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{res.downloads} 下载</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSharing;
