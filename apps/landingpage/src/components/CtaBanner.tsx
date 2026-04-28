import { ModalId } from '../types';
import { APP_URLS } from '../config';

interface CtaBannerProps {
  onOpenModal: (id: ModalId) => void;
  onOpenChooseRoleDirect: () => void;
}

export default function CtaBanner({ onOpenModal: _onOpenModal, onOpenChooseRoleDirect }: CtaBannerProps) {
  return (
    <div className="cta-banner reveal">
      <div>
        <h2>Ready to transform your real estate operations?</h2>
        <p>Join thousands of agencies already using RESMO to centralize, automate, and grow their business.</p>
      </div>
      <div className="cta-banner-btns">
        <button className="btn gold" onClick={() => (window.location.href = APP_URLS.company + '/sign-up')}>
          Start as a Company
        </button>
        <button
          className="btn ghost"
          style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}
          onClick={onOpenChooseRoleDirect}
        >
          Join as Advisor/Manager
        </button>
      </div>
    </div>
  );
}
