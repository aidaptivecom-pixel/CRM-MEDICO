import React, { useState } from 'react';
import { Search, Plus, Phone, Mail, FileText, Calendar, MessageCircle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface HistorialTurno {
  fecha: string;
  tipo: string;
  estado: 'asistio' | 'no_asistio' | 'cancelado';
  monto: number;
  pagado: boolean;
}

interface Paciente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  tratamiento: string;
  sesionesCompletadas: number;
  sesionesTotales: number;
  deuda: number;
  estado: 'activo' | 'deuda' | 'inactivo';
  ultimaVisita: string;
  proximoTurno?: string;
  facturacion: {
    cuit: string;
    condicion: string;
    domicilio: string;
  };
  historial: HistorialTurno[];
}

const pacientes: Paciente[] = [
  {
    id: '1',
    nombre: 'María González',
    telefono: '+54 11 4567-8901',
    email: 'maria.gonzalez@email.com',
    tratamiento: 'Test TDAH + Seguimiento',
    sesionesCompletadas: 12,
    sesionesTotales: 15,
    deuda: 0,
    estado: 'activo',
    ultimaVisita: '2026-01-15',
    proximoTurno: '2026-01-28',
    facturacion: {
      cuit: '27-28456789-4',
      condicion: 'Consumidor Final',
      domicilio: 'Av. Corrientes 1234, CABA'
    },
    historial: [
      { fecha: '2026-01-15', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2026-01-08', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2026-01-02', tipo: 'Seguimiento', estado: 'no_asistio', monto: 80000, pagado: false },
      { fecha: '2025-12-20', tipo: 'Primera Consulta', estado: 'asistio', monto: 110000, pagado: true },
    ]
  },
  {
    id: '2',
    nombre: 'Juan Pérez',
    telefono: '+54 11 5678-1234',
    email: 'juan.perez@email.com',
    tratamiento: 'Seguimiento mensual',
    sesionesCompletadas: 8,
    sesionesTotales: 12,
    deuda: 80000,
    estado: 'deuda',
    ultimaVisita: '2026-01-20',
    proximoTurno: '2026-01-28',
    facturacion: {
      cuit: '20-28456789-3',
      condicion: 'Monotributista',
      domicilio: 'Av. Cabildo 1500, CABA'
    },
    historial: [
      { fecha: '2026-01-20', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: false },
      { fecha: '2026-01-06', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2025-12-15', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
    ]
  },
  {
    id: '3',
    nombre: 'Laura Martín',
    telefono: '+54 11 6789-4567',
    email: 'laura.martin@email.com',
    tratamiento: 'Psicoterapia Simbólica',
    sesionesCompletadas: 3,
    sesionesTotales: 12,
    deuda: 0,
    estado: 'activo',
    ultimaVisita: '2026-01-18',
    proximoTurno: '2026-01-27',
    facturacion: {
      cuit: '27-30456789-1',
      condicion: 'Consumidor Final',
      domicilio: 'Juncal 2500, CABA'
    },
    historial: [
      { fecha: '2026-01-18', tipo: 'Psicoterapia', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2026-01-11', tipo: 'Psicoterapia', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2026-01-04', tipo: 'Primera Consulta', estado: 'asistio', monto: 110000, pagado: true },
    ]
  },
  {
    id: '4',
    nombre: 'Carlos Fernández',
    telefono: '+54 11 3456-7890',
    email: 'carlos.fernandez@email.com',
    tratamiento: 'Control de medicación',
    sesionesCompletadas: 24,
    sesionesTotales: 24,
    deuda: 0,
    estado: 'activo',
    ultimaVisita: '2026-01-21',
    facturacion: {
      cuit: '20-25456789-0',
      condicion: 'Responsable Inscripto',
      domicilio: 'Libertador 4000, CABA'
    },
    historial: [
      { fecha: '2026-01-21', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2025-12-17', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
      { fecha: '2025-11-19', tipo: 'Seguimiento', estado: 'asistio', monto: 80000, pagado: true },
    ]
  },
  {
    id: '5',
    nombre: 'Ana Rodríguez',
    telefono: '+54 11 2345-6789',
    email: 'ana.rodriguez@email.com',
    tratamiento: 'Test TDAH',
    sesionesCompletadas: 1,
    sesionesTotales: 3,
    deuda: 110000,
    estado: 'deuda',
    ultimaVisita: '2026-01-14',
    proximoTurno: '2026-01-24',
    facturacion: {
      cuit: '27-32456789-8',
      condicion: 'Consumidor Final',
      domicilio: 'Callao 800, CABA'
    },
    historial: [
      { fecha: '2026-01-14', tipo: 'Test TDAH', estado: 'asistio', monto: 110000, pagado: false },
    ]
  },
  {
    id: '6',
    nombre: 'Pedro Sánchez',
    telefono: '+54 11 8901-2345',
    email: 'pedro.sanchez@email.com',
    tratamiento: 'Evaluación inicial',
    sesionesCompletadas: 0,
    sesionesTotales: 1,
    deuda: 0,
    estado: 'inactivo',
    ultimaVisita: '2025-11-10',
    facturacion: {
      cuit: '',
      condicion: '',
      domicilio: ''
    },
    historial: [
      { fecha: '2025-11-10', tipo: 'Primera Consulta', estado: 'cancelado', monto: 110000, pagado: false },
    ]
  },
];

const PacientesPage: React.FC = () => {
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(pacientes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<'all' | 'activo' | 'deuda' | 'inactivo'>('all');

  const filteredPacientes = pacientes.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.telefono.includes(searchTerm) ||
                          p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEstado === 'all' || p.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'activo': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">🟢 Activo</span>;
      case 'deuda': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">🟡 Deuda</span>;
      case 'inactivo': return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">⚪ Inactivo</span>;
      default: return null;
    }
  };

  const getHistorialIcon = (estado: string) => {
    switch(estado) {
      case 'asistio': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'no_asistio': return <XCircle size={14} className="text-red-500" />;
      case 'cancelado': return <AlertCircle size={14} className="text-gray-400" />;
      default: return null;
    }
  };

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);
  };

  const calcularProgreso = (completadas: number, totales: number) => {
    return Math.round((completadas / totales) * 100);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-260px)]">
      <div className="w-96 flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar paciente..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div className="flex gap-1">
            {(['all', 'activo', 'deuda', 'inactivo'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilterEstado(f)}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-xl transition-all ${
                  filterEstado === f
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredPacientes.map(paciente => (
            <button
              key={paciente.id}
              onClick={() => setSelectedPaciente(paciente)}
              className={`w-full p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedPaciente?.id === paciente.id ? 'bg-emerald-50/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                  {paciente.nombre.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-gray-900 truncate">{paciente.nombre}</span>
                    {getEstadoBadge(paciente.estado)}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{paciente.tratamiento}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {paciente.sesionesCompletadas}/{paciente.sesionesTotales} sesiones
                    </span>
                    {paciente.deuda > 0 && (
                      <span className="text-xs text-amber-600 font-medium">
                        Debe {formatPrecio(paciente.deuda)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-medium transition-colors">
            <Plus size={16} />
            Nuevo Paciente
          </button>
        </div>
      </div>

      {selectedPaciente ? (
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xl">
                  {selectedPaciente.nombre.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{selectedPaciente.nombre}</h2>
                    {getEstadoBadge(selectedPaciente.estado)}
                  </div>
                  <p className="text-gray-500">{selectedPaciente.tratamiento}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Llamar">
                  <Phone size={18} className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Email">
                  <Mail size={18} className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-emerald-100 rounded-xl transition-colors" title="WhatsApp">
                  <MessageCircle size={18} className="text-emerald-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contacto</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-gray-700">{selectedPaciente.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-gray-700">{selectedPaciente.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Datos de Facturación</h3>
                  {selectedPaciente.facturacion.cuit ? (
                    <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">CUIT:</span>
                        <span className="font-medium text-gray-900">{selectedPaciente.facturacion.cuit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Condición IVA:</span>
                        <span className="font-medium text-gray-900">{selectedPaciente.facturacion.condicion}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Domicilio:</span>
                        <span className="font-medium text-gray-900 text-right">{selectedPaciente.facturacion.domicilio}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 rounded-2xl p-4 text-center">
                      <AlertCircle size={24} className="mx-auto text-amber-500 mb-2" />
                      <p className="text-sm text-amber-700">Sin datos de facturación</p>
                      <button className="mt-2 text-xs text-amber-600 font-medium hover:underline">
                        + Agregar datos
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Progreso del Tratamiento</h3>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {selectedPaciente.sesionesCompletadas} de {selectedPaciente.sesionesTotales} sesiones
                      </span>
                      <span className="text-sm font-bold text-emerald-600">
                        {calcularProgreso(selectedPaciente.sesionesCompletadas, selectedPaciente.sesionesTotales)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-emerald-500 h-3 rounded-full transition-all"
                        style={{ width: `${calcularProgreso(selectedPaciente.sesionesCompletadas, selectedPaciente.sesionesTotales)}%` }}
                      />
                    </div>
                    {selectedPaciente.proximoTurno && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        Próximo turno: {new Date(selectedPaciente.proximoTurno).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Historial de Turnos</h3>
                <div className="space-y-2">
                  {selectedPaciente.historial.map((turno, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-2xl border ${
                      turno.estado === 'asistio' 
                        ? 'bg-white border-gray-100' 
                        : turno.estado === 'no_asistio'
                          ? 'bg-red-50/50 border-red-100'
                          : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className="flex items-center gap-3">
                        {getHistorialIcon(turno.estado)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{turno.tipo}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(turno.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${turno.pagado ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {formatPrecio(turno.monto)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {turno.pagado ? '✓ Pagado' : turno.estado === 'cancelado' ? 'Cancelado' : 'Pendiente'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-medium transition-colors">
              <Calendar size={16} />
              Nuevo Turno
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-sm font-medium transition-colors">
              <FileText size={16} />
              Generar Factura
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-sm font-medium transition-colors">
              <MessageCircle size={16} />
              Enviar WhatsApp
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 flex items-center justify-center">
          <div className="text-center">
            <Search size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Seleccioná un paciente para ver su ficha</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacientesPage;