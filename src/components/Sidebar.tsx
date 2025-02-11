import React, { useState } from 'react';
import { LayoutDashboard, Users, ClipboardList, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, isActive, isCollapsed, onClick }: NavItemProps) {
  return (
    <div 
      className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
        isActive ? 'bg-[#3a4759]' : 'hover:bg-[#3a4759]'
      }`}
      title={isCollapsed ? label : undefined}
      onClick={onClick}
    >
      <span className="text-white">{icon}</span>
      {!isCollapsed && <span className="font-medium text-white whitespace-nowrap">{label}</span>}
    </div>
  );
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div 
      className={`bg-[#2A3647] min-h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && <h1 className="text-xl font-bold text-white">Microgame - ADT</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-[#3a4759] transition-colors text-white"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Business" 
            isActive={location.pathname === '/summary'} 
            isCollapsed={isCollapsed}
            onClick={() => navigate('/summary')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Analysis" 
            isActive={location.pathname === '/user-detail'} 
            isCollapsed={isCollapsed}
            onClick={() => navigate('/user-detail')}
          />
          <NavItem 
            icon={<ClipboardList size={20} />} 
            label="Log" 
            isActive={location.pathname === '/log'}
            isCollapsed={isCollapsed}
            onClick={() => navigate('/log')}
          />
        </nav>

        <nav className="mt-auto">
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
    </div>
  );
}