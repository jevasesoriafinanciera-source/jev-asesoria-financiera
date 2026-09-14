import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  ArrowRight,
  Building2,
  Rocket,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  Calculator,
  MessageSquare,
  Lock,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  // Pre-diagnostic in-page mini form state
  const [selectedProfile, setSelectedProfile] = useState<
    'Empresa' | 'Emprendimiento' | 'Persona Natural'
  >('Empresa');
  const [goal, setGoal] = useState('Optimización tributaria legal y flujo de caja');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [formDone, setFormDone] = useState(false);

  const handleInPageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormDone(true);
  };

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#7EDBFF]/30 text-[#7EDBFF] text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-[#7EDBFF] animate-ping"></span>
            INGENIERÍA FINANCIERA & ASESORÍA ESTRATÉGICA
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Precisión Financiera y Estructuración Tributaria para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EDBFF] via-[#2563eb] to-[#4edea3]">
              Escalar con Certeza
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed max-w-2xl">
            Firma contable y financiera que combina rigor cuantitativo, dirección financiera externa y planeación fiscal preventiva para empresas consolidadas, fundadores de startups y altos patrimonios en Colombia.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onOpenDiagnostic(selectedProfile)}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00a572] text-white font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-[#2563eb]/25 hover:opacity-95 transition-all text-sm group"
            >
              <span>Solicitar Pre-Diagnóstico Inmediato</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('contacto')}
              className="py-3.5 px-6 rounded-xl bg-[#171f33] border border-[#334155] text-white font-medium hover:bg-[#222a3d] transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>Agendar Sesión de Trabajo</span>
              <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
            </button>
          </div>

          {/* Micro badges */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              Confidencialidad bajo NDA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              SLA de Respuesta &lt; 24h
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              Cumplimiento Ley 43 / DIAN
            </span>
          </div>
        </div>
      </section>

      {/* 2. CIFRAS REALES AUDITADAS (Bento Stat Strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#0e172a] border border-[#334155] shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest mb-1">
              Trayectoria Comprobada
            </h2>
            <p className="text-xl font-bold text-white font-display">
              Cifras Reales Auditadas en el Mercado Colombiano
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155]/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                +250
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Clientes Asesorados</div>
              <div className="text-[11px] text-[#4edea3] mt-0.5 font-mono">Empresas & Personas</div>
            </div>

            <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155]/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7EDBFF] font-mono">
                +12
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Empresas con CFO as a Service</div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5 font-mono">Dirección Continua</div>
            </div>

            <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155]/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4edea3] font-mono">
                +35
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Startups Aceleradas</div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5 font-mono">Unit Economics & Runway</div>
            </div>

            <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155]/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#ffb77d] font-mono">
                0
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Sanciones o Glosas DIAN</div>
              <div className="text-[11px] text-[#4edea3] mt-0.5 font-mono">100% blindaje legal</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUESTROS SERVICIOS ESPECIALIZADOS (3 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-widest mb-1.5">
              Áreas de Práctica
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
              Soluciones Financieras a la Medida de su Desafío
            </h2>
          </div>
          <p className="text-sm text-[#94A3B8] max-w-md">
            Desarrollamos modelos a la medida según el ciclo de vida y la complejidad legal o corporativa de cada estructura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Empresas */}
          <div className="rounded-2xl bg-[#131b2e] border border-[#334155] p-7 flex flex-col justify-between hover:border-[#7EDBFF]/60 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0b1326] border border-[#7EDBFF]/40 text-[#7EDBFF] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#7EDBFF] uppercase tracking-wider font-semibold">
                Línea Corporativa
              </span>
              <h3 className="text-xl font-bold text-white font-display group-hover:text-[#7EDBFF] transition-colors">
                Empresas & Finanzas Corporativas
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Dirección financiera externa de alto nivel (CFO as a Service), optimización rigurosa de costos, gestión de capital de trabajo y estructuración de deuda o fusiones (M&A).
              </p>

              <ul className="space-y-2 pt-2 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Control de flujo de caja y rentabilidad por línea
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Comités directivos mensuales con KPIs en tiempo real
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Estructuración crediticia bancaria y fondeo
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#334155]/60 flex items-center justify-between">
              <button
                onClick={() => onNavigate('empresas')}
                className="text-sm font-semibold text-white group-hover:text-[#7EDBFF] flex items-center gap-1.5 transition-colors"
              >
                <span>Explorar Soluciones Corporativas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Emprendimientos & Startups */}
          <div className="rounded-2xl bg-[#131b2e] border border-[#334155] p-7 flex flex-col justify-between hover:border-[#4edea3]/60 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0b1326] border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                Startups & Scaleups
              </span>
              <h3 className="text-xl font-bold text-white font-display group-hover:text-[#4edea3] transition-colors">
                Emprendimientos & Startups
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Control de burn rate, cálculo científico de CAC y LTV, modelación de punto de equilibrio y preparación de data room financiero para rondas Seed o Serie A.
              </p>

              <ul className="space-y-2 pt-2 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Simulador interactivo de Runway y Burn Rate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Estructura de precios, margen de contribución y tracción
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Acompañamiento en Due Diligence técnico ante VCs
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#334155]/60 flex items-center justify-between">
              <button
                onClick={() => onNavigate('emprendimientos')}
                className="text-sm font-semibold text-white group-hover:text-[#4edea3] flex items-center gap-1.5 transition-colors"
              >
                <span>Ver Servicios para Startups</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Persona Natural & Patrimonio */}
          <div className="rounded-2xl bg-[#131b2e] border border-[#334155] p-7 flex flex-col justify-between hover:border-[#ffb77d]/60 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0b1326] border border-[#ffb77d]/40 text-[#ffb77d] flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#ffb77d] uppercase tracking-wider font-semibold">
                Gestión Patrimonial
              </span>
              <h3 className="text-xl font-bold text-white font-display group-hover:text-[#ffb77d] transition-colors">
                Persona Natural & Patrimonio
              </h3>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Planeación tributaria preventiva sobre declaración de renta (Ley 2277), optimización de deducciones bajo Art. 336 E.T., y estructuración patrimonial offshore/local.
              </p>

              <ul className="space-y-2 pt-2 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Aprovechamiento legal de topes de 1.340 UVT
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Simulador de ahorro en tiempo real
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  Estrategia sucesoral y gobierno familiar
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#334155]/60 flex items-center justify-between">
              <button
                onClick={() => onNavigate('persona-natural')}
                className="text-sm font-semibold text-white group-hover:text-[#ffb77d] flex items-center gap-1.5 transition-colors"
              >
                <span>Analizar Planeación Patrimonial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-DIAGNÓSTICO FINANCIERO INMEDIATO (Interactive On-Page Module) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#171f33] via-[#131b2e] to-[#0f172a] border border-[#334155] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a572]/15 border border-[#4edea3]/30 text-[#4edea3] text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                HERRAMIENTA SIN COSTO
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Pre-Diagnóstico Financiero Inmediato
              </h2>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Seleccione el perfil de su organización o patrimonio y reciba una evaluación técnica preliminar sobre sus números antes de agendar con nuestro equipo.
              </p>

              <div className="p-4 rounded-xl bg-[#060e20] border border-[#334155] space-y-2 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Lock className="w-4 h-4 text-[#7EDBFF]" />
                  Garantía de Confidencialidad
                </div>
                <p>
                  No solicitamos información sensible de cuentas bancarias ni extractos en esta etapa. Sus datos están protegidos bajo secreto profesional contable.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {!formDone ? (
                <form
                  onSubmit={handleInPageSubmit}
                  className="bg-[#0b1326] p-6 sm:p-8 rounded-2xl border border-[#334155] space-y-4"
                >
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-2">
                      Tipo de Entidad
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Empresa', 'Emprendimiento', 'Persona Natural'] as const).map((prof) => (
                        <button
                          type="button"
                          key={prof}
                          onClick={() => setSelectedProfile(prof)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                            selectedProfile === prof
                              ? 'bg-[#2563eb] text-white border-[#7EDBFF]'
                              : 'bg-[#131b2e] border-[#334155] text-[#dae2fd] hover:border-[#7EDBFF]/40'
                          }`}
                        >
                          {prof}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                      Objetivo Prioritario
                    </label>
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      placeholder="Ej. Reducción de costos o preparar ronda"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carolina Mendoza"
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        WhatsApp o Correo
                      </label>
                      <input
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+57 310 000 0000"
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#00a572] hover:bg-[#00a572]/90 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00a572]/20 transition-all mt-2"
                  >
                    <span>Programa tu Diagnóstico Gratuito</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="bg-[#0b1326] p-6 sm:p-8 rounded-2xl border border-[#4edea3]/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Solicitud Parametrizada con Éxito
                  </h3>
                  <p className="text-sm text-[#c3c6d7]">
                    Hemos asignado su caso de <strong className="text-white">{selectedProfile}</strong> con el socio director de la división respectiva.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://wa.me/573105550192?text=${encodeURIComponent(
                        `Hola JEV, completé el Pre-Diagnóstico en su web para ${selectedProfile} (Nombre: ${name}, Contacto: ${contact}). Deseo coordinar la revisión.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 rounded-xl bg-[#00a572] text-white font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Revisar de inmediato por WhatsApp
                    </a>
                    <button
                      onClick={() => setFormDone(false)}
                      className="py-3 px-4 rounded-xl bg-[#171f33] border border-[#334155] text-[#94A3B8] hover:text-white text-sm"
                    >
                      Nuevo cálculo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#2563eb] to-[#00a572] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-medium inline-block">
              DIAGNÓSTICO TÉCNICO SIN COMPROMISO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              ¿Listo para ordenar los números de su empresa o patrimonio?
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Agende una sesión confidencial de 45 minutos con nuestros socios directores en Bogotá, Medellín o vía virtual.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onNavigate('contacto')}
              className="py-3.5 px-6 rounded-xl bg-white text-[#060e20] font-bold text-sm hover:bg-slate-100 transition-all shadow-lg text-center"
            >
              Agendar Sesión Confidencial
            </button>
            <a
              href="https://wa.me/573105550192?text=Hola%20JEV%2C%20deseo%20coordinar%20una%20sesi%C3%B3n%20diagn%C3%B3stica"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-6 rounded-xl bg-[#060e20] text-white font-medium text-sm hover:bg-[#131b2e] border border-white/20 transition-all text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#4edea3]" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
