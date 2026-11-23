import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrajectorySection from './components/TrajectorySection';
import FeedbackSection from './components/FeedbackSection';
import WorkShowcaseSection from './components/WorkShowcaseSection';
import CtaSection from './components/CtaSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import StudioView from './components/StudioView';
import AboutView from './components/AboutView';
import TalksView from './components/TalksView';
import ContactView from './components/ContactView';
import UnderDevelopmentView from './components/UnderDevelopmentView';
import { trackEngine } from './audio/trackEngine';

gsap.registerPlugin(ScrollTrigger);

const VALID_VIEWS = ['home', 'estudio', 'acerca', 'talks', 'contacto'];

function getInitialView() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return VALID_VIEWS.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activeView, setActiveView] = useState(getInitialView);

  useEffect(() => {
    const onHashChange = () => {
      const next = getInitialView();
      setActiveView(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (viewId) => {
    if (!VALID_VIEWS.includes(viewId)) return;
    if (viewId !== 'home') {
      trackEngine.stop();
    }
    setActiveView(viewId);
    window.history.replaceState(null, '', viewId === 'home' ? '#inicio' : `#${viewId}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b] text-[#c3c1b6] flex flex-col">
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <TrajectorySection onNavigate={handleNavigate} />
            <FeedbackSection />
            <WorkShowcaseSection />
            <CtaSection onNavigate={handleNavigate} />
            <FaqSection onNavigate={handleNavigate} />
          </>
        )}

        {activeView === 'estudio' && (
          <UnderDevelopmentView sectionId="estudio" onNavigate={handleNavigate} />
        )}
        {activeView === 'acerca' && (
          <UnderDevelopmentView sectionId="acerca" onNavigate={handleNavigate} />
        )}
        {activeView === 'talks' && (
          <UnderDevelopmentView sectionId="talks" onNavigate={handleNavigate} />
        )}
        {activeView === 'contacto' && <ContactView onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingWhatsAppButton />
    </div>
  );
}
