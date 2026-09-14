import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  Rocket,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  ChevronDown,
  Layers,
  Sparkles,
  Send,
} from 'lucide-react';

interface StartupsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const StartupsScreen: React.FC<StartupsScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  // Simulator State
  const [cashAvailable, setCashAvailable] = useState(350); // Millones COP
  const [monthlyBurn, setMonthlyBurn] = useState(28); // Millones COP/mes
  const [monthlyRevenue, setMonthlyRevenue] = useState(15); // Millones COP/mes
  const [cac, setCac] = useState(250000); // COP per user
  const [ltv, setLtv] = useState(850000); // COP per user

  const netBurn = Math.max(1, monthlyBurn - monthlyRevenue);
  const runwayMonths = Math.floor(cashAvailable / netBurn);
  const ltvCacRatio = cac > 0 ? (ltv / cac).toFixed(1) : '0';

  // Runway status
  const runwayStatus =
    runwayMonths >= 14
      ? { label: 'Saludable (> 12 Meses)', color: 'text-[#4edea3]', bg: 'bg-[#00a572]/20', border: 'border-[#4edea3]' }
      : runwayMonths >= 6
      ? { label: 'Zona de Alerta (6 - 12 Meses)', color: 'text-[#ffb77d]', bg: 'bg-[#ffb77d]/20', border: 'border-[#ffb77d]' }
      : { label: 'Crítico (< 6 Meses)', color: 'text-[#ffb4ab]', bg: 'bg-[#ffb4ab]/20', border: 'border-[#ffb4ab]' };

  // Diagnostic form state
  const [startupForm, setStartupForm] = useState({
    name: '',
    stage: 'Seed / Pre-Serie A',
    mrr: '$10M - $50M COP',
    focus: 'Estructurar Modelo Financiero para VCs',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Por qué un VC o Fondo rechaza un modelo financiero de una startup?',
      a: 'La mayoría de los rechazos no ocurren por falta de ambición, sino por inconsistencia matemática: métricas de CAC que no escalan con el gasto de marketing, márgenes brutos que ignoran costos de servidores/soporte, o balances que no cuadran con el flujo de caja. En JEV construimos modelos financieros auditables bajo los estándares que exigen fondos de Silicon Valley y LATAM.',
    },
    {
      q: '¿Cuándo debería una startup contratar un CFO Fraccional en lugar de hacerlo los fundadores?',
      a: 'Generalmente después de cerrar su primera ronda Seed ($200K - $1M USD) o al superar los $20M COP de MRR. En ese punto, delegar el runway, el presupuesto de contrataciones y la estructuración contable permite a los cofundadores enfocarse 100% en producto y ventas sin riesgo de quemar la caja antes de tiempo.',
    },
    {
      q: '¿JEV ayuda en la negociación con fondos de inversión o notas convertibles (SAFEs)?',
      a: 'Sí. Acompañamos a los fundadores en la modelación del Cap Table, calculamos el impacto de dilución de notas convertibles (KISS / SAFE / Notas con Cap & Discount) y preparamos el Data Room financiero para el Due Diligence.',
    },
  ];

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#4edea3]/30 text-[#4edea3] text-xs font-mono font-medium">
            <Rocket className="w-3.5 h-3.5" />
            STARTUPS, TECH & VENTURE CAPITAL
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Ingeniería Financiera y Unit Economics para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4edea3] via-[#7EDBFF] to-[#2563eb]">
              Startups que Escalan
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed max-w-2xl">
            Deje de adivinar su runway en hojas de cálculo frágiles. Diseñamos modelos financieros para fondos de Venture Capital, controlamos el burn rate mensual y blindamos sus unit economics para levantar capital con convicción.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onOpenDiagnostic('Emprendimiento')}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00a572] to-[#2563eb] text-white font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-[#00a572]/25 hover:opacity-95 transition-all text-sm group"
            >
              <span>Diagnosticar Madurez de mi Startup</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#simulador-runway"
              className="py-3.5 px-6 rounded-xl bg-[#171f33] border border-[#334155] text-white font-medium hover:bg-[#222a3d] transition-all text-sm flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#4edea3]" />
              <span>Simulador de Runway & Burn</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              +35 Startups aceleradas
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              Cap Table & SAFE Modeling
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              Auditoría VC-Ready
            </span>
          </div>
        </div>
      </section>

      {/* 2. SIMULADOR INTERACTIVO DE RUNWAY & BURN RATE */}
      <section id="simulador-runway" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#171f33] via-[#131b2e] to-[#0f172a] border border-[#334155] shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-widest">
              Simulador Técnico en Tiempo Real
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Simulador de Runway, Burn Rate & LTV/CAC
            </h2>
            <p className="text-sm text-[#c3c6d7] mt-2">
              Modifique los parámetros operativos de su startup para calcular exactamente cuántos meses de vida le restan a su caja y cómo evalúan sus unit economics los inversionistas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Input */}
            <div className="lg:col-span-7 bg-[#0b1326] p-6 rounded-2xl border border-[#334155] space-y-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#94A3B8]">Caja Actual Disponible (Millones COP)</span>
                  <span className="text-white font-bold font-mono">${cashAvailable}M COP</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={cashAvailable}
                  onChange={(e) => setCashAvailable(Number(e.target.value))}
                  className="w-full accent-[#4edea3] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Gasto Mensual (Burn)</span>
                    <span className="text-white font-bold font-mono">${monthlyBurn}M</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={monthlyBurn}
                    onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                    className="w-full accent-[#ffb77d] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Facturación MRR Actual</span>
                    <span className="text-[#4edea3] font-bold font-mono">${monthlyRevenue}M</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full accent-[#7EDBFF] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#334155]/60">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Costo de Adquisición (CAC)</span>
                    <span className="text-white font-mono">${(cac / 1000).toFixed(0)}k</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={cac}
                    onChange={(e) => setCac(Number(e.target.value))}
                    className="w-full accent-[#2563eb] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Valor de Vida (LTV)</span>
                    <span className="text-[#4edea3] font-mono">${(ltv / 1000).toFixed(0)}k</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="4000000"
                    step="50000"
                    value={ltv}
                    onChange={(e) => setLtv(Number(e.target.value))}
                    className="w-full accent-[#4edea3] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Output */}
            <div className="lg:col-span-5 bg-[#131b2e] p-6 rounded-2xl border border-[#334155] space-y-4">
              <div className={`p-4 rounded-xl border ${runwayStatus.border} ${runwayStatus.bg} space-y-1`}>
                <div className="text-[11px] font-mono uppercase text-[#94A3B8]">
                  RUNWAY ESTIMADO
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-extrabold font-mono ${runwayStatus.color}`}>
                    {runwayMonths}
                  </span>
                  <span className="text-base text-white font-display">Meses de Caja</span>
                </div>
                <div className="text-xs font-medium text-white">{runwayStatus.label}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#060e20] rounded-xl border border-[#334155]">
                  <span className="text-[10px] font-mono text-[#94A3B8]">NET BURN MENSUAL</span>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    -${netBurn}M COP
                  </div>
                </div>

                <div className="p-3 bg-[#060e20] rounded-xl border border-[#334155]">
                  <span className="text-[10px] font-mono text-[#94A3B8]">RATIO LTV / CAC</span>
                  <div className="text-lg font-bold font-mono text-[#4edea3] mt-1">
                    {ltvCacRatio}x
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#0b1326] rounded-xl border border-[#334155] text-xs text-[#c3c6d7] space-y-2">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4edea3]" />
                  Recomendación Estratégica JEV:
                </div>
                <p className="text-[11px] leading-relaxed">
                  {runwayMonths < 8
                    ? 'Debe iniciar inmediatamente el proceso de levantamiento o implementar un plan de eficiencia de OPEX para extender el runway a un mínimo de 12 meses.'
                    : 'Dispone de ventana suficiente para optimizar unit economics y buscar la siguiente ronda con apalancamiento en métricas de retención.'}
                </p>
              </div>

              <button
                onClick={() => onOpenDiagnostic('Emprendimiento')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00a572] to-[#2563eb] text-white text-xs font-semibold hover:opacity-95 transition-all shadow-md"
              >
                Solicitar Auditoría de Unit Economics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUATRO PILARES PARA STARTUPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-widest mb-2">
            Arquitectura para Startups
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Cuatro Pilares Clave para Escalar sin Fricción
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2">
            Eliminamos el desorden en balances para que los fundadores se dediquen a crear producto y vender.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#4edea3]/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              1. Modelado Financiero y Proyecciones Multiescenario
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Construcción de modelos dinámicos integrados en 3 estados financieros (P&L, Balance General y Flujo de Caja libre). Desglose analítico de unit economics por cohorte, sensitivity analysis y calibración de hipótesis operativas de tracción.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
                <span>Mapeo de supuestos críticos de conversión y churn</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
                <span>Escenarios: Conservador, Base y Crecimiento Agresivo</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#7EDBFF]/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#7EDBFF]/40 text-[#7EDBFF] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              2. Financial Pitch Deck & Data Room para Inversionistas
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Preparación rigurosa del expediente financiero institucional para soportar auditorías de Due Diligence. Valuaciones metodológicas (DCF, Múltiplos de Transacciones Precedentes y Berkus) y Cap Table transparente libre de deudas tóxicas.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
                <span>Estructuración de notas convertibles, SAFEs y rondas de equity</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
                <span>Defensa técnica de múltiplos de valoración ante comités</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#ffb77d]/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#ffb77d]/40 text-[#ffb77d] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              3. Optimización de Capital de Trabajo & Cash Flow
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Monitoreo semanal del ciclo de conversión de efectivo. Reingeniería en el calendario de cobros a clientes y pagos a proveedores tecnológicos con el fin de prolongar el runway entre 3 y 8 meses sin necesidad de levantar capital dilutivo anticipado.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffb77d] shrink-0 mt-0.5" />
                <span>Alertas tempranas de Cash Out y simuladores de estrés</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffb77d] shrink-0 mt-0.5" />
                <span>Optimización de licencias Cloud, SaaS stack y nómina operativa</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#b4c5ff]/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#b4c5ff]/40 text-[#b4c5ff] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              4. Formalización Contable y Planeación Fiscal Temprana
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Estructuración societaria preventiva (SAS o Holding internacional), aprovechamiento legítimo de exenciones tributarias para startups tecnológicas e I+D, y blindaje frente a contingencias ante la DIAN y organismos de control.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#b4c5ff] shrink-0 mt-0.5" />
                <span>Plan contable NIIF adaptado a modelos de suscripción y pasarelas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#b4c5ff] shrink-0 mt-0.5" />
                <span>Beneficios por inversión en ciencia, tecnología e innovación</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLANES DE ACOMPAÑAMIENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest mb-2">
            Formatos de Vinculación
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Planes Diseñados para la Etapa de su Startup
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#171f33] text-xs font-mono text-[#94A3B8] border border-[#334155]">
                PRE-SEED • SPRINT 3 SEMANAS
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Sprint Modelo Financiero VC
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Construcción desde cero del modelo financiero dinámico a 3 años para presentar a aceleradoras y ángeles.
              </p>
              <ul className="space-y-2 text-xs text-[#94A3B8] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Entrega en 21 días
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Unit Economics & Cap Table
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Pitch Deck Financial Slides
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenDiagnostic('Emprendimiento')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#171f33] border border-[#334155] text-white hover:bg-[#222a3d] text-xs font-semibold"
            >
              Iniciar Sprint
            </button>
          </div>

          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#131b2e] border-2 border-[#4edea3] flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#4edea3] text-[#060e20] text-[10px] font-bold font-mono uppercase tracking-wider">
              RECOMENDADO POST-ROUND
            </div>
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#00a572]/30 text-xs font-mono text-[#4edea3] border border-[#4edea3]/40">
                SEED & PRE-SERIE A • MENSUAL
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Fractional CFO & Runway Retainer
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Dirección financiera de tiempo parcial. Manejo del burn, reporte mensual a inversionistas y asignación de presupuesto.
              </p>
              <ul className="space-y-2 text-xs text-[#dae2fd] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Investor Updates mensuales
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Monitoreo semanal de runway
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Presupuesto de contratación (Hiring Plan)
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contacto')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#00a572] hover:bg-[#00a572]/90 text-white text-xs font-semibold shadow-md"
            >
              Agendar con Socio Tech
            </button>
          </div>

          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#171f33] text-xs font-mono text-[#7EDBFF] border border-[#7EDBFF]/30">
                SERIE A • DATA ROOM
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Due Diligence VC Defense
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Auditoría preventiva previa a la firma del Term Sheet. Saneamiento tributario y validación de métricas de software.
              </p>
              <ul className="space-y-2 text-xs text-[#94A3B8] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Data Room estructurado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Acompañamiento en Q&A con fondos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Modelación de Cascadas de Liquidación
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contacto')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#171f33] border border-[#334155] text-white hover:bg-[#222a3d] text-xs font-semibold"
            >
              Consultar Due Diligence
            </button>
          </div>
        </div>
      </section>

      {/* 5. FORMULARIO DE DIAGNÓSTICO DE MADUREZ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0e172a] border border-[#334155] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                EVALUACIÓN SIN COSTO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Diagnóstico de Madurez Financiera para Founders
              </h2>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Complete los datos de su startup y reciba feedback técnico sobre sus números antes de su próxima reunión con inversionistas.
              </p>
            </div>

            <div className="lg:col-span-7">
              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="bg-[#171f33] p-6 sm:p-8 rounded-2xl border border-[#334155] space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Nombre de la Startup
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. PayFlow Tech"
                        value={startupForm.name}
                        onChange={(e) => setStartupForm({ ...startupForm, name: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4edea3]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Etapa Actual
                      </label>
                      <select
                        value={startupForm.stage}
                        onChange={(e) => setStartupForm({ ...startupForm, stage: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4edea3]"
                      >
                        <option value="Bootstrapped">Bootstrapped</option>
                        <option value="Pre-Seed / Ángeles">Pre-Seed / Ángeles</option>
                        <option value="Seed / Pre-Serie A">Seed / Pre-Serie A</option>
                        <option value="Serie A o superior">Serie A o superior</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        MRR Actual
                      </label>
                      <select
                        value={startupForm.mrr}
                        onChange={(e) => setStartupForm({ ...startupForm, mrr: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4edea3]"
                      >
                        <option value="Menos de $10M COP">Menos de $10M COP</option>
                        <option value="$10M - $50M COP">$10M - $50M COP</option>
                        <option value="$50M - $200M COP">$50M - $200M COP</option>
                        <option value="Más de $200M COP">Más de $200M COP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Prioridad Inmediata
                      </label>
                      <input
                        type="text"
                        value={startupForm.focus}
                        onChange={(e) => setStartupForm({ ...startupForm, focus: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4edea3]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Correo de Contacto
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="founder@startup.com"
                        value={startupForm.email}
                        onChange={(e) => setStartupForm({ ...startupForm, email: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4edea3]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        WhatsApp Directo
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+57 300 000 0000"
                        value={startupForm.phone}
                        onChange={(e) => setStartupForm({ ...startupForm, phone: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4edea3]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00a572] to-[#2563eb] text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Enviar y Recibir Diagnóstico Startup</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="bg-[#171f33] p-8 rounded-2xl border border-[#4edea3] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Datos de la Startup Recibidos
                  </h3>
                  <p className="text-sm text-[#c3c6d7]">
                    Nos contactaremos directamente con <strong className="text-white">{startupForm.name}</strong> para coordinar una sesión técnica de 30 minutos con Felipe Morales (Head de Startups).
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-5 rounded-xl bg-[#222a3d] text-white text-xs font-medium"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ STARTUPS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Preguntas Frecuentes de Founders
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
                    className={`w-5 h-5 text-[#4edea3] shrink-0 transition-transform ${
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
