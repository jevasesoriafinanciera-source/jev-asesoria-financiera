import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Building2,
  Rocket,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Layers,
  Sparkles,
  BarChart2,
} from 'lucide-react';

interface ImpactoResultadosScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const ImpactoResultadosScreen: React.FC<ImpactoResultadosScreenProps> = ({
  onNavigate,
  onOpenDiagnostic,
}) => {
  const [activeTab, setActiveTab] = useState<'fiscal' | 'ebitda'>('fiscal');

  // Mini Quick Tab Fiscal State
  const [incomeSim, setIncomeSim] = useState(250); // M COP
  const estimatedTaxSavings = (incomeSim * 0.088).toFixed(1);

  // Mini Quick Tab EBITDA State
  const [revSim, setRevSim] = useState(2400); // M COP
  const ebitdaExpansion = (revSim * 0.052).toFixed(1);

  return (
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#7EDBFF]/30 text-[#7EDBFF] text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            TRACK RECORD & CIFRAS AUDITADAS
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
            Rendimiento Comprobado y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EDBFF] via-[#4edea3] to-[#2563eb]">
              Resultados Medibles
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] leading-relaxed">
            No vendemos promesas abstractas. Cada intervención de JEV se mide en millones de pesos liberados en el flujo de caja, puntos porcentuales de expansión de margen EBITDA y ahorro tributario certificado sin riesgo ante la DIAN.
          </p>
        </div>
      </section>

      {/* 2. GRAND BENTO STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-2">
            <div className="text-xs font-mono text-[#94A3B8] uppercase">Presupuestos Dirigidos</div>
            <div className="text-3xl font-extrabold text-white font-mono">+$1.500M</div>
            <p className="text-xs text-[#4edea3] font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Supervisados en comités
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-2">
            <div className="text-xs font-mono text-[#94A3B8] uppercase">Ahorro Fiscal Auditado</div>
            <div className="text-3xl font-extrabold text-[#7EDBFF] font-mono">+$180M+</div>
            <p className="text-xs text-[#94A3B8] font-mono">En deducciones legales Art. 336</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-2">
            <div className="text-xs font-mono text-[#94A3B8] uppercase">Expansión EBITDA Media</div>
            <div className="text-3xl font-extrabold text-[#4edea3] font-mono">+18.4%</div>
            <p className="text-xs text-[#94A3B8] font-mono">En clientes con CFO as a Service</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-2">
            <div className="text-xs font-mono text-[#94A3B8] uppercase">Glosas o Sanciones DIAN</div>
            <div className="text-3xl font-extrabold text-[#ffb77d] font-mono">0 Sanciones</div>
            <p className="text-xs text-[#4edea3] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% blindaje jurídico
            </p>
          </div>
        </div>
      </section>

      {/* 3. SIMULADORES ESTRATÉGICOS PROYECTADOS (Tab Switcher) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#171f33] to-[#0e172a] border border-[#334155] shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-[#7EDBFF] uppercase tracking-widest">
                Proyecciones Cuantitativas
              </span>
              <h2 className="text-2xl font-bold text-white font-display mt-1">
                Calcule el Retorno de Inversión de Nuestra Asesoría
              </h2>
            </div>

            {/* Tab buttons */}
            <div className="flex items-center gap-2 p-1.5 bg-[#060e20] rounded-xl border border-[#334155]">
              <button
                onClick={() => setActiveTab('fiscal')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeTab === 'fiscal'
                    ? 'bg-[#2563eb] text-white'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Planeación Fiscal Personas 2026
              </button>
              <button
                onClick={() => setActiveTab('ebitda')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeTab === 'ebitda'
                    ? 'bg-[#00a572] text-white'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Runway & EBITDA Corporativo
              </button>
            </div>
          </div>

          {activeTab === 'fiscal' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 bg-[#0b1326] p-6 rounded-2xl border border-[#334155]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Ingreso Bruto Anual Persona Natural</span>
                  <span className="text-white font-bold">${incomeSim}M COP</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="600"
                  step="10"
                  value={incomeSim}
                  onChange={(e) => setIncomeSim(Number(e.target.value))}
                  className="w-full accent-[#ffb77d] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
                <p className="text-xs text-[#94A3B8]">
                  Ajuste su nivel de ingresos estimado para 2026 para proyectar el ahorro capturado vía aportes AFC, medicina prepagada y compras con factura electrónica bajo el tope de 1.340 UVT.
                </p>
              </div>

              <div className="bg-[#131b2e] p-6 rounded-2xl border border-[#4edea3]/40 space-y-4">
                <div className="text-xs font-mono text-[#94A3B8]">
                  POTENCIAL DE AHORRO NETO EN IMPUESTO DE RENTA
                </div>
                <div className="text-4xl font-extrabold text-[#4edea3] font-mono">
                  +${estimatedTaxSavings} Millones COP
                </div>
                <p className="text-xs text-[#c3c6d7] leading-relaxed">
                  Cálculo referencial aplicando la tarifa progresiva del Art. 241 E.T. y optimización máxima de rentas exentas y deducciones especiales.
                </p>
                <button
                  onClick={() => onNavigate('persona-natural')}
                  className="py-2.5 px-4 rounded-xl bg-[#2563eb] text-white text-xs font-semibold hover:bg-[#1d4ed8] transition-colors"
                >
                  Ver Simulador Completo de Renta &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 bg-[#0b1326] p-6 rounded-2xl border border-[#334155]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Facturación Anual de la Compañía</span>
                  <span className="text-white font-bold">${revSim}M COP</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="200"
                  value={revSim}
                  onChange={(e) => setRevSim(Number(e.target.value))}
                  className="w-full accent-[#7EDBFF] bg-[#131b2e] h-2 rounded-lg cursor-pointer"
                />
                <p className="text-xs text-[#94A3B8]">
                  Basado en nuestra media histórica de expansión de +5.2% en margen EBITDA operativo mediante compras estratégicas y reestructuración del ciclo de caja.
                </p>
              </div>

              <div className="bg-[#131b2e] p-6 rounded-2xl border border-[#7EDBFF]/40 space-y-4">
                <div className="text-xs font-mono text-[#94A3B8]">
                  INCREMENTO ANUAL PROYECTADO EN CAJA LIBRE
                </div>
                <div className="text-4xl font-extrabold text-[#7EDBFF] font-mono">
                  +${ebitdaExpansion} Millones COP
                </div>
                <p className="text-xs text-[#c3c6d7] leading-relaxed">
                  Recursos netos adicionales disponibles para reinversión en inventario, dividendos a socios o pago acelerado de deuda bancaria costosa.
                </p>
                <button
                  onClick={() => onNavigate('empresas')}
                  className="py-2.5 px-4 rounded-xl bg-[#00a572] text-white text-xs font-semibold hover:bg-[#00a572]/90 transition-colors"
                >
                  Ver Soluciones para Empresas &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CASOS DE ESTUDIO REALES Y AUDITADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-widest mb-2">
            Evidencia Documentada
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Tres Casos de Éxito de Nuestra Práctica
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Case 1 */}
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#0b1326] text-[#7EDBFF] text-[10px] font-mono border border-[#334155]">
                  DISTRIBUCIÓN • BOGOTÁ
                </span>
                <span className="text-xs font-mono text-white font-bold">$2.200M/año</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Liberación de $185M en Capital de Trabajo Atrapado
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                El cliente presentaba desfase de 68 días en cartera mientras sus proveedores exigían pago a 30 días. Mediante renegociación de plazos, pronto pago y descuento de facturas, redujimos el CCC a 42 días en 90 días.
              </p>
            </div>

            <div className="p-3 bg-[#060e20] rounded-xl border border-[#334155] text-xs font-mono text-[#4edea3] flex items-center justify-between">
              <span>Resultado Clave:</span>
              <span className="font-bold">+18.2% Flujo Libre</span>
            </div>
          </div>

          {/* Case 2 */}
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#0b1326] text-[#4edea3] text-[10px] font-mono border border-[#334155]">
                  HEALTHTECH • MEDELLÍN
                </span>
                <span className="text-xs font-mono text-white font-bold">Seed $300M COP</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Modelación de Unit Economics y Extensión de Runway
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                La startup tenía solo 5 meses de caja y un modelo financiero desarticulado. Parametrizamos el CAC/LTV real y armamos el Data Room para su ronda Seed, asegurando $300 M COP de un fondo regional líder.
              </p>
            </div>

            <div className="p-3 bg-[#060e20] rounded-xl border border-[#334155] text-xs font-mono text-[#7EDBFF] flex items-center justify-between">
              <span>Runway Extendido:</span>
              <span className="font-bold">De 5 a 18 Meses</span>
            </div>
          </div>

          {/* Case 3 */}
          <div className="p-7 rounded-2xl bg-[#131b2e] border border-[#334155] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#0b1326] text-[#ffb77d] text-[10px] font-mono border border-[#334155]">
                  PATRIMONIAL • CALI
                </span>
                <span className="text-xs font-mono text-white font-bold">Familia Empresaria</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Blindaje Sucesoral y Ahorro Tributario Legal
              </h3>
              <p className="text-xs text-[#c3c6d7] leading-relaxed">
                Estructuración de una sociedad patrimonial familiar holding para ordenar inmuebles de renta y dividendos. Reducción de la tasa efectiva del 31% al 23.4% con estricto apego al Estatuto Tributario.
              </p>
            </div>

            <div className="p-3 bg-[#060e20] rounded-xl border border-[#334155] text-xs font-mono text-[#ffb77d] flex items-center justify-between">
              <span>Ahorro Anual:</span>
              <span className="font-bold">+$48M en Renta</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#2563eb] to-[#00a572] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ponga sus Estados Financieros a Prueba Técnica
            </h2>
            <p className="text-sm text-white/90">
              Coordinemos una sesión de 45 minutos para identificar de inmediato fugas de caja o ineficiencias impositivas.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contacto')}
            className="py-3.5 px-6 rounded-xl bg-white text-[#060e20] font-bold text-sm hover:bg-slate-100 transition-all shadow-lg whitespace-nowrap"
          >
            Agendar Revisión Técnica
          </button>
        </div>
      </section>
    </div>
  );
};
