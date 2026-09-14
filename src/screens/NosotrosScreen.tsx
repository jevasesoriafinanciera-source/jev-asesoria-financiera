import React from 'react';
import { ScreenId } from '../types';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Scale,
  Sparkles,
  Lock,
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';
import { Logo } from '../components/Logo';

interface NosotrosScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const NosotrosScreen: React.FC<NosotrosScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. HERO & GÉNESIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#7EDBFF]/30 text-[#7EDBFF] text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            NUESTRA GÉNESIS & MANIFIESTO
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Ingeniería Financiera de Alta Precisión nacida para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EDBFF] via-[#2563eb] to-[#4edea3]">
              Proteger y Multiplicar el Capital
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed">
            Fundada en Bogotá, JEV Asesoría Financiera nació al constatar una falla estructural en el mercado: los contadores miran el pasado para liquidar planillas, y los banqueros venden productos propios. Faltaba una firma independiente de ingenieros financieros y tributaristas que mirara hacia adelante con mentalidad de socio.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('contacto')}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00a572] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#2563eb]/20 hover:opacity-95 transition-all"
            >
              <span>Conversar con Nuestros Socios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('impacto')}
              className="py-3.5 px-6 rounded-xl bg-[#171f33] border border-[#334155] text-white font-medium hover:bg-[#222a3d] text-sm"
            >
              Ver Track Record Auditado
            </button>
          </div>
        </div>
      </section>

      {/* 2. CUATRO PRINCIPIOS INNEGOCIABLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest mb-2">
            Ética y Compromiso
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Cuatro Principios Innegociables
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#7EDBFF]/40 text-[#7EDBFF] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              1. Rigor Cuantitativo
            </h3>
            <p className="text-xs text-[#c3c6d7] leading-relaxed">
              Cero improvisaciones ni reglas empíricas. Cada sugerencia financiera o tributaria está soportada en modelos matemáticos y flujos de caja testeados.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              2. Cero Contingencias
            </h3>
            <p className="text-xs text-[#c3c6d7] leading-relaxed">
              Planeamos siempre dentro del marco riguroso de la ley (economía de opción). No asumimos riesgos que comprometan la paz jurídica de su empresa o familia.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#ffb77d]/40 text-[#ffb77d] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              3. Mentalidad de Socios
            </h3>
            <p className="text-xs text-[#c3c6d7] leading-relaxed">
              Skin in the game. Nos sentamos en su comité de gerencia, vigilamos cada salida de caja como si fuera propia y velamos por el crecimiento a largo plazo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#b4c5ff]/40 text-[#b4c5ff] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              4. Confidencialidad
            </h3>
            <p className="text-xs text-[#c3c6d7] leading-relaxed">
              Cumplimiento irrestricto de la Ley 43 de 1990 y acuerdos de confidencialidad bilaterales blindados. Su privacidad es nuestro activo más sagrado.
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 EMBLEMA OFICIAL & SIMBOLOGÍA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#171f33] to-[#0d1527] border border-[#334155] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131b2e] border border-[#7EDBFF]/30 text-[#7EDBFF] text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                SIMBOLOGÍA & ARQUITECTURA DE MARCA
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
                El Emblema JEV: La Celosía de la Certeza Financiera
              </h2>
              <p className="text-sm sm:text-base text-[#c3c6d7] leading-relaxed">
                Nuestra marca condensa el rigor matemático y la ingeniería de patrimonios: una estructura ascendente de <strong className="text-white">36 rombos geométricos</strong> que representan las capas de flujo de caja, el blindaje fiscal y la convergencia de capital hacia la solidez empresarial.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0e172a] border border-[#334155]/80 space-y-1.5">
                  <span className="text-xs font-mono text-[#7EDBFF] font-bold">Vértice de Ascensión</span>
                  <p className="text-xs text-[#94A3B8]">
                    Cada nivel del rombo modela el avance estratégico desde el saneamiento contable hasta la expansión de márgenes EBITDA.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0e172a] border border-[#334155]/80 space-y-1.5">
                  <span className="text-xs font-mono text-[#4edea3] font-bold">Tipografía Geométrica</span>
                  <p className="text-xs text-[#94A3B8]">
                    Líneas puras y proporciones arquitectónicas que reflejan transparencia absoluta y ausencia de opacidad contable.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Logo Showcase: Logo Original */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm p-6 rounded-3xl bg-white shadow-2xl border border-slate-200 text-center flex flex-col items-center">
                <img
                  src="/13046_JEV-Asesorias-finacieras_Logo.png"
                  alt="Logo Oficial JEV Asesoría Financiera"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[260px] h-auto object-contain"
                />
                <span className="text-[11px] font-mono tracking-wider text-slate-600 font-semibold mt-4 pt-3 border-t border-slate-100 w-full text-center block">
                  Emblema Institucional Original
                </span>
                <div className="flex items-center gap-2 mt-3 pt-1">
                  <a
                    href="/13046_JEV-Asesorias-finacieras_Logo.png"
                    download="JEV-Asesorias-Financieras-Logo.png"
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    Descargar PNG
                  </a>
                  <a
                    href="/logo-oficial-jev.svg"
                    download="JEV-Asesorias-Financieras-Logo.svg"
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#14468d] hover:bg-[#103770] text-white transition-colors"
                  >
                    Descargar SVG
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONSEJO CONSULTIVO & SOCIOS DIRECTORES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-widest mb-2">
            Liderazgo Técnico
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Consejo Consultivo & Socios Directores
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2">
            Profesionales de primer nivel graduados de las instituciones académicas más reconocidas de Colombia y el exterior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#131b2e] border border-[#334155] p-6 flex flex-col justify-between hover:border-[#7EDBFF]/50 transition-all"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#0b1326] border border-[#334155] mx-auto mb-4">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center space-y-1">
                  <span
                    style={{ color: member.tagColor }}
                    className="px-2.5 py-0.5 rounded bg-[#0b1326] border border-[#334155] text-[10px] font-mono font-bold uppercase tracking-wider inline-block"
                  >
                    {member.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {member.name}
                  </h3>
                  <div className="text-xs text-[#7EDBFF] font-medium">{member.role}</div>
                </div>

                <p className="text-xs text-[#c3c6d7] leading-relaxed pt-2 border-t border-[#334155]/60">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#334155]/60 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#94A3B8]">Credenciales</div>
                {member.education.map((edu, eIdx) => (
                  <div key={eIdx} className="text-[11px] text-[#dae2fd] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#4edea3] shrink-0" />
                    <span>{edu}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. METODOLOGÍA CUANTITATIVA EN 4 FASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0e172a] border border-[#334155] shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Metodología de Ingeniería Financiera en 4 Fases
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-[#131b2e] rounded-xl border border-[#334155] space-y-2">
              <span className="text-xl font-bold font-mono text-[#7EDBFF]">01</span>
              <h4 className="text-sm font-bold text-white font-display">Diagnóstico Forense</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Auditoría exhaustiva de libros contables, 100% de conciliación bancaria y revisión fiscal retrospectiva de 24 meses.
              </p>
            </div>

            <div className="p-5 bg-[#131b2e] rounded-xl border border-[#334155] space-y-2">
              <span className="text-xl font-bold font-mono text-[#4edea3]">02</span>
              <h4 className="text-sm font-bold text-white font-display">Modelación Dinámica</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Parametrización del flujo de caja rodante (Rolling Forecast 13 semanas), presupuesto maestro y estructura de costos ABC.
              </p>
            </div>

            <div className="p-5 bg-[#131b2e] rounded-xl border border-[#334155] space-y-2">
              <span className="text-xl font-bold font-mono text-[#ffb77d]">03</span>
              <h4 className="text-sm font-bold text-white font-display">Ejecución en Comités</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Presencia activa de socio JEV en comités quincenales, control de desvíos y toma de decisiones operativas inmediatas.
              </p>
            </div>

            <div className="p-5 bg-[#131b2e] rounded-xl border border-[#334155] space-y-2">
              <span className="text-xl font-bold font-mono text-[#b4c5ff]">04</span>
              <h4 className="text-sm font-bold text-white font-display">Blindaje & Escala</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Planeación tributaria anticipada anual, preparación para rondas de capital o estructuración de líneas de crédito baratas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUMPLIMIENTO & AUDITORÍAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#131b2e] border border-[#334155] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#4edea3]" />
              Supervisión Institucional y Cumplimiento Normativo
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              Nuestras prácticas se apegan estrictamente a los lineamientos de la Junta Central de Contadores, la Dirección de Impuestos y Aduanas Nacionales (DIAN), la Superintendencia de Sociedades y los estándares internacionales de aseguramiento de la información (NIIF/ISAE 3402).
            </p>
          </div>

          <button
            onClick={() => onNavigate('contacto')}
            className="py-3 px-6 rounded-xl bg-[#2563eb] text-white font-semibold text-xs whitespace-nowrap hover:bg-[#1d4ed8] transition-colors"
          >
            Agendar con Socio Director
          </button>
        </div>
      </section>
    </div>
  );
};
