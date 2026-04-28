import Modal from './Modal';
import PasswordField from './PasswordField';
import { ModalId } from '../../types';
import { APP_URLS } from '../../config';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
}

// ── Supervisor ──────────────────────────────────────────────────
export function SignInSupervisorModal({ isOpen, onClose }: SignInModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon navy" style={{ margin: '0 auto 18px' }}>🛡️</div>
      <h2>Supervisor Sign In</h2>
      <p className="modal-sub">Access the global management dashboard.</p>
      <div className="field">
        <label>Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="supervisor@resmo.com" />
        </div>
      </div>
      <PasswordField />
      <button
        className="form-submit navy-fill"
        onClick={() => window.location.href = APP_URLS.superadmin + '/sign-in'}
      >
        Sign In as Supervisor
      </button>
      <div className="modal-footer">
        Not a supervisor? <a onClick={onClose}>Go back</a>
      </div>
    </Modal>
  );
}

// ── Company ─────────────────────────────────────────────────────
export function SignInCompanyModal({ isOpen, onClose, onSwitch }: SignInModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon navy" style={{ margin: '0 auto 18px' }}>🏢</div>
      <h2>Company Sign In</h2>
      <p className="modal-sub">Access your agency's management portal.</p>
      <div className="field">
        <label>Company Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="company@agency.com" />
        </div>
      </div>
      <PasswordField />
      <button
        className="form-submit navy-fill"
        onClick={() => window.location.href = APP_URLS.company + '/sign-in'}
      >
        Sign In as Company
      </button>
      <div className="modal-footer">
        New here?{' '}
        <a onClick={() => onSwitch('signinCompany', 'companySignup')}>Create a company account</a>
      </div>
    </Modal>
  );
}

// ── Advisor ──────────────────────────────────────────────────────
export function SignInAdvisorModal({ isOpen, onClose, onSwitch }: SignInModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon gold" style={{ margin: '0 auto 18px' }}>👤</div>
      <h2>Advisor Sign In</h2>
      <p className="modal-sub">Access your personal workspace.</p>
      <div className="field">
        <label>Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="you@email.com" />
        </div>
      </div>
      <PasswordField />
      <button
        className="form-submit gold-fill"
        onClick={() => window.location.href = APP_URLS.conseiller + '/sign-in'}
      >
        Sign In
      </button>
      <div className="modal-footer">
        Don't have access yet?{' '}
        <a onClick={() => onSwitch('signinAdvisor', 'advisorSignup')}>Request access</a>
      </div>
    </Modal>
  );
}

// ── Financial Manager ────────────────────────────────────────────
export function SignInFinancialManagerModal({ isOpen, onClose, onSwitch }: SignInModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon gold" style={{ margin: '0 auto 18px' }}>👤</div>
      <h2>Financial Manager Sign In</h2>
      <p className="modal-sub">Access your personal workspace.</p>
      <div className="field">
        <label>Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="you@email.com" />
        </div>
      </div>
      <PasswordField />
      <button
        className="form-submit gold-fill"
        onClick={() => window.location.href = APP_URLS.admin + '/sign-in'}
      >
        Sign In
      </button>
      <div className="modal-footer">
        Don't have access yet?{' '}
        <a onClick={() => onSwitch('signinFinancialManager', 'advisorSignup')}>Request access</a>
      </div>
    </Modal>
  );
}