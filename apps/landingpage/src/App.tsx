import { useEffect, useState } from 'react';
import { useModal } from './hooks/useModal';
import { ModalId } from './types';
import { LocaleProvider } from './context/locale-provider';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Plans from './components/Plans';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

import {
  SignInSupervisorModal,
  SignInCompanyModal,
  SignInAdvisorModal,
  SignInFinancialManagerModal,
} from './components/modals/SignInModals';
import { GetStartedModal, ChooseRoleModal } from './components/modals/FlowModals';
import CompanySignupModal from './components/modals/CompanySignupModal';
import AdvisorSignupModal from './components/modals/AdvisorSignupModal';

export default function App() {
  return (
    <LocaleProvider>
      <AppShell />
    </LocaleProvider>
  );
}

function AppShell() {
  const { openModal, closeModal, switchModal, isOpen } = useModal();
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode((prev) => !prev);
  };

  // Track whether chooseRole was opened directly (no back button)
  // or via getStarted (show back button)
  const openChooseRoleDirect = () => {
    // We open chooseRole without a "back" path — handled via prop
    openModal('chooseRole');
  };

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${Math.min(i * 55, 300)}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(anchor.getAttribute('href') || '');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener('click', handleClick));
    return () => anchors.forEach((a) => a.removeEventListener('click', handleClick));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('resmo-landing-theme');
    if (savedTheme === 'night') {
      setIsNightMode(true);
      return;
    }
    if (savedTheme === 'day') {
      setIsNightMode(false);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsNightMode(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isNightMode ? 'night' : 'day');
    window.localStorage.setItem('resmo-landing-theme', isNightMode ? 'night' : 'day');
  }, [isNightMode]);

  // Determine if chooseRole was reached from getStarted
  const chooseRoleShowBack = isOpen('chooseRole') && !isOpen('getStarted');

  return (
    <>
      {/* Background blobs */}
      <div className="page-bg" aria-hidden="true">
        <div className="blob one" />
        <div className="blob two" />
        <div className="blob three" />
      </div>

      {/* Navigation */}
      <Navbar onOpenModal={openModal} isNightMode={isNightMode} onToggleNightMode={toggleNightMode} />

      {/* Main content */}
      <main>
        <div className="container">
          <Hero onOpenModal={openModal} onOpenChooseRoleDirect={openChooseRoleDirect} />
          <StatsBar />
          <Services />
          <HowItWorks />
          <Plans onOpenModal={openModal} />
          <CtaBanner onOpenModal={openModal} onOpenChooseRoleDirect={openChooseRoleDirect} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* ── Modals ── */}
      <SignInSupervisorModal
        isOpen={isOpen('signinSupervisor')}
        onClose={() => closeModal('signinSupervisor')}
        onSwitch={switchModal}
      />
      <SignInCompanyModal
        isOpen={isOpen('signinCompany')}
        onClose={() => closeModal('signinCompany')}
        onSwitch={switchModal}
      />
      <SignInAdvisorModal
        isOpen={isOpen('signinAdvisor')}
        onClose={() => closeModal('signinAdvisor')}
        onSwitch={switchModal}
      />
      <SignInFinancialManagerModal
        isOpen={isOpen('signinFinancialManager')}
        onClose={() => closeModal('signinFinancialManager')}
        onSwitch={switchModal}
      />
      <GetStartedModal
        isOpen={isOpen('getStarted')}
        onClose={() => closeModal('getStarted')}
        onSwitch={(from: ModalId, to: ModalId) => {
          switchModal(from, to);
        }}
      />
      <ChooseRoleModal
        isOpen={isOpen('chooseRole')}
        onClose={() => closeModal('chooseRole')}
        onSwitch={switchModal}
        showBack={chooseRoleShowBack}
      />
      <CompanySignupModal
        isOpen={isOpen('companySignup')}
        onClose={() => closeModal('companySignup')}
      />
      <AdvisorSignupModal
        isOpen={isOpen('advisorSignup')}
        onClose={() => closeModal('advisorSignup')}
        onSwitch={switchModal}
      />
    </>
  );
}
