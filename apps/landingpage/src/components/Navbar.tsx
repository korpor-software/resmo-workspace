import { useState } from 'react';
import Logo from './Logo';
import { ModalId } from '../types';
import { APP_URLS } from '../config';

interface NavbarProps {
  onOpenModal: (id: ModalId) => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <nav className="nav" onClick={() => setDropdownOpen(false)}>
        <a href="#" className="logo">
          <Logo height={44} showTagline={true} />
        </a>

        <div className="menu">
          <a href="#" className="active">Home</a>
          <a href="#services">Services</a>
          <a href="#plans">Plans</a>
        </div>

        <div className="nav-right">
          <div className="signin-trigger">
            <button className="btn ghost" onClick={handleSignInClick}>
              Sign In ▾
            </button>

            <div className={`role-dropdown ${dropdownOpen ? 'open' : ''}`}>
              <div className="role-dropdown-title">Sign in as</div>

              {[
                { url: APP_URLS.company + '/sign-in',    icon: '🏢', label: 'Company',           sub: 'Agency account',  style: 'navy' },
                { url: APP_URLS.admin + '/sign-in',      icon: '👤', label: 'Financial Manager', sub: 'Team member',     style: 'gold' },
                { url: APP_URLS.conseiller + '/sign-in', icon: '👤', label: 'Advisor',            sub: 'Team member',     style: 'gold' },
                { url: APP_URLS.superadmin + '/sign-in', icon: '🛡️', label: 'Supervisor',         sub: 'Platform admin',  style: 'navy' },
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
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}