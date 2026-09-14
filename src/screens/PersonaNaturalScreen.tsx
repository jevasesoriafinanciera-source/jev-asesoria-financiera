import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  UserCheck,
  Shield,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Lock,
  ChevronDown,
  Sparkles,
  FileText,
  Globe2,
  DollarSign,
  Send,
} from 'lucide-react';
import { TAX_CONSTANTS } from '../data/mockData';

interface PersonaNaturalScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const PersonaNaturalScreen: React.FC<PersonaNaturalScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  // Real Colombian Tax Simulator 2026
  const [grossIncomeMillions, setGrossIncomeMillions] = useState(240); // Millions COP/year (e.g. 20M/month)
  const [afcPercent, setAfcPercent] = useState(8); // % of income in AFC / Pensiones voluntarias
  const [prepaidMonths, setPrepaidMonths] = useState(12); // months of prepagada
  const [dependentsCount, setDependentsCount] = useState(2); // number of dependents (72 UVT each)
  const [electronicInvoicesMillions, setElectronicInvoicesMillions] = useState(40); // COP purchases with electronic invoice

  // Constant calculations based on UVT
  const grossIncome = grossIncomeMillions * 1_000_000;
  const uvtValue = TAX_CONSTANTS.UVT_2026; // 49,799 COP

  // Basic mandatory deductions (pension + salud obligatoria ~8%)
  const mandatoryPensionSalud = grossIncome * 0.08;
  const netIncome = Math.max(0, grossIncome - mandatoryPensionSalud);

  // Maximum cap under Art. 336 E.T.: Min(40% of net income, 1.340 UVT)
  const maxCapAllowed = Math.min(netIncome * 0.4, TAX_CONSTANTS.MAX_CAP_UVT * uvtValue);

  // Potential deductions
  const afcContribution = (grossIncome * afcPercent) / 100;
  const prepaidDeduction = prepaidMonths * Math.min(16 * uvtValue, 700_000);
  const dependentDeduction = dependentsCount * (TAX_CONSTANTS.DEPENDENT_UVT * uvtValue);
  const invoiceDeduction = Math.min(
    electronicInvoicesMillions * 1_000_000 * 0.01,
    TAX_CONSTANTS.MAX_INVOICE_DEDUCTION_UVT * uvtValue
  );

  // Unoptimized situation (only mandatory + minimal deductions)
  const unoptimizedDeductions = mandatoryPensionSalud + 0;
  const unoptimizedTaxableBase = Math.max(0, grossIncome - unoptimizedDeductions);

  // Optimized situation with JEV tax engineering
  const optimizedDeductionsSum =
    afcContribution + prepaidDeduction + dependentDeduction + invoiceDeduction;
  const cappedDeductions = Math.min(optimizedDeductionsSum, maxCapAllowed);
  const optimizedTaxableBase = Math.max(0, netIncome - cappedDeductions);

  // Art. 241 E.T. Progressive Tax Brackets approximation
  const calculateArt241Tax = (baseCOP: number) => {
    const baseUVT = baseCOP / uvtValue;
    if (baseUVT <= 1090) return 0;
    if (baseUVT <= 1700) return (baseUVT - 1090) * 0.19 * uvtValue;
    if (baseUVT <= 4100) return (116 * uvtValue) + (baseUVT - 1700) * 0.28 * uvtValue;
    if (baseUVT <= 8670) return (788 * uvtValue) + (baseUVT - 4100) * 0.33 * uvtValue;
    if (baseUVT <= 18970) return (2296 * uvtValue) + (baseUVT - 8670) * 0.35 * uvtValue;
    if (baseUVT <= 31000) return (5901 * uvtValue) + (baseUVT - 18970) * 0.37 * uvtValue;
    return (10352 * uvtValue) + (baseUVT - 31000) * 0.39 * uvtValue;
  };

  const taxBefore = calculateArt241Tax(unoptimizedTaxableBase);
  const taxAfter = calculateArt241Tax(optimizedTaxableBase);
  const taxSavings = Math.max(0, taxBefore - taxAfter);
  const effectiveRateBefore = grossIncome > 0 ? (taxBefore / grossIncome) * 100 : 0;
  const effectiveRateAfter = grossIncome > 0 ? (taxAfter / grossIncome) * 100 : 0;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileType: 'Empleado Ejecutivo / Directivo',
    incomeRange: '$150M - $300M COP/año',
    hasForeignAssets: 'No',
  });
  const [formSent, setFormSent] = useState(false);

  // Accordion FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cuál es la diferencia entre planeación tributaria legal y evasión?',
      a: 'La evasión es un delito penal que consiste en ocultar ingresos o falsificar gastos. La planeación tributaria que realiza JEV es 100% legal (economía de opción): consiste en utilizar de forma rigurosa los beneficios, deducciones especiales, rentas exentas (AFC, pensiones voluntarias, dependientes, compras electrónicas) y tratados de doble tributación expresamente previstos en el Estatuto Tributario de Colombia.',
    },
    {
      q: '¿Cómo afectó la última reforma tributaria (Ley 2277) a las personas naturales?',
      a: 'La reforma redujo drásticamente el límite global de deducciones y rentas exentas de 5.040 UVT a tan solo 1.340 UVT anuales. Esto incrementó la tributación para personas con ingresos mensuales superiores a $12 millones COP. En JEV estructuramos esquemas para aprovechar hasta el último peso del tope legal y evaluar si le conviene pasar a esquemas corporativos o de Holding.',
    },
    {
      q: '¿Mis datos patrimoniales e información de renta son tratados con reserva?',
      a: 'Absolutamente. Todos nuestros consultores están cobijados bajo el secreto profesional contable (Ley 43 de 1990) y firmamos acuerdos de confidencialidad estrictos. Jamás compartimos su información con terceros.',
    },
    {
      q: '¿Qué ocurre si poseo inversiones o cuentas bancarias en el exterior (EE.UU., Panamá, etc.)?',
      a: 'Los residentes fiscales en Colombia deben declarar sus bienes mundiales (formulario 160 de activos en el exterior). Diseñamos la estrategia para aplicar créditos tributarios por impuestos pagados en el extranjero y evitar la doble tributación.',
    },
  ];

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#ffb77d]/30 text-[#ffb77d] text-xs font-mono font-medium">
            <UserCheck className="w-3.5 h-3.5" />
            PLANEACIÓN TRIBUTARIA & GESTIÓN PATRIMONIAL
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Protección Patrimonial y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb77d] via-[#7EDBFF] to-[#4edea3]">
              Optimización en Renta
            </span>{' '}
            para Personas Naturales
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed max-w-2xl">
            Acompañamos a directores ejecutivos, socios, inversionistas y profesionales independientes en la estructuración de su patrimonio familiar, declaración de renta compleja y blindaje ante requerimientos de la DIAN.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onOpenDiagnostic('Persona Natural')}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ffb77d] to-[#2563eb] text-[#060e20] font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-[#ffb77d]/20 hover:opacity-95 transition-all text-sm group"
            >
              <span>Evaluar Declaración de Renta</span>
              <ArrowRight className="w-4 h-4 text-[#060e20] group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#simulador-fiscal"
              className="py-3.5 px-6 rounded-xl bg-[#171f33] border border-[#334155] text-white font-medium hover:bg-[#222a3d] transition-all text-sm flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#ffb77d]" />
              <span>Simulador de Impuesto Art. 241 E.T.</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#4edea3]" />
              0 Contingencias con la DIAN
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
              Topes Reales 1.340 UVT 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#4edea3]" />
              Reserva Profesional Ley 43
            </span>
          </div>
        </div>
      </section>

      {/* 2. SIMULADOR FISCAL ART. 241 & ART. 336 E.T. */}
      <section id="simulador-fiscal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#171f33] via-[#131b2e] to-[#0f172a] border border-[#334155] shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-[#ffb77d] uppercase tracking-widest">
              Simulador Fiscal Certificado 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Simulador de Eficiencia en Declaración de Renta
            </h2>
            <p className="text-sm text-[#c3c6d7] mt-2">
              Calcule cuánto impuesto pagaría sin planeación vs. el escenario optimizado aplicando con rigor los límites del Estatuto Tributario colombiano (Art. 336 y Art. 241).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 bg-[#0b1326] p-6 rounded-2xl border border-[#334155] space-y-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#94A3B8]">Ingreso Bruto Anual (COP)</span>
                  <span className="text-white font-bold font-mono">
                    ${grossIncomeMillions}M COP/año (~${(grossIncomeMillions / 12).toFixed(1)}M/mes)
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="800"
                  step="10"
                  value={grossIncomeMillions}
                  onChange={(e) => setGrossIncomeMillions(Number(e.target.value))}
                  className="w-full accent-[#ffb77d] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Aporte AFC / Voluntarias</span>
                    <span className="text-white font-bold font-mono">{afcPercent}% ingreso</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={afcPercent}
                    onChange={(e) => setAfcPercent(Number(e.target.value))}
                    className="w-full accent-[#2563eb] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Meses Medicina Prepagada</span>
                    <span className="text-white font-bold font-mono">{prepaidMonths} meses</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={prepaidMonths}
                    onChange={(e) => setPrepaidMonths(Number(e.target.value))}
                    className="w-full accent-[#7EDBFF] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#334155]/60">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Número de Dependientes</span>
                    <span className="text-white font-bold font-mono">{dependentsCount} (72 UVT c/u)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={dependentsCount}
                    onChange={(e) => setDependentsCount(Number(e.target.value))}
                    className="w-full accent-[#4edea3] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#94A3B8]">Compras con Factura Electrónica</span>
                    <span className="text-white font-bold font-mono">${electronicInvoicesMillions}M (1% deducible)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={electronicInvoicesMillions}
                    onChange={(e) => setElectronicInvoicesMillions(Number(e.target.value))}
                    className="w-full accent-[#ffb77d] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 bg-[#131b2e] p-6 rounded-2xl border border-[#334155] space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#060e20] rounded-xl border border-[#334155]">
                  <span className="text-[10px] font-mono text-[#94A3B8]">IMPUESTO SIN ASESORÍA</span>
                  <div className="text-xl font-bold font-mono text-[#ffb4ab] mt-1">
                    ${(taxBefore / 1_000_000).toFixed(1)}M
                  </div>
                  <div className="text-[10px] text-[#94A3B8] font-mono">
                    Tasa Efectiva: {effectiveRateBefore.toFixed(1)}%
                  </div>
                </div>

                <div className="p-3.5 bg-[#060e20] rounded-xl border border-[#4edea3]/40">
                  <span className="text-[10px] font-mono text-[#4edea3]">IMPUESTO OPTIMIZADO JEV</span>
                  <div className="text-xl font-bold font-mono text-[#4edea3] mt-1">
                    ${(taxAfter / 1_000_000).toFixed(1)}M
                  </div>
                  <div className="text-[10px] text-[#4edea3] font-mono">
                    Tasa Efectiva: {effectiveRateAfter.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0b1326] rounded-xl border border-[#4edea3]/50">
                <div className="text-xs text-[#94A3B8]">Ahorro Neto Estimado en su Bolsillo</div>
                <div className="text-3xl font-extrabold text-[#4edea3] font-mono mt-1">
                  ${(taxSavings / 1_000_000).toFixed(1)} Millones COP
                </div>
                <div className="text-[11px] text-[#c3c6d7] mt-1">
                  100% legal bajo las reglas de juego de la DIAN y la Ley 2277.
                </div>
              </div>

              <button
                onClick={() => onOpenDiagnostic('Persona Natural')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ffb77d] to-[#2563eb] text-[#060e20] font-bold text-xs hover:opacity-95 transition-all shadow-md"
              >
                Blindar mi Declaración de Renta 2026
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRES ÁREAS DE ESPECIALIZACIÓN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#ffb77d] uppercase tracking-widest mb-2">
            Servicios Patrimoniales
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Estructuración para Cada Dimensión de su Patrimonio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#ffb77d]/40 text-[#ffb77d] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Declaración de Renta Cedular Compleja
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Depuración precisa de ingresos laborales, rentas de capital, dividendos y ganancias ocasionales (venta de inmuebles o acciones). Conciliación patrimonial sin inconsistencias.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#7EDBFF]/40 text-[#7EDBFF] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Holdings Familiares & Sucesión
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Creación de sociedades patrimoniales holding en Colombia o jurisdicciones neutrales, protocolos de familia, separación de activos operativos y optimización de herencias.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-[#4edea3]/40 text-[#4edea3] flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Activos en el Exterior & Doble Tributación
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c6d7] leading-relaxed">
              Especialistas en la declaración de activos en EE.UU., Panamá, España y Europa. Aplicación rigurosa de Convenios para Evitar la Doble Imposición (CDI) y créditos fiscales.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO DE CONSULTA CONFIDENCIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0e172a] border border-[#334155] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-[#ffb77d] uppercase tracking-wider font-semibold">
                EVALUACIÓN PRELIMINAR CONFIDENCIAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Solicite su Pre-Evaluación de Renta y Patrimonio
              </h2>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Nuestros especialistas en derecho tributario y finanzas patrimoniales revisarán la viabilidad de su caso sin costo ni compromiso.
              </p>
            </div>

            <div className="lg:col-span-7">
              {!formSent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                  }}
                  className="bg-[#171f33] p-6 sm:p-8 rounded-2xl border border-[#334155] space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Perfil del Contribuyente
                      </label>
                      <select
                        value={formData.profileType}
                        onChange={(e) => setFormData({ ...formData, profileType: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb77d]"
                      >
                        <option value="Empleado Ejecutivo / Directivo">Empleado Ejecutivo / Directivo</option>
                        <option value="Socio Accionista / Dividendos">Socio Accionista / Dividendos</option>
                        <option value="Profesional Independiente">Profesional Independiente</option>
                        <option value="Inversionista con Activos Exterior">Inversionista con Activos Exterior</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Rango de Ingresos Anuales
                      </label>
                      <select
                        value={formData.incomeRange}
                        onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb77d]"
                      >
                        <option value="$100M - $200M COP">$100M - $200M COP/año</option>
                        <option value="$200M - $500M COP">$200M - $500M COP/año</option>
                        <option value="Más de $500M COP">Más de $500M COP/año</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Roberto Valencia"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb77d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        ¿Posee Inversiones en el Exterior?
                      </label>
                      <select
                        value={formData.hasForeignAssets}
                        onChange={(e) =>
                          setFormData({ ...formData, hasForeignAssets: e.target.value })
                        }
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb77d]"
                      >
                        <option value="No">No, solo en Colombia</option>
                        <option value="Sí">Sí (EE.UU., Panamá, etc.)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="correo@personal.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb77d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1.5">
                        WhatsApp Confidencial
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+57 310 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#131b2e] border border-[#334155] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb77d]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ffb77d] to-[#2563eb] text-[#060e20] font-bold text-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Solicitar Pre-Evaluación Patrimonial</span>
                    <Send className="w-4 h-4 text-[#060e20]" />
                  </button>
                </form>
              ) : (
                <div className="bg-[#171f33] p-8 rounded-2xl border border-[#4edea3] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Solicitud Patrimonial Recibida
                  </h3>
                  <p className="text-sm text-[#c3c6d7]">
                    La Dra. Marcela Restrepo o un socio sénior de planeación fiscal revisará los parámetros ingresados y se comunicará de manera privada a su número personal.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="py-2.5 px-5 rounded-xl bg-[#222a3d] text-white text-xs font-medium"
                  >
                    Nueva consulta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ PERSONA NATURAL */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Preguntas Frecuentes sobre Declaración de Renta
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
                    className={`w-5 h-5 text-[#ffb77d] shrink-0 transition-transform ${
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
