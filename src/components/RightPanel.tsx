import React from 'react';
import { MessageCircle, FileText, ChevronRight, Bell } from 'lucide-react';

const RightPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Quick Actions */}
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Acciones Rápidas</h3>
        <div className="space-y-3">
          <button className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all group text-left flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Enviar Recordatorios</p>
                <p className="text-xs text-gray-500">WhatsApp Automático</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500" />
          </button>

          <button className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all group text-left flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Generar Facturas</p>
                <p className="text-xs text-gray-500">Pendientes del día</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-amber-500" />
          </button>
        </div>
      </section>

      {/* Notifications - Dark Card for Contrast */}
      <section className="flex-1">
        <div className="bg-[#1f2937] p-5 rounded-2xl shadow-lg flex flex-col h-full text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-gray-300" />
              <h3 className="font-medium text-gray-100">Notificaciones</h3>
            </div>
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">2</span>
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-500/20"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-100 group-hover:text-red-300 transition-colors">Cancelación: Laura Martín</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">Hace 10 min</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span className="text-xs text-gray-400">Turno 15:30</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-700/50"></div>

            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-100 group-hover:text-amber-300 transition-colors">Pago Recibido: Juan Pérez</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">Hace 1 hora</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span className="text-xs text-gray-400">Transferencia</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-2 mt-4 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all text-center">
            Ver todas las notificaciones
          </button>
        </div>
      </section>
    </div>
  );
};

export default RightPanel;