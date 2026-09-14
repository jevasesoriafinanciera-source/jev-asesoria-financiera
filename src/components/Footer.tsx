import React from 'react';
import { Logo } from './Logo';
import { ScreenId } from '../types';
import { ShieldCheck, Mail, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (screen: ScreenId) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060e20] text-[#94A3B8] border-t border-[#334155]/70 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#334155]/50">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button onClick={() => handleNav('inicio')} className="text-left">
                <Logo size="lg" />
              </button>
            </div>
            <p className="text-sm text-[#c3c6d7] leading-relaxed max-w-sm">
              Firma contable y financiera especializada en ingeniería financiera de alta precisión, planeación tributaria estratégica y estructuración patrimonial corporativa e individual en Colombia.
            </p>
            <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#334155] text-xs text-[#dae2fd] space-y-1.5">
              <div className="flex items-center gap-2 text-[#4edea3] font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Régimen de Reserva y Vigilancia Legal</span>
              </div>
              <p className="text-[#94A3B8] text-[11px] leading-normal">
                Cumplimiento estricto bajo Ley 43 de 1990, Estatuto Tributario colombiano, directrices de la DIAN y estándares NIIF Plenas.
              </p>
            </div>
          </div>

          {/* Col 2: Empresas */}
          <div className="space-y-3 text-sm">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Empresas & Corp
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('empresas')}
                  className="hover:text-[#7EDBFF] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Dirección Financiera (CFO)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('empresas')}
                  className="hover:text-[#7EDBFF] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Auditoría y Flujo de Caja</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('empresas')}
                  className="hover:text-[#7EDBFF] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Estructuración de Deuda y M&A</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('empresas')}
                  className="hover:text-[#7EDBFF] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Blindaje Fiscal Corporativo</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Startups & Personas */}
          <div className="space-y-3 text-sm">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Startups & Personas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('emprendimientos')}
                  className="hover:text-[#4edea3] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Unit Economics & Runway</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('emprendimientos')}
                  className="hover:text-[#4edea3] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Preparación Rondas Seed/Pre-A</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('persona-natural')}
                  className="hover:text-[#ffb77d] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Declaración Renta 2026</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('persona-natural')}
                  className="hover:text-[#ffb77d] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Protección Patrimonial & Holding</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sedes & Contacto Directo */}
          <div className="space-y-3 text-sm">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Sede & Contacto
            </h4>
            <div className="space-y-2.5 text-xs text-[#c3c6d7]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7EDBFF] shrink-0" />
                <div>
                  <strong className="text-white">Bogotá D.C.</strong>
                  <span className="text-[#94A3B8] ml-1.5 text-[11px] font-mono">• Sede Principal</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7EDBFF] shrink-0" />
                <a href="mailto:clientes@jevasesoriafinanciera.com" className="hover:text-white transition-colors">
                  clientes@jevasesoriafinanciera.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal notice & bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} JEV Asesoría Financiera S.A.S. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('nosotros')} className="hover:text-white transition-colors">
              Gobierno Corporativo
            </button>
            <button onClick={() => handleNav('impacto')} className="hover:text-white transition-colors">
              Cifras Auditadas
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
