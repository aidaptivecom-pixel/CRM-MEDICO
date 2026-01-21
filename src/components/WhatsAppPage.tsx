import React, { useState } from 'react';
import { MessageCircle, Phone, MoreVertical, Send, Paperclip, Check, CheckCheck, Bot, User, Clock, FileText } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  time: string;
  isBot: boolean;
  isRead: boolean;
  attachment?: string;
}

interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'new' | 'bot' | 'human' | 'resolved';
  type: 'turno' | 'factura' | 'cancelacion' | 'consulta';
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'María González',
    phone: '+54 11 4567-8901',
    lastMessage: 'Perfecto, el martes a las 10 me viene bien',
    time: 'Hace 2 min',
    unread: 2,
    status: 'bot',
    type: 'turno',
    messages: [
      { id: '1', text: 'Hola, buen día! Quería consultar si tienen turnos disponibles para la semana que viene. Es para una primera consulta.', time: '14:23', isBot: false, isRead: true },
      { id: '2', text: 'Hola María! Sí, tenemos disponibilidad. Para primera consulta con el Dr. de Saizieu tenemos el martes 28 a las 10:00hs o el miércoles 29 a las 16:00hs. ¿Alguno de esos horarios te queda bien?', time: '14:24', isBot: true, isRead: true },
      { id: '3', text: 'El martes a las 10 me viene perfecto. ¿Es presencial o por videollamada?', time: '14:26', isBot: false, isRead: true },
      { id: '4', text: 'Genial! Puede ser presencial en el consultorio de Av. Santa Fe 1206, piso 3F (Retiro), o por videollamada, como prefieras. La consulta tiene un valor de $110.000 y se abona 48hs antes para confirmar el turno.', time: '14:27', isBot: true, isRead: true },
      { id: '5', text: 'Prefiero presencial. ¿Cómo hago para abonar?', time: '14:30', isBot: false, isRead: true },
      { id: '6', text: 'Podés transferir al alias impa-argentina. Una vez que hagas la transferencia, me pasás el comprobante y te confirmo el turno. ¿Te parece?', time: '14:31', isBot: true, isRead: true },
      { id: '7', text: 'Perfecto, el martes a las 10 me viene bien', time: '14:33', isBot: false, isRead: false },
    ]
  },
  {
    id: '2',
    name: 'Juan Pérez',
    phone: '+54 11 5678-1234',
    lastMessage: 'Listo, ahí te mando los datos para la factura',
    time: 'Hace 15 min',
    unread: 1,
    status: 'bot',
    type: 'factura',
    messages: [
      { id: '1', text: 'Hola! Necesitaría la factura de la sesión de hoy por favor', time: '13:45', isBot: false, isRead: true },
      { id: '2', text: 'Hola Juan! Claro, sin problema. ¿Me pasás los datos de facturación? Necesito nombre completo o razón social, CUIT, condición frente al IVA y domicilio fiscal.', time: '13:46', isBot: true, isRead: true },
      { id: '3', text: 'Listo, ahí te mando los datos para la factura', time: '13:50', isBot: false, isRead: true },
      { id: '4', text: 'Juan Pablo Pérez, CUIT 20-28456789-3, Monotributista, Av. Cabildo 1500 CABA', time: '13:51', isBot: false, isRead: false },
    ]
  },
  {
    id: '3',
    name: 'Laura Martín',
    phone: '+54 11 6789-4567',
    lastMessage: '¿Podemos pasarlo para la semana que viene?',
    time: 'Hace 1 hora',
    unread: 0,
    status: 'resolved',
    type: 'cancelacion',
    messages: [
      { id: '1', text: 'Hola, disculpen pero me surgió un imprevisto y no voy a poder ir al turno de mañana a las 15:30', time: '12:10', isBot: false, isRead: true },
      { id: '2', text: 'Hola Laura, no hay problema. Cancelo el turno de mañana miércoles 22 a las 15:30. ¿Querés que te busque otro horario para reprogramar?', time: '12:12', isBot: true, isRead: true },
      { id: '3', text: '¿Podemos pasarlo para la semana que viene?', time: '12:15', isBot: false, isRead: true },
      { id: '4', text: 'Sí, tenemos disponible el lunes 27 a las 16:00 o el jueves 30 a las 11:00. ¿Cuál te queda mejor?', time: '12:16', isBot: true, isRead: true },
      { id: '5', text: 'El lunes 27 a las 16 está perfecto', time: '12:20', isBot: false, isRead: true },
      { id: '6', text: 'Listo! Queda agendado para el lunes 27 a las 16:00hs. Te mando recordatorio el domingo. ¡Que tengas buen día!', time: '12:21', isBot: true, isRead: true },
      { id: '7', text: 'Muchas gracias!! 🙏', time: '12:22', isBot: false, isRead: true },
    ]
  },
  {
    id: '4',
    name: 'Carlos Fernández',
    phone: '+54 11 3456-7890',
    lastMessage: 'Tengo algunos síntomas que me preocupan...',
    time: 'Hace 3 horas',
    unread: 1,
    status: 'human',
    type: 'consulta',
    messages: [
      { id: '1', text: 'Buenas tardes, soy paciente del Dr. de Saizieu. Tengo una consulta sobre la medicación', time: '10:30', isBot: false, isRead: true },
      { id: '2', text: 'Hola Carlos! Contame, ¿qué necesitás consultar?', time: '10:32', isBot: true, isRead: true },
      { id: '3', text: 'Tengo algunos síntomas que me preocupan desde que empecé con la nueva dosis. ¿Puedo hablar con el doctor directamente?', time: '10:35', isBot: false, isRead: true },
      { id: '4', text: 'Entiendo Carlos. Le paso tu mensaje al Dr. de Saizieu para que te responda él directamente. Si es urgente, también podés llamar al consultorio al 11-5753-9056.', time: '10:36', isBot: true, isRead: true },
      { id: '5', text: '👨‍⚕️ Dr. de Saizieu: Hola Carlos, leí tu mensaje. Contáme qué síntomas estás teniendo así evaluamos si ajustamos la dosis o hacemos una consulta antes de lo previsto.', time: '10:45', isBot: true, isRead: true },
    ]
  },
  {
    id: '5',
    name: 'Ana Rodríguez',
    phone: '+54 11 2345-6789',
    lastMessage: 'Gracias! Ahí está el comprobante',
    time: 'Ayer',
    unread: 0,
    status: 'resolved',
    type: 'turno',
    messages: [
      { id: '1', text: 'Hola! Ya hice la transferencia para el turno del viernes', time: '18:20', isBot: false, isRead: true },
      { id: '2', text: '¡Hola Ana! Perfecto, ¿me podés pasar el comprobante así confirmo el turno?', time: '18:22', isBot: true, isRead: true },
      { id: '3', text: 'Gracias! Ahí está el comprobante', time: '18:25', isBot: false, isRead: true, attachment: 'comprobante_transferencia.jpg' },
      { id: '4', text: 'Recibido! ✅ Tu turno del viernes 24 a las 11:00hs queda confirmado. Consultorio: Av. Santa Fe 1206, 3F. Te mando recordatorio el jueves. ¡Nos vemos!', time: '18:27', isBot: true, isRead: true },
    ]
  },
];

const WhatsAppPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation>(conversations[0]);
  const [filter, setFilter] = useState<'all' | 'new' | 'bot' | 'human'>('all');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = conversations.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'new') return c.unread > 0;
    return c.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Nuevo</span>;
      case 'bot': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1"><Bot size={10}/> Bot</span>;
      case 'human': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1"><User size={10}/> Humano</span>;
      case 'resolved': return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">✓ Resuelto</span>;
      default: return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'turno': return <span className="text-xs text-blue-600">📅 Turno</span>;
      case 'factura': return <span className="text-xs text-amber-600">📄 Factura</span>;
      case 'cancelacion': return <span className="text-xs text-red-600">❌ Cancelación</span>;
      case 'consulta': return <span className="text-xs text-purple-600">💬 Consulta</span>;
      default: return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Lista de conversaciones */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle size={20} className="text-emerald-600" />
              WhatsApp Business
            </h2>
            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Bot Activo
            </span>
          </div>
          
          {/* Filtros */}
          <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
            {(['all', 'new', 'bot', 'human'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all ${
                  filter === f 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'new' ? 'Nuevos' : f === 'bot' ? 'Bot' : 'Humano'}
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv)}
              className={`w-full p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedChat.id === conv.id ? 'bg-emerald-50/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm flex-shrink-0">
                  {conv.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 text-sm truncate">{conv.name}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 truncate pr-2">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {getTypeBadge(conv.type)}
                    {getStatusBadge(conv.status)}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat activo */}
      <div className="flex-1 flex flex-col">
        {/* Header del chat */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
              {selectedChat.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
              <p className="text-xs text-gray-500">{selectedChat.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedChat.status === 'bot' && (
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <User size={14} />
                Tomar control
              </button>
            )}
            {selectedChat.status === 'human' && (
              <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors">
                <Bot size={14} />
                Devolver a Bot
              </button>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone size={18} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f0f2f5] space-y-3">
          {selectedChat.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.isBot 
                  ? 'bg-white text-gray-800 rounded-tl-sm' 
                  : 'bg-emerald-500 text-white rounded-tr-sm'
              }`}>
                {msg.isBot && msg.text.includes('Dr. de Saizieu:') && (
                  <div className="flex items-center gap-1 text-xs text-blue-600 mb-1 font-medium">
                    <User size={10} />
                    Respuesta del Doctor
                  </div>
                )}
                {msg.isBot && !msg.text.includes('Dr. de Saizieu:') && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 mb-1">
                    <Bot size={10} />
                    Asistente
                  </div>
                )}
                {msg.attachment && (
                  <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" />
                    <span className="text-xs text-gray-600">{msg.attachment}</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.text.replace('👨‍⚕️ Dr. de Saizieu: ', '')}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${
                  msg.isBot ? 'text-gray-400' : 'text-emerald-100'
                }`}>
                  <span className="text-xs">{msg.time}</span>
                  {!msg.isBot && (
                    msg.isRead ? <CheckCheck size={14} /> : <Check size={14} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip size={20} className="text-gray-500" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribir mensaje..."
              className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <button className="p-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors">
              <Send size={18} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {selectedChat.status === 'bot' 
              ? '🤖 El bot está respondiendo automáticamente' 
              : selectedChat.status === 'human' 
                ? '👤 Vos estás respondiendo manualmente'
                : '✅ Conversación resuelta'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPage;