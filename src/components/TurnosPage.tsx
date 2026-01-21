import React, { useState } from 'react';
import { Calendar, List, Columns3, Clock, MapPin, Video, Phone, MessageCircle, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import CalendarComponent from './Calendar';

interface Turno {
  id: string;
  paciente: string;
  telefono: string;
  fecha: string;
  hora: string;
  tipo: 'primera' | 'seguimiento' | 'tdah' | 'terapia' | 'control';
  modalidad: 'presencial' | 'online';
  precio: number;
  estado: 'pendiente' | 'confirmado' | 'hoy' | 'completado' | 'cancelado';
  pagado: boolean;
}

const turnos: Turno[] = [
  { id: '1', paciente: 'María González', telefono: '+54 11 4567-8901', fecha: '2026-01-28', hora: '10:00', tipo: 'primera', modalidad: 'presencial', precio: 110000, estado: 'pendiente', pagado: false },
  { id: '2', paciente: 'Juan Pérez', telefono: '+54 11 5678-1234', fecha: '2026-01-28', hora: '11:30', tipo: 'seguimiento', modalidad: 'online', precio: 80000, estado: 'confirmado', pagado: true },
  { id: '3', paciente: 'Laura Martín', telefono: '+54 11 6789-4567', fecha: '2026-01-27', hora: '16:00', tipo: 'terapia', modalidad: 'presencial', precio: 80000, estado: 'confirmado', pagado: true },
  { id: '4', paciente: 'Carlos Fernández', telefono: '+54 11 3456-7890', fecha: '2026-01-21', hora: '10:00', tipo: 'seguimiento', modalidad: 'presencial', precio: 80000, estado: 'hoy', pagado: true },
  { id: '5', paciente: 'Ana Rodríguez', telefono: '+54 11 2345-6789', fecha: '2026-01-21', hora: '11:30', tipo: 'tdah', modalidad: 'presencial', precio: 110000, estado: 'hoy', pagado: true },
  { id: '6', paciente: 'Pedro Sánchez', telefono: '+54 11 8901-2345', fecha: '2026-01-21', hora: '15:00', tipo: 'control', modalidad: 'online', precio: 50000, estado: 'hoy', pagado: false },
  { id: '7', paciente: 'Sofía López', telefono: '+54 11 9012-3456', fecha: '2026-01-20', hora: '10:00', tipo: 'seguimiento', modalidad: 'presencial', precio: 80000, estado: 'completado', pagado: true },
  { id: '8', paciente: 'Diego Torres', telefono: '+54 11 0123-4567', fecha: '2026-01-20', hora: '16:00', tipo: 'primera', modalidad: 'online', precio: 110000, estado: 'completado', pagado: true },
  { id: '9', paciente: 'Valeria Castro', telefono: '+54 11 1234-5670', fecha: '2026-01-22', hora: '14:00', tipo: 'terapia', modalidad: 'presencial', precio: 80000, estado: 'cancelado', pagado: false },
];

const TurnosPage: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'list' | 'kanban'>('kanban');
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(turnos.find(t => t.estado === 'hoy') || null);

  const getTipoLabel = (tipo: string) => {
    const tipos: Record<string, { label: string; color: string }> = {
      'primera': { label: 'Primera Consulta', color: 'bg-blue-100 text-blue-700' },
      'seguimiento': { label: 'Seguimiento', color: 'bg-emerald-100 text-emerald-700' },
      'tdah': { label: 'Test TDAH', color: 'bg-purple-100 text-purple-700' },
      'terapia': { label: 'Psicoterapia Simbólica', color: 'bg-amber-100 text-amber-700' },
      'control': { label: 'Control Medicación', color: 'bg-orange-100 text-orange-700' },
    };
    return tipos[tipo] || { label: tipo, color: 'bg-gray-100 text-gray-700' };
  };

  const getEstadoConfig = (estado: string) => {
    const estados: Record<string, { label: string; color: string; bg: string }> = {
      'pendiente': { label: 'Pendiente', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
      'confirmado': { label: 'Confirmado', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
      'hoy': { label: 'Hoy', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
      'completado': { label: 'Completado', color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200' },
      'cancelado': { label: 'Cancelado', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
    };
    return estados[estado] || { label: estado, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);
  };

  const TurnoCard: React.FC<{ turno: Turno }> = ({ turno }) => {
    const tipoConfig = getTipoLabel(turno.tipo);
    return (
      <div 
        onClick={() => setSelectedTurno(turno)}
        className={`p-3 bg-white rounded-xl border cursor-pointer hover:shadow-md transition-all ${
          selectedTurno?.id === turno.id ? 'ring-2 ring-emerald-200 border-emerald-300' : 'border-gray-100'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
              {turno.paciente.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">{turno.paciente}</p>
              <p className="text-xs text-gray-500">{turno.hora}hs</p>
            </div>
          </div>
          {turno.modalidad === 'online' ? (
            <Video size={14} className="text-blue-500" />
          ) : (
            <MapPin size={14} className="text-gray-400" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-0.5 rounded-full ${tipoConfig.color}`}>
            {tipoConfig.label}
          </span>
          <span className={`text-xs font-medium ${turno.pagado ? 'text-emerald-600' : 'text-amber-600'}`}>
            {turno.pagado ? '✓ Pagado' : formatPrecio(turno.precio)}
          </span>
        </div>
      </div>
    );
  };

  const KanbanColumn: React.FC<{ title: string; estado: string; count: number }> = ({ title, estado, count }) => {
    const config = getEstadoConfig(estado);
    const columnTurnos = turnos.filter(t => t.estado === estado);
    
    return (
      <div className="flex-1 min-w-[250px]">
        <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${config.bg.replace('bg-', 'border-')}`}>
          <h3 className={`font-semibold text-sm ${config.color}`}>{title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>{count}</span>
        </div>
        <div className="space-y-2">
          {columnTurnos.map(turno => (
            <TurnoCard key={turno.id} turno={turno} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controles de vista */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'calendar' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar size={16} />
            Calendario
          </button>
          <button
            onClick={() => setView('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'kanban' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Columns3 size={16} />
            Kanban
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List size={16} />
            Lista
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Vista principal */}
        <div className="xl:col-span-2">
          {view === 'calendar' && <CalendarComponent />}
          
          {view === 'kanban' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex gap-4 overflow-x-auto pb-2">
                <KanbanColumn title="Pendientes" estado="pendiente" count={turnos.filter(t => t.estado === 'pendiente').length} />
                <KanbanColumn title="Confirmados" estado="confirmado" count={turnos.filter(t => t.estado === 'confirmado').length} />
                <KanbanColumn title="Hoy" estado="hoy" count={turnos.filter(t => t.estado === 'hoy').length} />
                <KanbanColumn title="Completados" estado="completado" count={turnos.filter(t => t.estado === 'completado').length} />
              </div>
            </div>
          )}

          {view === 'list' && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Paciente</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha/Hora</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Modalidad</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Precio</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {turnos.map(turno => {
                    const tipoConfig = getTipoLabel(turno.tipo);
                    const estadoConfig = getEstadoConfig(turno.estado);
                    return (
                      <tr 
                        key={turno.id} 
                        onClick={() => setSelectedTurno(turno)}
                        className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedTurno?.id === turno.id ? 'bg-emerald-50/50' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                              {turno.paciente.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-sm text-gray-900">{turno.paciente}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(turno.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })} - {turno.hora}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${tipoConfig.color}`}>
                            {tipoConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {turno.modalidad === 'online' ? (
                            <span className="flex items-center gap-1 text-xs text-blue-600">
                              <Video size={12} /> Online
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <MapPin size={12} /> Presencial
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${turno.pagado ? 'text-emerald-600' : 'text-gray-900'}`}>
                            {formatPrecio(turno.precio)}
                            {turno.pagado && <span className="text-xs ml-1">✓</span>}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${estadoConfig.bg} ${estadoConfig.color}`}>
                            {estadoConfig.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Panel de detalle */}
        <div className="xl:col-span-1">
          {selectedTurno ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    {selectedTurno.paciente.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedTurno.paciente}</h3>
                    <p className="text-sm text-gray-500">{selectedTurno.telefono}</p>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Fecha y hora</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedTurno.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })} - {selectedTurno.hora}hs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  {selectedTurno.modalidad === 'online' ? (
                    <Video size={18} className="text-blue-500" />
                  ) : (
                    <MapPin size={18} className="text-gray-400" />
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Modalidad</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedTurno.modalidad === 'online' ? 'Videollamada' : 'Av. Santa Fe 1206, 3F'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Clock size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Tratamiento</p>
                    <p className="text-sm font-medium text-gray-900">{getTipoLabel(selectedTurno.tipo).label}</p>
                  </div>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-xl ${selectedTurno.pagado ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  <div>
                    <p className="text-xs text-gray-500">Pago</p>
                    <p className={`text-lg font-bold ${selectedTurno.pagado ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {formatPrecio(selectedTurno.precio)}
                    </p>
                  </div>
                  {selectedTurno.pagado ? (
                    <CheckCircle size={24} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={24} className="text-amber-500" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {selectedTurno.estado === 'pendiente' && (
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
                    <CheckCircle size={16} />
                    Confirmar
                  </button>
                )}
                {selectedTurno.estado !== 'cancelado' && selectedTurno.estado !== 'completado' && (
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-colors">
                    <XCircle size={16} />
                    Cancelar
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
                {selectedTurno.estado !== 'completado' && (
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                    <Clock size={16} />
                    Recordatorio
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Seleccioná un turno para ver detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurnosPage;