import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Shield, Send } from 'lucide-react';
import { DiagnosticFormData } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural';
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  initialProfile = 'Empresa',
}) => {
  const [formData, setFormData] = useState<DiagnosticFormData>({
    profile: initialProfile,
    goal: 'Estructuración y optimización tributaria legal',
    name: '',
    contact: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hola JEV Asesoría Financiera, solicito mi Pre-Diagnóstico Financiero Inmediato:\n- Perfil: ${formData.profile}\n- Nombre: ${formData.name}\n- Teléfono/Email: ${formData.contact}\n- Objetivo: ${formData.goal}`
    );
    return `https://wa.me/573105550192?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#171f33] border border-[#334155] rounded-2xl p-6 md:p-8 shadow-2xl text-[#dae2fd]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#222a3d] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <img
                src="/13046_JEV-Asesorias-finacieras_Logo.png"
                alt="Logo JEV Asesoría Financiera"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain rounded-md bg-[#131b2e] p-1 border border-[#334155]/60 shadow-sm"
                style={{ backgroundColor: '#131b2e' }}
              />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a572]/15 border border-[#4edea3]/30 text-[#4edea3] text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                DIAGNÓSTICO CONFIDENCIAL
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2">
              Pre-Diagnóstico Financiero Confidencial
            </h3>
            <p className="text-sm text-[#94A3B8] mb-6">
              Reciba una radiografía técnica preliminar sobre su estructura de costos, carga fiscal o liquidez operativa.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                  1. Perfil del Solicitante
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Empresa', 'Emprendimiento', 'Persona Natural'] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setFormData({ ...formData, profile: p })}
                      className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        formData.profile === p
                          ? 'bg-[#2563eb] text-white border-[#7EDBFF]'
                          : 'bg-[#131b2e] border-[#334155] text-[#dae2fd] hover:border-[#7EDBFF]/50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                  2. Principal Objetivo o Dolor
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-[#131b2e] border border-[#334155] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                >
                  <option value="Estructuración y optimización tributaria legal">
                    Estructuración y optimización tributaria legal
                  </option>
                  <option value="Auditoría de flujo de caja y rentabilidad">
                    Auditoría de flujo de caja y rentabilidad
                  </option>
                  <option value="Preparación para levantamiento de capital / M&A">
                    Preparación para levantamiento de capital / M&A
                  </option>
                  <option value="Planeación de Renta Persona Natural y Patrimonio">
                    Planeación de Renta Persona Natural y Patrimonio
                  </option>
                  <option value="Implementación de Dirección Financiera Externa (CFO)">
                    Implementación de Dirección Financiera Externa (CFO)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Andrés Gómez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#131b2e] border border-[#334155] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                    WhatsApp o Correo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+57 300 000 0000"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-[#131b2e] border border-[#334155] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#94A3B8] pt-1">
                <Shield className="w-4 h-4 text-[#4edea3] shrink-0" />
                <span>Protocolo de confidencialidad estricto bajo Ley 1581 y secreto profesional.</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00a572] text-white font-medium flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-[#2563eb]/20 transition-all text-sm"
              >
                Generar Pre-Diagnóstico Ahora
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-2">
              ¡Diagnóstico Preliminar Listo!
            </h3>
            <p className="text-sm text-[#c3c6d7] mb-6">
              Estimado(a) <strong className="text-white">{formData.name}</strong>, hemos parametrizado el análisis para tu perfil de{' '}
              <span className="text-[#7EDBFF] font-medium">{formData.profile}</span>.
            </p>

            <div className="p-4 bg-[#131b2e] border border-[#334155] rounded-xl text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Prioridad asignada:</span>
                <span className="text-[#4edea3] font-mono font-bold">ALTA • Vía Directa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Especialista recomendado:</span>
                <span className="text-white font-medium">
                  {formData.profile === 'Empresa'
                    ? 'Carlos Eduardo Vargas (M&A / Corp)'
                    : formData.profile === 'Persona Natural'
                    ? 'Dra. Marcela Restrepo (Fiscal / Renta)'
                    : 'Felipe Morales (Startups / CFO)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">SLA de Respuesta:</span>
                <span className="text-white font-mono">&lt; 4 horas hábiles</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#00a572] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#00a572]/90 transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                Continuar por WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-3 px-4 rounded-xl bg-[#222a3d] border border-[#334155] text-white hover:bg-[#2d3449] text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
