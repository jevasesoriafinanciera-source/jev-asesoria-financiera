import React from 'react';
import { User } from 'firebase/auth';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface CalendarSchedulerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedTimeSlot: string;
  onTimeSlotChange: (slot: string) => void;
  googleUser: User | null;
  isConnectingGoogle: boolean;
  onConnectGoogle: () => void;
  onDisconnectGoogle: () => void;
  availableTimeSlots: string[];
}

export const CalendarScheduler: React.FC<CalendarSchedulerProps> = ({
  selectedDate,
  onDateChange,
  selectedTimeSlot,
  onTimeSlotChange,
  googleUser,
  isConnectingGoogle,
  onConnectGoogle,
  onDisconnectGoogle,
  availableTimeSlots,
}) => {
  // Compute minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  return (
    <div className="p-5 rounded-2xl bg-[#091124] border border-[#2563eb]/40 shadow-inner space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#334155]/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb]/20 text-[#7EDBFF] flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>GOOGLE CALENDAR & MEET INTEGRACIÓN</span>
              <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-sans font-bold">
                En vivo
              </span>
            </div>
            <div className="text-[11px] text-[#94A3B8]">
              Parametriza la fecha y genera tu enlace de videollamada cifrada
            </div>
          </div>
        </div>

        {googleUser && (
          <div className="flex items-center gap-2 bg-[#131b2e] px-2.5 py-1 rounded-lg border border-[#334155] text-xs">
            {googleUser.photoURL ? (
              <img
                src={googleUser.photoURL}
                alt={googleUser.displayName || 'Google User'}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] font-bold">
                {googleUser.displayName?.[0] || googleUser.email?.[0] || 'G'}
              </div>
            )}
            <span className="text-white text-xs max-w-[140px] truncate">
              {googleUser.displayName || googleUser.email}
            </span>
            <button
              type="button"
              onClick={onDisconnectGoogle}
              title="Cerrar sesión de Google"
              className="text-[#94A3B8] hover:text-red-400 ml-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Date and Time Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* Google Authentication Status / Sign In Button */}
      {!googleUser ? (
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155] space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563eb]/20 text-[#7EDBFF] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs text-[#c3c6d7] space-y-1">
              <p className="font-semibold text-white">
                Sincronización directa con tu cuenta Google
              </p>
              <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                Al vincular tu cuenta, la reunión se agendará automáticamente en tu Google Calendar y se creará una sala virtual segura de <strong>Google Meet</strong> con recordatorios directos.
              </p>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={onConnectGoogle}
              disabled={isConnectingGoogle}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#1f1f1f] text-xs font-medium border border-[#dadce0] transition-all shadow-sm active:scale-[0.99] disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span>{isConnectingGoogle ? 'Conectando con Google...' : 'Conectar con Google Calendar'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-[#00a572]/10 border border-[#00a572]/40 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#4edea3] shrink-0" />
          <div className="text-[#dae2fd]">
            <span className="font-bold text-white">Google Calendar Vinculado:</span> Al enviar la solicitud se agendará automáticamente el evento en tu calendario con sala Google Meet.
          </div>
        </div>
      )}
    </div>
  );
};
