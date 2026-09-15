import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import {
  createCalendarEvent,
  buildGoogleCalendarWebLink,
  CreatedCalendarEvent,
} from '../services/googleCalendar';
import {
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Send,
  MessageSquare,
  Lock,
  ChevronDown,
  Building2,
  Video,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { CalendarScheduler } from '../components/CalendarScheduler';
import { CalendarConfirmModal } from '../components/CalendarConfirmModal';
import {
  createCalendarEvent,
  buildGoogleCalendarWebLink,
  CreatedCalendarEvent,
} from '../services/googleCalendar';

interface ContactoScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const AVAILABLE_TIME_SLOTS = [
  '09:00 - 10:00',
  '10:30 - 11:30',
  '14:00 - 15:00',
  '15:30 - 16:30',
  '17:00 - 18:00',
];

export const ContactoScreen: React.FC<ContactoScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  const [formData, setFormData] = useState({
    area: 'Finanzas Corporativas & CFO as a Service',
    meetingMode: 'Virtual (Google Meet)',
    fullName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    preferredDate: getTomorrowDate(),
    preferredTime: '10:30 - 11:30',
    notes: '',
    acceptedTerms: true,
  });

 
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSchedulingCalendar, setIsSchedulingCalendar] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [createdEvent, setCreatedEvent] = useState<CreatedCalendarEvent | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auth state listener
  

  const executeCalendarBooking = async () => {
  setIsSchedulingCalendar(true);
  setCalendarError(null);

  try {
    const [startHourStr, startMinStr] =
      formData.preferredTime.split(' - ')[0].split(':');

    const [endHourStr, endMinStr] =
      formData.preferredTime.split(' - ')[1].split(':');

    const startIso =
      `${formData.preferredDate}T${startHourStr.padStart(2, '0')}:${startMinStr.padStart(2, '0')}:00-05:00`;

    const endIso =
      `${formData.preferredDate}T${endHourStr.padStart(2, '0')}:${endMinStr.padStart(2, '0')}:00-05:00`;

    const event = await createCalendarEvent({
      summary:
        `Sesión Directiva JEV Asesoría Financiera - ${formData.area}`,

      description:
        `Sesión de asesoría financiera confidencial con JEV Asesoría Financiera S.A.S.\n\n` +
        `• Cliente: ${formData.fullName}\n` +
        `• Empresa/Organización: ${formData.company || 'N/A'}\n` +
        `• Cargo: ${formData.role || 'N/A'}\n` +
        `• Correo: ${formData.email}\n` +
        `• WhatsApp: ${formData.phone}\n` +
        `• Modalidad: ${formData.meetingMode}\n` +
        `• Especialidad: ${formData.area}\n\n` +
        `Contexto inicial:\n` +
        `${formData.notes || 'Revisión técnica de indicadores y planeación estratégica.'}`,

      startTime: startIso,
      endTime: endIso,

      attendeeEmail: formData.email,
      attendeeName: formData.fullName,

      area: formData.area,
      fullName: formData.fullName,
      company: formData.company,
      role: formData.role,
      phone: formData.phone,
      meetingMode: formData.meetingMode,
      notes: formData.notes,
    });

    setCreatedEvent(event);
    setShowConfirmModal(false);
    setSubmitted(true);

  } catch (err: any) {

    console.error(
      'Error al agendar en Google Calendar:',
      err
    );

    setCalendarError(
      err.message ||
      'Ocurrió un error al agendar la sesión.'
    );

    setShowConfirmModal(false);
    setSubmitted(true);

  } finally {

    setIsSchedulingCalendar(false);

  }
};

      setCreatedEvent(event);
      setShowConfirmModal(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Error al agendar en Google Calendar:', err);
      setCalendarError(err.message || 'Ocurrió un error al agendar en Google Calendar.');
      setShowConfirmModal(false);
      setSubmitted(true);
    } finally {
      setIsSchedulingCalendar(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.meetingMode.includes('Virtual')) {
    setShowConfirmModal(true);
    return;
  }

  setSubmitted(true);
};

  const getFallbackCalendarLink = () => {
    const [startHourStr, startMinStr] = formData.preferredTime.split(' - ')[0].split(':');
    const [endHourStr, endMinStr] = formData.preferredTime.split(' - ')[1].split(':');
    const startIso = `${formData.preferredDate}T${startHourStr.padStart(2, '0')}:${startMinStr.padStart(2, '0')}:00-05:00`;
    const endIso = `${formData.preferredDate}T${endHourStr.padStart(2, '0')}:${endMinStr.padStart(2, '0')}:00-05:00`;

    return buildGoogleCalendarWebLink(
      `Sesión Estratégica JEV Asesoría Financiera - ${formData.area}`,
      `Sesión directiva confidencial con JEV Asesoría Financiera S.A.S. Cliente: ${formData.fullName}.`,
      startIso,
      endIso
    );
  };

  const getWhatsAppBookingLink = () => {
    const text = encodeURIComponent(
      `Hola JEV Asesoría Financiera, solicito agendar una Sesión Estratégica:\n- Nombre: ${formData.fullName}\n- Empresa/Perfil: ${formData.company || 'Particular'}\n- Área: ${formData.area}\n- Modalidad: ${formData.meetingMode}\n- Fecha: ${formData.preferredDate}\n- Horario deseado: ${formData.preferredTime}\n- Teléfono/Email: ${formData.phone} / ${formData.email}`
    );
    return `https://wa.me/573105550192?text=${text}`;
  };

  const faqs = [
    {
      q: '¿Qué ocurre durante la sesión diagnóstica de 45 minutos?',
      a: 'Nos reunimos directamente con el socio director asignado a su área. Revisamos sus principales indicadores de liquidez, ciclo de conversión de efectivo o carga fiscal actual, e identificamos de 3 a 5 oportunidades de mejora inmediata.',
    },
    {
      q: '¿La primera sesión tiene costo para la empresa?',
      a: 'La sesión diagnóstica inicial de 45 minutos no tiene costo. Es un espacio de exploración mutua para entender la complejidad de sus operaciones y presentar una propuesta técnica a la medida.',
    },
    {
      q: '¿Qué documentos debo tener listos antes de la reunión?',
      a: 'Para la primera llamada de encuadre no requiere enviar extractos ni balances. Si decide avanzar con nuestro Diagnóstico Forense o Plan CFO, firmamos previamente el Acuerdo de Confidencialidad (NDA) antes de recibir cualquier balance general o estado de resultados.',
    },
  ];

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* Google Calendar Confirmation Modal (Explicit Workspace User Confirmation) */}
      <CalendarConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={executeCalendarBooking}
        isLoading={isSchedulingCalendar}
        eventDetails={{
          title: `Sesión Directiva - ${formData.area}`,
          date: formData.preferredDate,
          timeSlot: `${formData.preferredTime} (Hora Colombia)`,
          attendeeEmail: formData.email,
          attendeeName: formData.fullName || 'Cliente Directivo',
          area: formData.area,
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#7EDBFF]/30 text-[#7EDBFF] text-xs font-mono font-medium">
            <Calendar className="w-3.5 h-3.5" />
            DIRECTORIO EJECUTIVO & AGENDAMIENTO
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Agende su Sesión Estratégica de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EDBFF] via-[#2563eb] to-[#4edea3]">
              Ingeniería Financiera
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed">
            Converse con nuestros socios directores en Bogotá D.C. o vía virtual por Google Meet. Evaluaremos la arquitectura de su flujo de caja, margen EBITDA o planeación tributaria.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS & BOOKING WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Directory & Locations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#4edea3]" />
                Comunicación Directa
              </h3>

              <a
                href="https://wa.me/573105550192?text=Hola%20JEV%20Asesor%C3%ADa%20Financiera%2C%20deseo%20hacer%20una%20consulta%20directa"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-[#00a572] hover:bg-[#00a572]/90 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-[#00a572]/20 text-center"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Comunicación por WhatsApp</span>
              </a>

              <div className="text-[11px] text-[#4edea3] text-center font-medium">
                Atención ejecutiva inmediata
              </div>
            </div>

            {/* Offices Card */}
            <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-5">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#7EDBFF]" />
                Sede Corporativa
              </h3>

              <div className="space-y-4 text-xs text-[#c3c6d7]">
                <div className="p-3.5 bg-[#060e20] rounded-xl border border-[#334155] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#7EDBFF]" />
                  <span className="text-white font-bold">Bogotá D.C.</span>
                  <span className="text-[11px] text-[#94A3B8] font-mono ml-auto">Sede Principal</span>
                </div>
              </div>

              <div className="p-3 bg-[#0b1326] rounded-xl border border-[#334155] text-xs text-[#94A3B8] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#4edea3] shrink-0" />
                <span>Cumplimiento riguroso de reserva bajo Ley 43 y Habeas Data.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Scheduling Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#0e172a] border border-[#334155] shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#334155]/80 pb-4 mb-4">
                    <h3 className="text-xl font-bold font-display text-white flex items-center justify-between">
                      <span>Solicitud de Sesión Directiva</span>
                      {formData.meetingMode.includes('Virtual') && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#2563eb]/20 text-[#7EDBFF] border border-[#2563eb]/40 font-normal">
                          Google Calendar & Meet
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Complete este formulario para parametrizar la agenda con el socio líder correspondiente.
                    </p>
                  </div>

                  {calendarError && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>{calendarError}</span>
                    </div>
                  )}

                  {/* Area de Interés */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                      1. Área de Especialidad Requerida
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                    >
                      <option value="Finanzas Corporativas & CFO as a Service">
                        Finanzas Corporativas & Dirección CFO (Empresas)
                      </option>
                      <option value="Modelación para Startups, Unit Economics & Runway">
                        Modelación para Startups, Unit Economics & Runway
                      </option>
                      <option value="Planeación Tributaria Persona Natural & Renta 2026">
                        Planeación Tributaria Persona Natural & Renta 2026
                      </option>
                      <option value="Estructuración Patrimonial, Holdings & Sucesión">
                        Estructuración Patrimonial, Holdings & Sucesión
                      </option>
                      <option value="Valoración de Empresas & Operación M&A">
                        Valoración de Empresas & Operación M&A
                      </option>
                    </select>
                  </div>

                  {/* Modalidad */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                      2. Modalidad Preferida
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Virtual (Google Meet)',
                        'Presencial (Bogotá D.C.)',
                      ].map((mode) => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setFormData({ ...formData, meetingMode: mode })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-center flex items-center justify-center gap-2 ${
                            formData.meetingMode === mode
                              ? 'bg-[#2563eb] text-white border-[#7EDBFF] shadow-md shadow-[#2563eb]/25'
                              : 'bg-[#131b2e] border-[#334155] text-[#dae2fd] hover:border-[#7EDBFF]/40'
                          }`}
                        >
                          {mode.includes('Virtual') && <Video className="w-3.5 h-3.5 text-[#7EDBFF]" />}
                          {mode.includes('Presencial') && <MapPin className="w-3.5 h-3.5 text-[#4edea3]" />}
                          <span>{mode}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CALENDAR SCHEDULER: Displayed when Virtual (Google Meet) is selected */}
                  {formData.meetingMode.includes('Virtual') && (
               <CalendarScheduler
  selectedDate={formData.preferredDate}
  onDateChange={(date) =>
    setFormData({ ...formData, preferredDate: date })
  }
  selectedTimeSlot={formData.preferredTime}
  onTimeSlotChange={(slot) =>
    setFormData({ ...formData, preferredTime: slot })
  }
  availableTimeSlots={AVAILABLE_TIME_SLOTS}
/>
                  )}

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Nombre y Apellidos
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Santiago Mejía"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Empresa / Organización (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Industrias Andinas S.A.S."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Correo Corporativo o Personal
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ejecutivo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        WhatsApp o Celular
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+57 310 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                  </div>

                  {/* Franja Horaria (Only shown if Presencial, since Virtual has the Calendar scheduler) */}
                  {!formData.meetingMode.includes('Virtual') && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Franja Horaria Preferente (Presencial Bogotá D.C.)
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredTime: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      >
                        <option value="Mañana (9:00 AM - 12:00 PM)">Mañana (9:00 AM - 12:00 PM)</option>
                        <option value="Mediodía (12:00 PM - 2:00 PM)">Mediodía (12:00 PM - 2:00 PM)</option>
                        <option value="Tarde (2:00 PM - 6:00 PM)">Tarde (2:00 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                      Breve Descripción del Reto Financiero o Fiscal
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Indíquenos el contexto general de su necesidad o cualquier detalle que considere relevante..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#131b2e] border border-[#334155] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                    />
                  </div>

                  {/* Habeas Data Checkbox */}
                  <label className="flex items-start gap-2 text-xs text-[#94A3B8] cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.acceptedTerms}
                      onChange={(e) =>
                        setFormData({ ...formData, acceptedTerms: e.target.checked })
                      }
                      className="mt-0.5 accent-[#2563eb]"
                    />
                    <span>
                      Acepto el tratamiento de datos personales conforme a la Ley 1581 de 2012 y autorizo el contacto exclusivo de JEV Asesoría Financiera con fines de la sesión solicitada.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!formData.acceptedTerms}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00a572] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2563eb]/20 hover:opacity-95 transition-all disabled:opacity-50 mt-2 cursor-pointer"
                  >
                    <span>
                      {formData.meetingMode.includes('Virtual') && googleUser
                        ? 'Confirmar y Agendar con Google Calendar'
                        : 'Confirmar Solicitud de Sesión Estratégica'}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-display">
                    {createdEvent
                      ? 'Sesión Agendada en Google Calendar'
                      : 'Sesión Solicitada con Éxito'}
                  </h3>

                  <p className="text-sm text-[#c3c6d7] max-w-md mx-auto">
                    Hemos registrado su requerimiento para{' '}
                    <strong className="text-white">{formData.fullName}</strong> en el área de{' '}
                    <span className="text-[#7EDBFF] font-medium">{formData.area}</span>.
                  </p>

                  <div className="p-4 bg-[#131b2e] rounded-xl border border-[#334155] text-left text-xs space-y-2.5 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Modalidad:</span>
                      <span className="text-white font-medium">{formData.meetingMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Fecha:</span>
                      <span className="text-white font-medium">{formData.preferredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">Horario programado:</span>
                      <span className="text-white font-medium">{formData.preferredTime} (COL)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94A3B8]">SLA de confirmación:</span>
                      <span className="text-[#4edea3] font-mono font-bold">&lt; 4 horas hábiles</span>
                    </div>

                    {/* Google Meet Info if created */}
                    {createdEvent?.meetLink && (
                      <div className="pt-2 border-t border-[#334155] flex items-center justify-between">
                        <span className="text-[#7EDBFF] font-medium flex items-center gap-1">
                          <Video className="w-3.5 h-3.5" />
                          Google Meet:
                        </span>
                        <a
                          href={createdEvent.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono font-bold text-[#4edea3] hover:underline flex items-center gap-1"
                        >
                          <span>Ingresar a Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    {createdEvent ? (
                      <>
                        <a
                          href={createdEvent.htmlLink}
                          target="_blank"
                          rel="noreferrer"
                          className="py-3 px-6 rounded-xl bg-[#2563eb] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2563eb]/90 shadow-md"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Ver en Google Calendar</span>
                        </a>
                        {createdEvent.meetLink && (
                          <a
                            href={createdEvent.meetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="py-3 px-6 rounded-xl bg-[#00a572] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#00a572]/90"
                          >
                            <Video className="w-4 h-4" />
                            <span>Abrir Google Meet</span>
                          </a>
                        )}
                      </>
                    ) : (
                      <>
                        {formData.meetingMode.includes('Virtual') && (
                          <a
                            href={getFallbackCalendarLink()}
                            target="_blank"
                            rel="noreferrer"
                            className="py-3 px-6 rounded-xl bg-[#2563eb] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2563eb]/90"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Añadir a Google Calendar</span>
                          </a>
                        )}
                        <a
                          href={getWhatsAppBookingLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="py-3 px-6 rounded-xl bg-[#00a572] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#00a572]/90"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Agilizar por WhatsApp</span>
                        </a>
                      </>
                    )}

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setCreatedEvent(null);
                      }}
                      className="py-3 px-6 rounded-xl bg-[#171f33] border border-[#334155] text-[#94A3B8] hover:text-white text-sm transition-colors"
                    >
                      Nueva solicitud
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ FINAL */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Preguntas Frecuentes sobre el Agendamiento
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#131b2e] border border-[#334155] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#171f33]"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7EDBFF] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#c3c6d7] leading-relaxed border-t border-[#334155]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
