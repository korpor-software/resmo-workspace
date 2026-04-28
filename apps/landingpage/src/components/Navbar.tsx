import { useState } from 'react';
import Logo from './Logo';
import { ModalId } from '../types';
import { APP_URLS } from '../config';
import { landingLocales, useLandingLocale } from '../context/locale-provider';

interface NavbarProps {
  onOpenModal: (id: ModalId) => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
}

export default function Navbar({ onOpenModal, isNightMode, onToggleNightMode }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { locale, setLocale, t } = useLandingLocale();
  const currentLanguage = landingLocales.find((lang) => lang.code === locale) ?? landingLocales[0];

  const handleSignInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(prev => !prev);
  };

  const handleRoleClick = (url: string) => {
    setDropdownOpen(false);
    window.location.href = url;
  };

  return (
    <header className="container" style={{ position: 'relative', zIndex: 1000 }}>
      <nav className="nav" onClick={() => { setDropdownOpen(false); setLanguageOpen(false); }}>
        <a href="#" className="logo">
          <Logo height={44} showTagline={true} />
        </a>

        <div className="menu">
          <a href="#" className="active">{t('nav.home')}</a>
          <a href="#services">{t('nav.services')}</a>
          <a href="#plans">{t('nav.plans')}</a>
        </div>

        <div className="nav-right">
          <div className="lang-switcher">
            <button className="btn ghost nav-lang" onClick={(e) => { e.stopPropagation(); setLanguageOpen(prev => !prev); }} aria-label="Change language">
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.label}</span>
              <span aria-hidden="true">▾</span>
            </button>
            {languageOpen && (
              <div className="role-dropdown nav-lang-menu open">
                {landingLocales.map((lang) => (
                  <div
                    key={lang.code}
                    className="role-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocale(lang.code);
                      setLanguageOpen(false);
                    }}
                  >
                    <div className="role-icon navy">{lang.flag}</div>
                    <div>
                      <div className="role-label">{lang.label}</div>
                      <div className="role-sub">{lang.dir.toUpperCase()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn ghost theme-toggle" onClick={onToggleNightMode} aria-label="Toggle night mode">
            {isNightMode ? `☀ ${t('nav.day')}` : `☾ ${t('nav.night')}`}
          </button>

          <div className="signin-trigger">
            <button className="btn ghost" onClick={handleSignInClick}>
              {t('nav.signInAs')} ▾
            </button>

            <div className={`role-dropdown ${dropdownOpen ? 'open' : ''}`}>
              <div className="role-dropdown-title">{t('nav.signInAs')}</div>

              {[
                { url: APP_URLS.company + '/sign-in', icon: '🏢', label: t('hero.companyRole'), sub: 'Company account', style: 'navy' },
                { url: APP_URLS.conseiller + '/sign-in', icon: '👤', label: t('hero.advisorRole'), sub: 'Team member', style: 'gold' },
                { url: APP_URLS.admin + '/sign-in', icon: '💰', label: t('hero.financialManager'), sub: 'Team member', style: 'gold' },
                { url: APP_URLS.superadmin + '/sign-in', icon: '🛡️', label: t('hero.supervisor'), sub: 'Platform admin', style: 'navy' },
              ].map(role => (
                <div key={role.url} className="role-item" onClick={() => handleRoleClick(role.url)}>
                  <div className={`role-icon ${role.style}`}>{role.icon}</div>
                  <div>
                    <div className="role-label">{role.label}</div>
                    <div className="role-sub">{role.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn primary" onClick={() => onOpenModal('getStarted')}>
            {t('nav.getStarted')}
          </button>
        </div>
      </nav>
    </header>
  );
}