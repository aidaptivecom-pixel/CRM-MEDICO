import React from 'react';
import { Plus, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showNewButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Bienvenido, Dr. Alejandro',
  subtitle,
  showNewButton = true,
  buttonText = 'Nuevo Turno',
  onButtonClick,
  showNotifications = false
}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-AR', { 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          {title} <span className="text-2xl">👋</span>
        </h1>
        <p className="text-gray-500 mt-1">{subtitle || `Resumen de tu consultorio hoy, ${formattedDate}`}</p>
      </div>

      <div className="flex items-center gap-4 self-start md:self-auto">
        <div className="bg-white p-1 rounded-2xl border border-gray-200 shadow-sm flex">
          <button className="px-4 py-1.5 text-sm font-medium rounded-xl bg-gray-100 text-gray-900 shadow-sm">Hoy</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">Semana</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">Mes</button>
        </div>

        {showNotifications && (
          <button className="relative p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        )}

        {showNewButton && (
          <button 
            onClick={onButtonClick}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-medium transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus size={18} />
            <span>{buttonText}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;