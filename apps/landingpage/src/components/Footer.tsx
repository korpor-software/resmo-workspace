import { useState } from 'react';
import Logo from './Logo';

type Lang = { code: string; label: string; dir: 'ltr' | 'rtl'; flag: string };

const LANGUAGES: Lang[] = [
  { code: 'en', label: 'English',  dir: 'ltr', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇹🇳' },
];

const FOOTER_LINKS = [
  ['FAQ', 'Investor Relations', 'Privacy Policy', 'Terms of Service'],
  ['Help Center', 'Careers', 'Cookie Preferences', 'Legal Notices'],
  ['My Account', 'How It Works', 'Corporate Information', 'Only on RESMO'],
  ['Media Center', 'Contact Us', 'Blog', 'Security'],
];

export default function Footer() {
  const [activeLang, setActiveLang] = useState<Lang>(LANGUAGES[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLangSelect = (lang: Lang) => {
    setActiveLang(lang);
    setMenuOpen(false);
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-contact">
          <a href="#">Questions? Contact us.</a>
        </div>

        <div className="footer-links">
          {FOOTER_LINKS.map((col, i) => (
            <div key={i}>
              {col.map(link => (
                <a key={link} href="#">{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Language picker */}
        <div className="lang-picker" style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
          <button
            className="footer-lang"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(prev => !prev); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, opacity: .7 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
            </svg>
            <span>{activeLang.label}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
              background: '#1a3050', border: '1px solid #2e4d6e', borderRadius: 10,
              minWidth: 160, overflow: 'hidden', zIndex: 999,
              boxShadow: '0 -12px 32px rgba(0,0,0,.3)',
            }}>
              {LANGUAGES.map(lang => (
                <div
                  key={lang.code}
                  onClick={() => handleLangSelect(lang)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '11px 16px', cursor: 'pointer',
                    fontSize: '.88rem',
                    color: activeLang.code === lang.code ? '#fff' : '#8fa8c8',
                    fontWeight: activeLang.code === lang.code ? 600 : 400,
                    background: 'transparent',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#22405f')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {activeLang.code === lang.code && (
                    <span style={{ marginLeft: 'auto', color: '#c9a227', fontSize: '.8rem' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <div className="footer-logo-row">
            <Logo variant="light" height={24} showTagline={false} />
            <span style={{ color: '#3a5878', fontSize: '.85rem' }}>Real Estate Management Platform</span>
          </div>
          <span className="footer-copy">© 2026 RESMO. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
