import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CalendarEvent } from '../types';

const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const events: CalendarEvent[] = [
  { day: 5, type: 'confirmed' },
  { day: 8, type: 'first-visit' },
  { day: 8, type: 'confirmed' },
  { day: 12, type: 'cancelled' },
  { day: 15, type: 'confirmed' },
  { day: 15, type: 'confirmed' },
  { day: 19, type: 'pending' },
  { day: 21, type: 'confirmed' }, 
  { day: 21, type: 'first-visit' },
  { day: 21, type: 'confirmed' },
  { day: 23, type: 'pending' },
  { day: 27, type: 'confirmed' },
  { day: 28, type: 'cancelled' },
];

const Calendar: React.FC = () => {
  const getEventColor = (type: string) => {
    switch(type) {
      case 'confirmed': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-400';
      case 'cancelled': return 'bg-red-400';
      case 'first-visit': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">Enero 2026</h2>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-600 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Hoy
          </button>
          <div className="bg-gray-50 p-1 rounded-lg flex text-xs font-medium text-gray-500">
            <button className="px-3 py-1 bg-white text-gray-900 shadow-sm rounded-md">Mes</button>
            <button className="px-3 py-1 hover:text-gray-700 transition-colors">Semana</button>
            <button className="px-3 py-1 hover:text-gray-700 transition-colors">Día</button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 mb-4">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-2 flex-1 auto-rows-fr">
        {/* Empty cells for prev month (Jan 1 2026 is Thursday) */}
        {[...Array(4)].map((_, i) => (
          <div key={`prev-${i}`} className="min-h-[80px] p-2 bg-gray-50/50 rounded-xl border border-transparent"></div>
        ))}

        {/* Days */}
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          const isToday = day === 21;
          const dayEvents = events.filter(e => e.day === day);

          return (
            <div 
              key={day} 
              className={`
                relative min-h-[80px] p-3 rounded-xl border transition-all duration-200 group hover:shadow-md
                ${isToday 
                  ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-100' 
                  : 'bg-white border-gray-50 hover:border-gray-200'}
              `}
            >
              <span className={`
                text-sm font-medium mb-2 block w-7 h-7 flex items-center justify-center rounded-full
                ${isToday ? 'bg-emerald-500 text-white' : 'text-gray-700'}
              `}>
                {day}
              </span>

              {/* Event Dots */}
              <div className="flex flex-wrap gap-1.5">
                {dayEvents.map((evt, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2.5 h-2.5 rounded-full ${getEventColor(evt.type)}`}
                    title={evt.type}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs border-t border-gray-50 pt-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-gray-500">Confirmado</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400"></div><span className="text-gray-500">Pendiente</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400"></div><span className="text-gray-500">Cancelado</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400"></div><span className="text-gray-500">Primera</span></div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="font-semibold">Doctoralia Premium Sincronizado</span>
          <CheckCircle2 size={12} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Calendar;