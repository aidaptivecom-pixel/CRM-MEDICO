import React, { useState } from 'react';
import { FileText, Download, Eye, Search, RefreshCw, Bot, User, TrendingUp, Clock, AlertCircle, CreditCard, Receipt, MessageCircle } from 'lucide-react';

interface Factura {
  id: string;
  numero: string;
  fecha: string;
  paciente: string;
  telefono: string;
  concepto: string;
  monto: number;
  estado: 'pagada' | 'pendiente' | 'vencida';
  tipo: 'A' | 'B' | 'C';
  origen: 'bot' | 'manual';
  conversacionId?: string;
}

interface ConversacionFactura {
  id: string;
  mensajes: { text: string; isBot: boolean; time: string }[];
}

const facturas: Factura[] = [
  { id: '1', numero: '0001-00001234', fecha: '2026-01-21', paciente: 'María González', telefono: '+54 11 4567-8901', concepto: 'Psicoterapia', monto: 80000, estado: 'pagada', tipo: 'B', origen: 'bot', conversacionId: 'conv1' },
  { id: '2', numero: '0001-00001233', fecha: '2026-01-20', paciente: 'Juan Pérez', telefono: '+54 11 5678-1234', concepto: 'Consulta Psiquiatría', monto: 110000, estado: 'pagada', tipo: 'A', origen: 'manual' },
  { id: '3', numero: '0001-00001232', fecha: '2026-01-19', paciente: 'Laura Martín', telefono: '+54 11 6789-4567', concepto: 'Psicoterapia', monto: 80000, estado: 'pendiente', tipo: 'B', origen: 'bot', conversacionId: 'conv2' },
  { id: '4', numero: '0001-00001231', fecha: '2026-01-18', paciente: 'Carlos Fernández', telefono: '+54 11 3456-7890', concepto: 'Seguimiento', monto: 80000, estado: 'vencida', tipo: 'B', origen: 'manual' },
  { id: '5', numero: '0001-00001230', fecha: '2026-01-17', paciente: 'Ana Rodríguez', telefono: '+54 11 2345-6789', concepto: 'Test TDAH', monto: 110000, estado: 'pagada', tipo: 'B', origen: 'bot', conversacionId: 'conv3' },
  { id: '6', numero: '0001-00001229', fecha: '2026-01-16', paciente: 'Pedro Sánchez', telefono: '+54 11 8901-2345', concepto: 'Control Medicación', monto: 50000, estado: 'pagada', tipo: 'C', origen: 'manual' },
  { id: '7', numero: '0001-00001228', fecha: '2026-01-15', paciente: 'Sofía López', telefono: '+54 11 9012-3456', concepto: 'Seguimiento', monto: 80000, estado: 'pagada', tipo: 'B', origen: 'bot', conversacionId: 'conv4' },
  { id: '8', numero: '0001-00001227', fecha: '2026-01-14', paciente: 'Diego Torres', telefono: '+54 11 0123-4567', concepto: 'Primera Consulta', monto: 110000, estado: 'pagada', tipo: 'B', origen: 'manual' },
];

const conversaciones: Record<string, ConversacionFactura> = {
  'conv1': {
    id: 'conv1',
    mensajes: [
      { text: 'Hola! Necesitaría la factura de la sesión de hoy por favor', time: '14:32', isBot: false },
      { text: 'Hola María! Claro, ya la tengo preparada. ¿Me confirmás los datos de facturación? Tenía registrado: María González, CUIT 27-28456789-4, Consumidor Final.', time: '14:33', isBot: true },
      { text: 'Sí, esos datos están bien', time: '14:34', isBot: false },
      { text: 'Perfecto! Ya te genero la factura B por $80.000 correspondiente a la sesión de Psicoterapia de hoy.', time: '14:35', isBot: true },
      { text: 'Listo! Acá tenés tu factura ✅\n\n📄 Factura B 0001-00001234\n💰 $80.000\n📅 21/01/2026\n\nTe la adjunto en PDF.', time: '14:36', isBot: true },
      { text: 'Genial, muchas gracias!', time: '14:37', isBot: false },
    ]
  },
  'conv2': {
    id: 'conv2',
    mensajes: [
      { text: 'Hola, me podés mandar la factura de la última sesión?', time: '10:15', isBot: false },
      { text: 'Hola Laura! Sí, claro. ¿Podés pasarme tus datos de facturación? Necesito nombre/razón social, CUIT y condición frente al IVA.', time: '10:16', isBot: true },
      { text: 'Laura Martín, CUIT 27-30456789-1, Consumidor Final', time: '10:18', isBot: false },
      { text: 'Gracias Laura! Te genero la factura B por $80.000 de la sesión de Psicoterapia del 19/01. En unos minutos te la envío.', time: '10:19', isBot: true },
    ]
  },
  'conv3': {
    id: 'conv3',
    mensajes: [
      { text: 'Buen día, necesito factura de la consulta del viernes', time: '09:45', isBot: false },
      { text: 'Buen día Ana! Ya te la preparo. Fue el Test TDAH, ¿correcto? Por $110.000.', time: '09:46', isBot: true },
      { text: 'Sí, exacto', time: '09:47', isBot: false },
      { text: '¿Me pasás tus datos de facturación?', time: '09:47', isBot: true },
      { text: 'Ana Rodríguez, 27-32456789-8, Consumidor Final, Callao 800 CABA', time: '09:50', isBot: false },
      { text: 'Perfecto! Acá está tu factura ✅\n📄 Factura B 0001-00001230\n💰 $110.000 - Test TDAH', time: '09:52', isBot: true },
    ]
  },
  'conv4': {
    id: 'conv4',
    mensajes: [
      { text: 'Hola, me mandan la factura de ayer?', time: '11:20', isBot: false },
      { text: 'Hola Sofía! Sí, ya te la envío. La sesión de seguimiento de ayer fue por $80.000. ¿Los datos de facturación son los mismos de siempre?', time: '11:21', isBot: true },
      { text: 'Si, los mismos', time: '11:22', isBot: false },
      { text: 'Listo! 📄 Factura B 0001-00001228 por $80.000. Te la mando adjunta.', time: '11:23', isBot: true },
    ]
  },
};

