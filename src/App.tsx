import React, { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DiagnosticModal } from './components/DiagnosticModal';
import { HomeScreen } from './screens/HomeScreen';
import { EmpresasScreen } from './screens/EmpresasScreen';
import { StartupsScreen } from './screens/StartupsScreen';
import { PersonaNaturalScreen } from './screens/PersonaNaturalScreen';
import { NosotrosScreen } from './screens/NosotrosScreen';
import { ImpactoResultadosScreen } from './screens/ImpactoResultadosScreen';
import { ContactoScreen } from './screens/ContactoScreen';
import { MessageSquare, ArrowUp } from 'lucide-react';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('inicio');
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [diagnosticProfile, setDiagnosticProfile] = useState<
    'Empresa' | 'Emprendimiento' | 'Persona Natural'
  >('Empresa');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenId;
      const validScreens: ScreenId[] = [
        'inicio',
        'empresas',
        'emprendimientos',
        'persona-natural',
        'nosotros',
        'impacto',
        'contacto',
      ];
      if (validScreens.includes(hash)) {
        setCurrentScreen(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.location.hash = screen;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDiagnostic = (profile: 'Empresa' | 'Emprendimiento' | 'Persona Natural' = 'Empresa') => {
    setDiagnosticProfile(profile);
    setDiagnosticOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col selection:bg-[#2563eb] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenDiagnostic={openDiagnostic}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentScreen === 'inicio' && (
          <HomeScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
        {currentScreen === 'empresas' && (
          <EmpresasScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
        {currentScreen === 'emprendimientos' && (
          <StartupsScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
        {currentScreen === 'persona-natural' && (
          <PersonaNaturalScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
        {currentScreen === 'nosotros' && (
          <NosotrosScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
        {currentScreen === 'impacto' && (
          <ImpactoResultadosScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
        {currentScreen === 'contacto' && (
          <ContactoScreen onNavigate={navigateTo} onOpenDiagnostic={openDiagnostic} />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Global Diagnostic Modal */}
      <DiagnosticModal
        isOpen={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
        initialProfile={diagnosticProfile}
      />

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#171f33] border border-[#334155] text-[#94A3B8] hover:text-white hover:bg-[#222a3d] flex items-center justify-center shadow-lg transition-all"
            title="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href="https://wa.me/573105550192?text=Hola%20JEV%20Asesor%C3%ADa%20Financiera%2C%20deseo%20hacer%20una%20consulta%20directa"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 py-3 px-4 rounded-full bg-[#00a572] text-white font-medium shadow-2xl hover:bg-[#00a572]/90 transition-all hover:scale-105"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline text-xs font-semibold">
            Línea WhatsApp Directa
          </span>
        </a>
      </div>
    </div>
  );
}

export default App;
