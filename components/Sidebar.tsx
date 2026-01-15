
import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  HeartPulse, 
  Share2,
  ChevronRight
} from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, label: '概览', icon: LayoutDashboard },
    { id: AppTab.LEARNING, label: '智能学习助手', icon: GraduationCap },
    { id: AppTab.SCHEDULE, label: '时间管理', icon: Calendar },
    { id: AppTab.HEALTH, label: '心理健康', icon: HeartPulse },
    { id: AppTab.RESOURCES, label: '资源共享', icon: Share2 },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            SmartCampus
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={20} className={isActive ? 'text-indigo-600' : ''} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white">
          <p className="text-xs opacity-80 mb-1">当前学分进度</p>
          <div className="flex items-end justify-between mb-2">
            <span className="text-xl font-bold">112 / 120</span>
            <span className="text-xs">93%</span>
          </div>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-white h-full" style={{ width: '93%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
