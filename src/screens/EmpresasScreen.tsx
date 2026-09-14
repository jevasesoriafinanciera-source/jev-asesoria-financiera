import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Layers,
  BarChart3,
  Briefcase,
  HelpCircle,
  ChevronDown,
  Lock,
  Send,
} from 'lucide-react';

interface EmpresasScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const EmpresasScreen: React.FC<EmpresasScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  // Interactive EBITDA & Margin Simulator
  const [revenue, setRevenue] = useState(1200); // Millions COP
  const [cogsPercent, setCogsPercent] = useState(55); // Cost of goods sold %
  const [opex, setOpex] = useState(280); // Operating expenses millions

  const grossProfit = revenue * (1 - cogsPercent / 100);
  const ebitda = grossProfit - opex;
  const ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;

  // Potential JEV optimization (estimated +4.5% to +8% margin boost through working capital & tax shield)
  const optimizedEbitda = ebitda + revenue * 0.052;
  const optimizedMargin = (optimizedEbitda / revenue) * 100;
  const ebitdaGain = optimizedEbitda - ebitda;

  // Form State
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    industry: 'Manufactura / Industria',
    revenueBand: '$1.000M - $5.000M COP/año',
    primaryChallenge: 'Optimización de flujo de caja y capital de trabajo',
    contactName: '',
    email: '',
    phone: '',
  });
  const [formSent, setFormSent] = useState(false);

  // Accordion FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cuál es la diferencia entre un CFO as a Service y un contador tradicional?',
      a: 'El contador registra transacciones pasadas y asegura el cumplimiento formal. Nuestro CFO as a Service mira hacia el futuro: diseña modelos predictivos, optimiza márgenes por unidad de negocio, estructura financiamiento bancario ventajoso y participa activamente en el comité directivo para tomar decisiones estratégicas de crecimiento y liquidez.',
    },
    {
      q: '¿Cómo se maneja la confidencialidad de los balances de la empresa?',
      a: 'Antes de tener acceso a cualquier balance, libro contable o estado de resultados, firmamos un Acuerdo de Confidencialidad Bilateral (NDA) con penalidad jurídica estricta. Toda la data se analiza bajo protocolos ISO 27001 y reserva profesional protegida por la Ley 43 de 1990.',
    },
    {
      q: '¿Cuánto tiempo toma ver resultados tangibles en el flujo de caja?',
      a: 'En las primeras 3 a 4 semanas completamos el diagnóstico forense de costos y ciclo de conversión de efectivo. Típicamente entre los días 45 y 60 nuestros clientes capturan liberaciones de liquidez por renegociación de plazos con proveedores, saneamiento de cartera y optimización tributaria.',
    },
    {
      q: '¿Podemos contratar un proyecto puntual de valoración o deuda sin el fee mensual?',
      a: 'Sí. Disponemos del esquema de "Proyectos Especiales" diseñado exclusivamente para operaciones puntuales como valoración por Flujo de Caja Descontado (DCF), estructuración de crédito sindicado o preparación de data room para rondas o fusiones.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#7EDBFF]/30 text-[#7EDBFF] text-xs font-mono font-medium">
            <Building2 className="w-3.5 h-3.5" />
            FINANZAS CORPORATIVAS & DIRECCIÓN ESTRATÉGICA
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Control Total de su Flujo de Caja, Margen y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EDBFF] to-[#2563eb]">
              Rentabilidad Operativa
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed max-w-2xl">
            Transformamos la contabilidad tradicional en un instrumento de alta precisión directiva. Dirección financiera externa (CFO as a Service), optimización de capital de trabajo y reestructuración de pasivos para compañías que facturan desde $1.000M COP.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onOpenDiagnostic('Empresa')}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7EDBFF] text-white font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-[#2563eb]/25 hover:opacity-95 transition-all text-sm group"
            >
              <span>Diagnosticar Salud Financiera</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#simulador"
              className="py-3.5 px-6 rounded-xl bg-[#171f33] border border-[#334155] text-white font-medium hover:bg-[#222a3d] transition-all text-sm flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#7EDBFF]" />
              <span>Simulador de Margen EBITDA</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CUATRO PILARES DEL ACOMPAÑAMIENTO CORPORATIVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest mb-2">
            Metodología Cuantitativa
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Cuatro Pilares de la Práctica Corporativa JEV
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2">
            Arquitectura financiera integral diseñada para empresas medianas y grandes en Colombia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pilar 1 */}
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#7EDBFF]/50 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#7EDBFF]/40 text-[#7EDBFF] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-semibold text-[#7EDBFF] bg-[#7EDBFF]/10 px-2.5 py-1 rounded-full border border-[#7EDBFF]/30">
                01 • Liquidez & Proyecciones
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Planeación Financiera Dinámica & Flujo de Caja
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Diseñamos simuladores financieros en tiempo real y proyecciones móviles a 13 semanas (13-Week Cash Flow) para prever requerimientos de capital, negociar con entidades bancarias y proteger la caja operativa ante volatilidades de mercado.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
                <span>Optimización del Capital de Trabajo Neto Operativo (KTNO).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
                <span>Reestructuración y perfilamiento de pasivos financieros corporativos.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7EDBFF] shrink-0 mt-0.5" />
                <span>Modelación de escenarios de estrés de ventas, cobranza y tipo de cambio.</span>
              </div>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#4edea3]/50 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-semibold text-[#4edea3] bg-[#4edea3]/10 px-2.5 py-1 rounded-full border border-[#4edea3]/30">
                02 • Eficiencia Operativa
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Estructuración y Control Presupuestal Base Cero
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Instauramos una cultura de disciplina presupuestal por centros de costos (Cost Centers) y comités mensuales de variación real vs. proyectado. Detectamos fugas de liquidez antes de que erosionen el margen EBITDA.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
                <span>Metodología Zero-Based Budgeting (ZBB) aplicada a Opex y Capex.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
                <span>Diseño de tableros de control de gastos gerenciales con umbrales de alerta.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
                <span>Auditoría de compras corporativas y renegociación de contratos con proveedores.</span>
              </div>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#ffb77d]/50 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#ffb77d]/40 text-[#ffb77d] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-semibold text-[#ffb77d] bg-[#ffb77d]/10 px-2.5 py-1 rounded-full border border-[#ffb77d]/30">
                03 • Eficiencia Fiscal & DIAN
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Planeación Tributaria Integral & Blindaje Legal
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Aplicamos todas las prerrogativas y deducciones autorizadas por el Estatuto Tributario colombiano y las reformas fiscales recientes para rebajar legalmente la tasa efectiva de tributación y asegurar total certidumbre ante fiscalizaciones.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffb77d] shrink-0 mt-0.5" />
                <span>Optimización legal del impuesto sobre la renta corporativa (Régimen Ordinario).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffb77d] shrink-0 mt-0.5" />
                <span>Revisión exhaustiva de retenciones, IVA descontable e información exógena.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffb77d] shrink-0 mt-0.5" />
                <span>Precios de transferencia y fiscalidad en transacciones intercompañía.</span>
              </div>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] hover:border-[#b4c5ff]/50 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#b4c5ff]/40 text-[#b4c5ff] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-semibold text-[#b4c5ff] bg-[#b4c5ff]/10 px-2.5 py-1 rounded-full border border-[#b4c5ff]/30">
                04 • Exactitud Contable
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Auditoría Contable & Diagnóstico NIIF
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Sanación integral de balances y depuración de cuentas contables rezagadas. Dejamos los estados financieros listos para dictamen de revisoría fiscal, comités de crédito bancario institucional o procesos de levantamiento de capital.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#c3c6d7]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#b4c5ff] shrink-0 mt-0.5" />
                <span>Conciliaciones patrimoniales y saneamiento de inventarios y activos fijos.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#b4c5ff] shrink-0 mt-0.5" />
                <span>Alineación estricta con NIIF para Pymes (Grupo 2) o Plenas (Grupo 1).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#b4c5ff] shrink-0 mt-0.5" />
                <span>Preparación para auditorías externas, rondas de inversión y procesos M&A.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMULADOR INTERACTIVO DE MARGEN & EBITDA */}
      <section id="simulador" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#171f33] to-[#0e172a] border border-[#334155] shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest">
              Herramienta Cuantitativa
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Simulador Interactivo de Sensibilidad EBITDA
            </h2>
            <p className="text-sm text-[#c3c6d7] mt-2">
              Ajuste los valores de facturación anual, costo de ventas y gastos operativos para estimar el potencial de expansión de margen con el acompañamiento de JEV.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Controls */}
            <div className="lg:col-span-6 space-y-6 bg-[#0b1326] p-6 rounded-2xl border border-[#334155]">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#94A3B8]">Facturación Anual (Millones COP)</span>
                  <span className="text-white font-bold">${revenue.toLocaleString()}M</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full accent-[#2563eb] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#94A3B8]">Costo de Ventas (COGS)</span>
                  <span className="text-white font-bold">{cogsPercent}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  step="1"
                  value={cogsPercent}
                  onChange={(e) => setCogsPercent(Number(e.target.value))}
                  className="w-full accent-[#7EDBFF] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#94A3B8]">Gastos Operativos OPEX (Millones COP)</span>
                  <span className="text-white font-bold">${opex.toLocaleString()}M</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={opex}
                  onChange={(e) => setOpex(Number(e.target.value))}
                  className="w-full accent-[#4edea3] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-6 bg-[#131b2e] p-6 rounded-2xl border border-[#334155] space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#060e20] rounded-xl border border-[#334155]">
                  <span className="text-[11px] font-mono text-[#94A3B8]">EBITDA ACTUAL</span>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    ${ebitda.toFixed(1)}M
                  </div>
                  <div className="text-xs font-mono text-[#94A3B8] mt-0.5">
                    Margen: {ebitdaMargin.toFixed(1)}%
                  </div>
                </div>

                <div className="p-3.5 bg-[#060e20] rounded-xl border border-[#4edea3]/40">
                  <span className="text-[11px] font-mono text-[#4edea3]">EBITDA CON JEV (+5.2%)</span>
                  <div className="text-xl font-bold font-mono text-[#4edea3] mt-1">
                    ${optimizedEbitda.toFixed(1)}M
                  </div>
                  <div className="text-xs font-mono text-[#4edea3] mt-0.5">
                    Margen: {optimizedMargin.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0b1326] rounded-xl border border-[#7EDBFF]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#94A3B8]">Impacto Anual en Utilidad Neta</div>
                  <div className="text-2xl font-extrabold text-[#7EDBFF] font-mono">
                    +${ebitdaGain.toFixed(1)} Millones COP
                  </div>
                </div>
                <button
                  onClick={() => onOpenDiagnostic('Empresa')}
                  className="py-2.5 px-4 rounded-xl bg-[#2563eb] text-white text-xs font-medium hover:bg-[#1d4ed8] transition-colors"
                >
                  Capturar Este Margen
                </button>
              </div>

              <p className="text-[11px] text-[#64748B] font-mono leading-tight">
                *Simulación con fines ilustrativos basada en medias históricas de optimización en compras estratégicas, renegociación de pasivos y aprovechamiento de escudos fiscales en Colombia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ESQUEMAS FLEXIBLES DE CONTRATACIÓN (3 Planes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-widest mb-2">
            Modelos de Vinculación
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Esquemas Flexibles Adaptados a su Tamaño
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2">
            Sin nóminas rígidas ni costos prestacionales. Invierta exactamente en el nivel de tracción que su compañía requiere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#171f33] text-xs font-mono text-[#94A3B8] border border-[#334155]">
                PUNTUAL • 1 SOLA VEZ
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Diagnóstico 360° Forense
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Auditoría exhaustiva de flujo de caja, estructura de costos, carga impositiva y endeudamiento de los últimos 24 meses.
              </p>
              <ul className="space-y-2 text-xs text-[#94A3B8] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Entrega en 21 días hábiles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Hoja de ruta con +15 quick-wins
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Presentación ejecutiva a socios
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenDiagnostic('Empresa')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#171f33] border border-[#334155] text-white hover:bg-[#222a3d] text-xs font-semibold transition-colors"
            >
              Solicitar Diagnóstico 360°
            </button>
          </div>

          {/* Plan 2: Destacado */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#131b2e] border-2 border-[#7EDBFF] flex flex-col justify-between relative shadow-xl shadow-[#2563eb]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7EDBFF] text-[#060e20] text-[10px] font-bold font-mono uppercase tracking-wider">
              MÁS ELEGIDO POR EMPRESAS
            </div>
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#2563eb]/30 text-xs font-mono text-[#7EDBFF] border border-[#7EDBFF]/40">
                RECURRENTE MENSUAL
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                CFO as a Service Retainer
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Dirección financiera activa de tiempo parcial con socio asignado, comités mensuales y modelación semanal dinámica.
              </p>
              <ul className="space-y-2 text-xs text-[#dae2fd] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Acompañamiento directivo continuo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Control riguroso de caja de 13 semanas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Interlocución directa con bancos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Planeación tributaria anual integrada
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contacto')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-md shadow-[#2563eb]/30 transition-colors"
            >
              Agendar Asesoría CFO
            </button>
          </div>

          {/* Plan 3 */}
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#171f33] text-xs font-mono text-[#ffb77d] border border-[#ffb77d]/30">
                HITOS & SUCESS FEE
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Proyectos Especiales & M&A
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Estructuración de operaciones de deuda sindicada, valoración técnica para venta, escisiones o entrada de nuevos socios.
              </p>
              <ul className="space-y-2 text-xs text-[#94A3B8] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Valoración DCF y WACC auditada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Construcción de Data Room
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                  Negociación técnica en mesas
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('contacto')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#171f33] border border-[#334155] text-white hover:bg-[#222a3d] text-xs font-semibold transition-colors"
            >
              Cotizar Operación Especial
            </button>
          </div>
        </div>
      </section>

      {/* 5. FORMULARIO DE SESIÓN CORPORATIVA CONFIDENCIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0e172a] border border-[#334155] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563eb]/20 text-[#7EDBFF] text-xs font-mono">
                <Lock className="w-3.5 h-3.5" />
                CANAL DIRECTIVO PRIVADO
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Solicite una Sesión Ejecutiva de Diagnóstico
              </h2>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Converse 45 minutos con nuestros socios directores. Revisaremos sus principales dolores de caja o rentabilidad bajo estricta confidencialidad.
              </p>
              <div className="p-4 rounded-xl bg-[#131b2e] border border-[#334155] space-y-2 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2 text-[#4edea3] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  SLA de Contacto: Menos de 4 horas hábiles
                </div>
                <p>
                  Asignamos de inmediato a un especialista del sector correspondiente a su actividad económica.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {!formSent ? (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-[#171f33] p-6 sm:p-8 rounded-2xl border border-[#334155] space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Nombre de la Empresa
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Logística Andina S.A.S."
                        value={companyForm.companyName}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, companyName: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Sector Económico
                      </label>
                      <select
                        value={companyForm.industry}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, industry: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      >
                        <option value="Manufactura / Industria">Manufactura / Industria</option>
                        <option value="Comercio y Retail">Comercio y Retail</option>
                        <option value="Servicios Profesionales / BPO">Servicios Profesionales / BPO</option>
                        <option value="Salud y Farmacéutico">Salud y Farmacéutico</option>
                        <option value="Construcción e Inmobiliario">Construcción e Inmobiliario</option>
                        <option value="Tecnología y Software">Tecnología y Software</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Rango de Facturación Anual
                      </label>
                      <select
                        value={companyForm.revenueBand}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, revenueBand: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      >
                        <option value="$1.000M - $3.000M COP">$1.000M - $3.000M COP/año</option>
                        <option value="$3.000M - $10.000M COP">$3.000M - $10.000M COP/año</option>
                        <option value="+$10.000M COP">Más de $10.000M COP/año</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Nombre del Solicitante / Cargo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez (Gerente General)"
                        value={companyForm.contactName}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, contactName: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Correo Corporativo
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="gerencia@suempresa.com"
                        value={companyForm.email}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, email: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Teléfono / WhatsApp Directo
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+57 310 000 0000"
                        value={companyForm.phone}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, phone: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7EDBFF]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7EDBFF] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2563eb]/20 hover:opacity-95 transition-all mt-2"
                  >
                    <span>Solicitar Sesión Ejecutiva Confidencial</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="bg-[#171f33] p-8 rounded-2xl border border-[#4edea3] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Solicitud Corporativa Recibida
                  </h3>
                  <p className="text-sm text-[#c3c6d7]">
                    Nos pondremos en contacto con <strong className="text-white">{companyForm.contactName}</strong> de{' '}
                    <strong className="text-white">{companyForm.companyName}</strong> en las próximas horas para coordinar la reunión con nuestro Socio Director.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="py-2.5 px-5 rounded-xl bg-[#222a3d] text-white text-xs font-medium hover:bg-[#2d3449]"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PREGUNTAS FRECUENTES (FAQ Acordeón) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest mb-1.5">
            Resolución de Dudas
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Preguntas Frecuentes de Directores y Accionistas
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#131b2e] border border-[#334155] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#171f33] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7EDBFF] shrink-0 transition-transform duration-200 ${
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
