
import React, { useState } from 'react';
import { 
  Library, 
  UtensilsCrossed, 
  Navigation, 
  Wifi, 
  Zap, 
  Package, 
  Armchair,
  Search,
  ChevronRight,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';

const CampusHub: React.FC = () => {
  const [activeFacility, setActiveFacility] = useState('library');

  const librarySeats = [
    { name: '第一图书馆', total: 1200, used: 840, status: 'Normal' },
    { name: '第二图书馆 (新馆)', total: 2000, used: 1980, status: 'Full' },
    { name: '静思自习室', total: 150, used: 45, status: 'Quiet' },
  ];

  const canteenMenu = [
    { canteen: '第一食堂', specialty: '酱香红烧肉', queueTime: '5 min', rating: 4.8 },
    { canteen: '桃源餐厅', specialty: '特色麻辣烫', queueTime: '15 min', rating: 4.5 },
    { canteen: '清真风味', specialty: '西北拉面', queueTime: '2 min', rating: 4.9 },
  ];

  const poiList = [
    { name: '教学楼 A', dist: '200m', tag: '学术' },
    { name: '体育馆', dist: '850m', tag: '运动' },
    { name: '校园医务室', dist: '400m', tag: '医疗' },
    { name: '快递自提柜', dist: '300m', tag: '生活' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">校园生活服务</h2>
          <p className="text-sm text-slate-500">集成预约、餐饮与导航，您的校园数字化管家。</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 flex items-center space-x-2">
            <Package size={14} />
            <span>快递查询 (3)</span>
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg">
            一卡通充值
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Library Seat Status */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center">
                <Library size={18} className="mr-2 text-indigo-600" />
                图书馆座位
              </h3>
              <span className="text-[10px] text-indigo-600 font-bold uppercase">实时查询</span>
            </div>
            <div className="space-y-4">
              {librarySeats.map((lib, i) => {
                const percent = Math.round((lib.used / lib.total) * 100);
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-700">{lib.name}</span>
                      <span className={`${percent > 90 ? 'text-red-500' : 'text-slate-400'}`}>{lib.used}/{lib.total}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${percent > 90 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">
              立即预约座位
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Zap size={18} className="text-yellow-400" />
              <h3 className="font-bold">水电服务</h3>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] opacity-60 uppercase font-bold">宿舍 C12-402</p>
                <p className="text-lg font-black">¥ 45.20</p>
              </div>
              <button className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-xl text-[10px] font-black uppercase">充值</button>
            </div>
          </div>
        </div>

        {/* Canteen & Navigation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Canteen List */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 flex items-center mb-6">
                <UtensilsCrossed size={18} className="mr-2 text-orange-500" />
                今日食堂热榜
              </h3>
              <div className="space-y-4">
                {canteenMenu.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-black">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{item.specialty}</h4>
                        <p className="text-[10px] text-slate-400">{item.canteen}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-orange-600">{item.queueTime}</p>
                      <p className="text-[10px] text-slate-300">排队预计</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Navigation POIs */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 flex items-center mb-6">
                <Navigation size={18} className="mr-2 text-blue-500" />
                智能导航
              </h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="text" 
                  placeholder="搜索地点或设施..." 
                  className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                {poiList.map((poi, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin size={12} />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{poi.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{poi.dist}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Network & Wifi Status */}
          <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
                <Wifi size={24} />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900 text-sm">校园网状态: 优</h4>
                <p className="text-[10px] text-indigo-600 font-medium">当前连接人数较少，适合进行大文件下载或在线课程。</p>
              </div>
            </div>
            <button className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusHub;
