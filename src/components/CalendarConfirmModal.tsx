import React from 'react';
import { Calendar, Video, Clock, UserCheck, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface CalendarConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  eventDetails: {
    title: string;
    date: string;
    timeSlot: string;
    attendeeEmail: string;
    attendeeName: string;
    area: string;
  };
}

export const CalendarConfirmModal: React.FC<CalendarConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  eventDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0e172a] border border-[#2563eb]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-white">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 text-[#94A3B8] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/20 text-[#7EDBFF] flex items-center justify-center shrink-0 border border-[#2563eb]/30">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display">
           Confirmar Agendamiento
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Se creará un nuevo evento en tu calendario principal con sala Google Meet
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#94A3B8] font-mono uppercase text-[10px]">Asunto de la Sesión</div>
              <div className="font-semibold text-white">{eventDetails.title}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#334155]/60">
            <div>
              <div className="text-[#94A3B8] font-mono uppercase text-[10px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#7EDBFF]" />
                Fecha
              </div>
              <div className="font-medium text-white">{eventDetails.date}</div>
            </div>
            <div>
              <div className="text-[#94A3B8] font-mono uppercase text-[10px] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#4edea3]" />
                Hora (Colombia)
              </div>
              <div className="font-medium text-white">{eventDetails.timeSlot}</div>
            </div>
          </div>

          <div className="pt-1 border-t border-[#334155]/60 flex items-start gap-2">
            <Video className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#94A3B8] font-mono uppercase text-[10px]">Canal de Conexión</div>
              <div className="text-white font-medium">Google Meet (Enlace cifrado generado automáticamente)</div>
            </div>
          </div>

          <div className="pt-1 border-t border-[#334155]/60 flex items-start gap-2">
            <UserCheck className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
            <div>
              <div className="text-[#94A3B8] font-mono uppercase text-[10px]">Invitados confirmados</div>
              <div className="text-[#dae2fd]">
                {eventDetails.attendeeName} ({eventDetails.attendeeEmail}) & equipo JEV Asesoría Financiera
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#060e20] rounded-xl border border-[#334155] flex items-start gap-2.5 text-xs text-[#94A3B8]">
          <AlertCircle className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
          <span>
            Esta acción sincronizará el evento en tu Google Calendar y te enviará recordatorios antes del inicio.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 px-4 rounded-xl bg-[#131b2e] hover:bg-[#1a243a] text-[#c3c6d7] text-xs font-semibold border border-[#334155] transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00a572] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#2563eb]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Sincronizando con Google...</span>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>Confirmar y Crear Evento</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
