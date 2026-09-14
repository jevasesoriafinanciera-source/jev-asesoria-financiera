import React, { useState } from 'react';
import { Logo } from './Logo';
import { ScreenId } from '../types';
import {
  ChevronDown,
  Building2,
  Rocket,
  UserCheck,
  Calendar,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenDiagnostic: (profile?: 'Empresa' | 'Emprendimiento' | 'Persona Natural') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDiagnostic,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    {
      id: 'servicios',
      label: 'Servicios',
      isDropdown: true,
      subItems: [
        {
          id: 'empresas',
          label: 'Empresas & Corporativo',
          desc: 'Dirección financiera externa, rentabilidad y M&A',
          icon: Building2,
          color: 'text-[#7EDBFF]',
        },
        {
          id: 'emprendimientos',
          label: 'Emprendimientos & Startups',
          desc: 'Unit economics, runway y preparación de ronda',
          icon: Rocket,
          color: 'text-[#4edea3]',
        },
        {
          id: 'persona-natural',
          label: 'Persona Natural & Patrimonio',
          desc: 'Planeación tributaria legal y protección de activos',
          icon: UserCheck,
          color: 'text-[#ffb77d]',
        },
      ],
    },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'impacto', label: 'Impacto & Resultados' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleSubNavClick = (screenId: ScreenId) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onNavigate(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (screenId: ScreenId) => {
    setMobileMenuOpen(false);
    onNavigate(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b1326]/90 backdrop-blur-md border-b border-[#334155]/60 transition-all">
      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Original */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="text-left group cursor-pointer focus:outline-none"
          title="JEV Asesoría Financiera - Inicio"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            if (item.isDropdown && item.subItems) {
              const isServiceActive = ['empresas', 'emprendimientos', 'persona-natural'].includes(
                currentScreen
              );
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isServiceActive
                        ? 'text-[#7EDBFF] bg-[#171f33]'
                        : 'text-[#dae2fd] hover:text-white hover:bg-[#131b2e]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        servicesOpen ? 'rotate-180 text-[#7EDBFF]' : 'text-[#94A3B8]'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-80 pt-2 z-50">
                      <div className="bg-[#171f33] border border-[#334155] rounded-xl p-2 shadow-2xl backdrop-blur-xl">
                        {item.subItems.map((sub) => {
                          const Icon = sub.icon;
                          const isSubActive = currentScreen === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSubNavClick(sub.id as ScreenId)}
                              className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                                isSubActive
                                  ? 'bg-[#222a3d] border border-[#7EDBFF]/30'
                                  : 'hover:bg-[#131b2e]'
                              }`}
                            >
                              <div
                                className={`p-2 rounded-lg bg-[#0b1326] border border-[#334155] ${sub.color}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">
                                  {sub.label}
                                </div>
                                <div className="text-xs text-[#94A3B8] mt-0.5 line-clamp-1">
                                  {sub.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as ScreenId)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#7EDBFF] bg-[#171f33] font-semibold'
                    : 'text-[#dae2fd] hover:text-white hover:bg-[#131b2e]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenDiagnostic()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-[#00a572]/15 text-[#4edea3] border border-[#4edea3]/30 hover:bg-[#00a572]/25 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4edea3]" />
            Diagnóstico GRATIS
          </button>

          <button
            onClick={() => handleNavClick('contacto')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-md shadow-[#2563eb]/25 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Agendar Asesoría
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenDiagnostic()}
            className="p-2 text-xs font-mono font-medium rounded-lg bg-[#00a572]/20 text-[#4edea3] border border-[#4edea3]/30"
          >
            Test
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#dae2fd] hover:text-white hover:bg-[#171f33] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e172a] border-b border-[#334155] p-4 space-y-3">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                currentScreen === 'inicio' ? 'bg-[#222a3d] text-[#7EDBFF]' : 'text-white'
              }`}
            >
              Inicio
            </button>
            <div className="pt-2 pb-1 text-xs font-mono uppercase text-[#94A3B8] px-3">
              Servicios Especializados
            </div>
            <button
              onClick={() => handleSubNavClick('empresas')}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                currentScreen === 'empresas' ? 'bg-[#222a3d] text-[#7EDBFF]' : 'text-[#dae2fd]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#7EDBFF]" />
              Empresas & Finanzas Corporativas
            </button>
            <button
              onClick={() => handleSubNavClick('emprendimientos')}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                currentScreen === 'emprendimientos'
                  ? 'bg-[#222a3d] text-[#4edea3]'
                  : 'text-[#dae2fd]'
              }`}
            >
              <Rocket className="w-4 h-4 text-[#4edea3]" />
              Emprendimientos & Startups
            </button>
            <button
              onClick={() => handleSubNavClick('persona-natural')}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                currentScreen === 'persona-natural'
                  ? 'bg-[#222a3d] text-[#ffb77d]'
                  : 'text-[#dae2fd]'
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#ffb77d]" />
              Persona Natural & Patrimonio
            </button>
            <div className="border-t border-[#334155]/60 my-2 pt-2"></div>
            <button
              onClick={() => handleNavClick('nosotros')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                currentScreen === 'nosotros' ? 'bg-[#222a3d] text-[#7EDBFF]' : 'text-white'
              }`}
            >
              Nosotros & Filosofía
            </button>
            <button
              onClick={() => handleNavClick('impacto')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                currentScreen === 'impacto' ? 'bg-[#222a3d] text-[#7EDBFF]' : 'text-white'
              }`}
            >
              Impacto & Resultados Auditados
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                currentScreen === 'contacto' ? 'bg-[#222a3d] text-[#7EDBFF]' : 'text-white'
              }`}
            >
              Contacto & Sedes
            </button>
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnostic();
              }}
              className="w-full py-2.5 rounded-lg bg-[#00a572] text-white font-medium text-center text-sm"
            >
              Solicitar Pre-Diagnóstico
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className="w-full py-2.5 rounded-lg bg-[#2563eb] text-white font-medium text-center text-sm"
            >
              Agendar Asesoría
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
