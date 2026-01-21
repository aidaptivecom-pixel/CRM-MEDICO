import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  MessageCircle, 
  Receipt, 
  FileText, 
  Settings, 
  HelpCircle,
  Search,
  BrainCircuit,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 flex-shrink-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <BrainCircuit size={20} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">MindCare</span>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full bg-gray-50 border border-gray-100 text-sm text-gray-700 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 space-y-6">
        
        {/* Group: GESTIÓN */}
        <div>
          <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gestión</div>
          <nav className="space-y-1">
            <NavItem 
              icon={LayoutDashboard} 
              label="Inicio" 
              active={currentPage === 'dashboard'} 
              onClick={() => onNavigate('dashboard')}
            />
            <NavItem 
              icon={CalendarDays} 
              label="Turnos" 
              badge="4" 
              active={currentPage === 'turnos'}
              onClick={() => onNavigate('turnos')}
            />
            <NavItem 
              icon={Users} 
              label="Pacientes" 
              active={currentPage === 'pacientes'}
              onClick={() => onNavigate('pacientes')}
            />
            <NavItem 
              icon={MessageCircle} 
              label="WhatsApp" 
              badge="3"
              active={currentPage === 'whatsapp'}
              onClick={() => onNavigate('whatsapp')}
            />
          </nav>
        </div>

        {/* Group: ADMINISTRACIÓN */}
        <div>
          <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Administración</div>
          <nav className="space-y-1">
            <NavItem 
              icon={Receipt} 
              label="Facturación" 
              active={currentPage === 'facturacion'}
              onClick={() => onNavigate('facturacion')}
            />
            <NavItem 
              icon={FileText} 
              label="Reportes" 
              active={currentPage === 'reportes'}
              onClick={() => onNavigate('reportes')}
            />
            <NavItem 
              icon={Settings} 
              label="Configuración" 
              active={currentPage === 'config'}
              onClick={() => onNavigate('config')}
            />
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-4">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl transition-colors">
          <HelpCircle size={18} />
          <span>Ayuda y Soporte</span>
        </a>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Dr. Alejandro S.</p>
            <p className="text-xs text-gray-500 truncate">Psiquiatra</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
    `}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'} />
      <span>{label}</span>
    </div>
    {badge && (
      <span className={`py-0.5 px-2 rounded-lg text-xs font-bold ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
        {badge}
      </span>
    )}
  </button>
);

export default Sidebar;