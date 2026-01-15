
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Clock, BookOpen, Star, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Mon', hours: 4 },
  { name: 'Tue', hours: 6 },
  { name: 'Wed', hours: 5 },
  { name: 'Thu', hours: 8 },
  { name: 'Fri', hours: 7 },
  { name: 'Sat', hours: 3 },
  { name: 'Sun', hours: 2 },
];

const emotionData = [
  { name: 'Week 1', val: 70 },
  { name: 'Week 2', val: 65 },
  { name: 'Week 3', val: 80 },
  { name: 'Week 4', val: 75 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">欢迎回来, 同学! 👋</h2>
        <p className="text-slate-500">这是您今天的校园活动概览。</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '今日学习时长', val: '5.5h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '待完成任务', val: '4', icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: '知识积分', val: '1,250', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: '临近考试', val: '1', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Time Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">学习效率分析 (本周)</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 focus:ring-0">
              <option>最近7天</option>
              <option>最近30天</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calendar/Tasks Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 text-center">今日待办事项</h3>
          <div className="space-y-4">
            {[
              { time: '09:00', title: '高等数学课程', tag: 'Academic', color: 'bg-indigo-100 text-indigo-700' },
              { time: '14:30', title: '项目小组讨论', tag: 'Activity', color: 'bg-green-100 text-green-700' },
              { time: '19:00', title: 'Gemini API 研究', tag: 'Self-Study', color: 'bg-purple-100 text-purple-700' },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <span className="text-xs font-semibold text-slate-400 mt-1">{item.time}</span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">{item.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${item.color}`}>
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition-colors">
            查看完整计划表
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
