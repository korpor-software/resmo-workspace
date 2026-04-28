import { APP_URLS } from '../config';
import { ModalId } from '../types';

interface HeroProps {
  onOpenModal: (id: ModalId) => void;
  onOpenChooseRoleDirect: () => void;
}

export default function Hero({ onOpenModal: _onOpenModal, onOpenChooseRoleDirect }: HeroProps) {
  return (
    <div className="hero reveal">
      <div className="hero-eyebrow">The all-in-one Real Estate Management Platform</div>
      <h1>Manage your agency with <span>intelligence</span> and precision.</h1>
      <p className="hero-sub">
        RESMO centralizes your CRM, operations, finance, marketing, and AI tools
        into one unified platform — built for real estate professionals.
      </p>
      <div className="hero-ctas">
        <button className="cta-company" onClick={() => window.location.href = APP_URLS.company + '/sign-up'}>
          🏢 Start as a Company
        </button>
        <button className="cta-advisor" onClick={onOpenChooseRoleDirect}>
          👤 Join as Advisor/Manager
        </button>
      </div>
      <div className="hero-roles">
        <span className="role-pill"><span className="navy"></span>Supervisor</span>
        <span className="role-pill"><span className="navy"></span>Company</span>
        <span className="role-pill"><span className="gold"></span>Financial Manager</span>
        <span className="role-pill"><span className="gold"></span>Advisor</span>
      </div>
    </div>
  );
}