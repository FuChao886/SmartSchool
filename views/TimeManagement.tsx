
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Circle, Plus, ListTodo, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Task } from '../types';

const TimeManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '完成数字信号处理作业', category: 'Study', deadline: 'Today 23:59', priority: 'High', completed: false },
    { id: '2', title: '英语口语练习 (30min)', category: 'Study', deadline: 'Today 18:00', priority: 'Medium', completed: true },
    { id: '3', title: '校篮球队训练', category: 'Activity', deadline: 'Tomorrow 16:00', priority: 'Medium', completed: false },
    { id: '4', title: '准备周五的物理期中考', category: 'Exam', deadline: 'Friday', priority: 'High', completed: false },
  ]);

  const [activeTab, setActiveTab] = useState<'schedule' | 'tasks'>('tasks');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <header>
          <h2 className="text-2xl font-bold text-slate-800">时间管理与计划</h2>
          <p className="text-slate-500">智能排程让您的校园生活更有序。</p>
        </header>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
          <Plus size={18} />
          <span>添加计划</span>
        </button>
      </div>

      <div className="flex space-x-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${activeTab === 'tasks' ? 'text-indigo-600' : 'text-slate-500'}`}
        >
          待办清单
          {activeTab === 'tasks' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${activeTab === 'schedule' ? 'text-indigo-600' : 'text-slate-500'}`}
        >
          动态时间表
          {activeTab === 'schedule' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex items-center space-x-3 text-indigo-700">
              <Sparkles size={20} />
              <span className="font-semibold text-sm">AI 优化建议</span>
            </div>
            <p className="text-xs text-indigo-600 italic">检测到周五有物理考试，建议今天晚上增加2小时复习时间...</p>
            <button className="text-xs font-bold uppercase tracking-widest text-indigo-700 hover:underline">采纳</button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className="group flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {task.completed ? (
                    <CheckCircle2 size={24} className="text-green-500" />
                  ) : (
                    <Circle size={24} className="text-slate-300 group-hover:text-indigo-400" />
                  )}
                  <div>
                    <h4 className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="flex items-center space-x-1 text-[10px] text-slate-400">
                        <Clock size={12} />
                        <span>{task.deadline}</span>
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        task.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-slate-600 transition-opacity">
                  <SlidersHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">学习/休息平衡</h3>
            <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-indigo-500" style={{ width: '70%' }}></div>
              <div className="absolute top-0 right-0 h-full bg-orange-400" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between mt-3 text-xs">
              <span className="text-slate-500">学习 70%</span>
              <span className="text-slate-500">休息 30%</span>
            </div>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              基于您过去一周的数据，AI 建议适当增加运动时间以提高晚间专注度。
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <Sparkles size={18} />
              <span>推荐活动</span>
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors cursor-pointer border border-white/5">
                <p className="font-semibold text-sm">开源技术沙龙</p>
                <p className="text-[10px] opacity-70">今天 19:00 - 教学楼 402</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors cursor-pointer border border-white/5">
                <p className="font-semibold text-sm">冥想放松小组</p>
                <p className="text-[10px] opacity-70">周四 15:30 - 田径场</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;