const FacturacionPage: React.FC = () => {
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
  const [showConversacion, setShowConversacion] = useState(false);
  const [filterEstado, setFilterEstado] = useState<'all' | 'pagada' | 'pendiente' | 'vencida'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFacturas = facturas.filter(f => {
    const matchesSearch = f.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.numero.includes(searchTerm);
    const matchesFilter = filterEstado === 'all' || f.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);
  };

  const totalFacturado = facturas.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.monto, 0);
  const totalPendiente = facturas.filter(f => f.estado === 'pendiente' || f.estado === 'vencida').reduce((sum, f) => sum + f.monto, 0);
  const cantidadFacturas = facturas.length;
  const cantidadPendientes = facturas.filter(f => f.estado !== 'pagada').length;

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'pagada': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">✓ Pagada</span>;
      case 'pendiente': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">⏳ Pendiente</span>;
      case 'vencida': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium">❗ Vencida</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">Facturado (mes)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPrecio(totalFacturado)}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">Pendiente cobro</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{formatPrecio(totalPendiente)}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Receipt size={20} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Facturas emitidas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{cantidadFacturas}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <span className="text-sm text-gray-500">Por cobrar</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{cantidadPendientes}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-emerald-600" />
            Factura Rápida
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Paciente</label>
              <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100">
                <option>Seleccionar paciente...</option>
                <option>María González</option>
                <option>Juan Pérez</option>
                <option>Laura Martín</option>
                <option>Carlos Fernández</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Servicio</label>
              <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100">
                <option>Seleccionar servicio...</option>
                <option>Primera Consulta - $110.000</option>
                <option>Seguimiento - $80.000</option>
                <option>Psicoterapia Simbólica - $80.000</option>
                <option>Test TDAH - $110.000</option>
                <option>Control Medicación - $50.000</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Tipo de Factura</label>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">A</button>
                <button className="flex-1 px-3 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium">B</button>
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">C</button>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-medium transition-colors">
              <FileText size={18} />
              Generar con ARCA
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <RefreshCw size={12} />
              Sincronizado con ARCA/AFIP
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Historial de Facturas</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-100 w-40"
                />
              </div>
              <select 
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value as 'all' | 'pagada' | 'pendiente' | 'vencida')}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              >
                <option value="all">Todos</option>
                <option value="pagada">Pagadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="vencida">Vencidas</option>
              </select>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-600 flex items-center gap-1">
                <Download size={12} />
                Exportar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Número</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Paciente</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Concepto</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Monto</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Origen</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody>
                {filteredFacturas.map(factura => (
                  <tr key={factura.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(factura.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded-lg">
                        {factura.tipo} {factura.numero}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{factura.paciente}</p>
                        <p className="text-xs text-gray-400">{factura.telefono}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{factura.concepto}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatPrecio(factura.monto)}</td>
                    <td className="px-4 py-3">{getEstadoBadge(factura.estado)}</td>
                    <td className="px-4 py-3">
                      {factura.origen === 'bot' ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600">
                          <Bot size={12} />
                          Bot
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <User size={12} />
                          Manual
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors" title="Ver PDF">
                          <Eye size={14} className="text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors" title="Descargar">
                          <Download size={14} className="text-gray-400" />
                        </button>
                        {factura.conversacionId && (
                          <button 
                            onClick={() => {
                              setSelectedFactura(factura);
                              setShowConversacion(true);
                            }}
                            className="p-1.5 hover:bg-emerald-100 rounded-xl transition-colors" 
                            title="Ver conversación"
                          >
                            <MessageCircle size={14} className="text-emerald-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showConversacion && selectedFactura && selectedFactura.conversacionId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConversacion(false)}>
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-emerald-50 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <MessageCircle size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Conversación con {selectedFactura.paciente}</h3>
                  <p className="text-xs text-gray-500">
                    Factura {selectedFactura.tipo} {selectedFactura.numero} - {new Date(selectedFactura.fecha).toLocaleDateString('es-AR')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowConversacion(false)}
                className="p-2 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto max-h-[400px] bg-gray-50">
              {conversaciones[selectedFactura.conversacionId]?.mensajes.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.isBot 
                      ? 'bg-white text-gray-800 rounded-tl-lg shadow-sm' 
                      : 'bg-emerald-500 text-white rounded-tr-lg'
                  }`}>
                    {msg.isBot && (
                      <div className="flex items-center gap-1 text-xs text-emerald-600 mb-1">
                        <Bot size={10} />
                        Asistente
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 text-right ${msg.isBot ? 'text-gray-400' : 'text-emerald-100'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white rounded-b-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Bot size={14} className="text-emerald-500" />
                  <span>Factura generada automáticamente por el bot</span>
                </div>
                <button 
                  onClick={() => setShowConversacion(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacturacionPage;