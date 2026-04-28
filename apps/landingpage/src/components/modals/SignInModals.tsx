import Modal from './Modal';
import PasswordField from './PasswordField';
import { ModalId } from '../../types';
import { APP_URLS } from '../../config';
import { useLandingLocale } from '../../context/locale-provider';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
}

// ── Supervisor ──────────────────────────────────────────────────
export function SignInSupervisorModal({ isOpen, onClose }: SignInModalProps) {
  const { t } = useLandingLocale();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon navy" style={{ margin: '0 auto 18px' }}>🛡️</div>
      <h2>{t('modal.signInSupervisorTitle')}</h2>
      <p className="modal-sub">{t('modal.signInSupervisorSubtitle')}</p>
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
        {t('modal.signInSupervisorButton')}
      </button>
      <div className="modal-footer">
        {t('modal.newHere')} <a onClick={onClose}>{t('modal.goBack')}</a>
      </div>
    </Modal>
  );
}

// ── Company ─────────────────────────────────────────────────────
export function SignInCompanyModal({ isOpen, onClose, onSwitch }: SignInModalProps) {
  const { t } = useLandingLocale();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon navy" style={{ margin: '0 auto 18px' }}>🏢</div>
      <h2>{t('modal.signInCompanyTitle')}</h2>
      <p className="modal-sub">{t('modal.signInCompanySubtitle')}</p>
      <div className="field">
        <label>Company Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="company@business.com" />
        </div>
      </div>
      <PasswordField />
      <button
        className="form-submit navy-fill"
        onClick={() => window.location.href = APP_URLS.company + '/sign-in'}
      >
        {t('modal.signInCompanyButton')}
      </button>
      <div className="modal-footer">
        {t('modal.newHere')}{' '}
        <a onClick={() => onSwitch('signinCompany', 'companySignup')}>{t('modal.createCompany')}</a>
      </div>
    </Modal>
  );
}

// ── Advisor ──────────────────────────────────────────────────────
export function SignInAdvisorModal({ isOpen, onClose, onSwitch }: SignInModalProps) {
  const { t } = useLandingLocale();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon gold" style={{ margin: '0 auto 18px' }}>👤</div>
      <h2>{t('modal.signInAdvisorTitle')}</h2>
      <p className="modal-sub">{t('modal.signInAdvisorSubtitle')}</p>
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
        {t('modal.signInAdvisorButton')}
      </button>
      <div className="modal-footer">
        {t('modal.dontHaveAccess')}{' '}
        <a onClick={() => onSwitch('signinAdvisor', 'advisorSignup')}>{t('modal.requestAccess')}</a>
      </div>
    </Modal>
  );
}

// ── Financial Manager ────────────────────────────────────────────
export function SignInFinancialManagerModal({ isOpen, onClose, onSwitch }: SignInModalProps) {
  const { t } = useLandingLocale();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon gold" style={{ margin: '0 auto 18px' }}>👤</div>
      <h2>{t('modal.signInFinancialTitle')}</h2>
      <p className="modal-sub">{t('modal.signInFinancialSubtitle')}</p>
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
        {t('modal.signInFinancialButton')}
      </button>
      <div className="modal-footer">
        {t('modal.dontHaveAccess')}{' '}
        <a onClick={() => onSwitch('signinFinancialManager', 'advisorSignup')}>{t('modal.requestAccess')}</a>
      </div>
    </Modal>
  );
}