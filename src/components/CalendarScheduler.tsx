import React from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
} from 'lucide-react';

interface CalendarSchedulerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedTimeSlot: string;
  onTimeSlotChange: (slot: string) => void;
  availableTimeSlots: string[];
}

export const CalendarScheduler: React.FC<CalendarSchedulerProps> = ({
  selectedDate,
  onDateChange,
  selectedTimeSlot,
  onTimeSlotChange,
  availableTimeSlots,
}) => {
  // Compute minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  return (
    <div className="p-5 rounded-2xl bg-[#091124] border border-[#2563eb]/40 shadow-inner space-y-4 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#334155]/60 pb-3">
        <div className="w-8 h-8 rounded-lg bg-[#2563eb]/20 text-[#7EDBFF] flex items-center justify-center">
          <Video className="w-4 h-4" />
        </div>

        <div>
          <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <span>AGENDAMIENTO JEV</span>

            <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-sans font-bold">
              En vivo
            </span>
          </div>

          <div className="text-[11px] text-[#94A3B8]">
            Selecciona la fecha y horario de tu sesión estratégica
          </div>
        </div>
      </div>

      {/* Date and Time Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Fecha */}
        <div>
          <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-[#7EDBFF]" />
            Fecha de la Sesión
          </label>

          <input
            type="date"
            min={minDateString}
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            required
            className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
          />
        </div>

        {/* Horario */}
        <div>
          <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#4edea3]" />
            Horario Disponible (Hora Colombia)
          </label>

          <select
            value={selectedTimeSlot}
            onChange={(e) => onTimeSlotChange(e.target.value)}
            className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
          >
            {availableTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot} • Sesión de 60 min
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Información del agendamiento */}
      <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155]">

        <div className="flex items-start gap-3">

          <div className="w-7 h-7 rounded-lg bg-[#2563eb]/20 text-[#7EDBFF] flex items-center justify-center shrink-0 mt-0.5">
            <Video className="w-4 h-4" />
          </div>

          <div className="text-xs text-[#c3c6d7] space-y-1">

            <p className="font-semibold text-white">
              Sesión virtual con JEV Asesoría Financiera
            </p>

            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              La cita será registrada directamente en el calendario de
              JEV Asesoría Financiera. Si seleccionas modalidad virtual,
              se generará automáticamente una sala de Google Meet y
              recibirás la invitación en tu correo electrónico.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
