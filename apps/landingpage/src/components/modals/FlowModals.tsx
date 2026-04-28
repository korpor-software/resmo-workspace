import Modal from './Modal';
import { ModalId } from '../../types';
import { APP_URLS } from '../../config';
import { useLandingLocale } from '../../context/locale-provider';

// ── GetStarted Modal ─────────────────────────────────────────────
interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
}

export function GetStartedModal({ isOpen, onClose, onSwitch }: GetStartedModalProps) {
  const { t } = useLandingLocale();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>{t('modal.getStartedTitle')}</h2>
      <p className="modal-sub">{t('modal.getStartedSubtitle')}</p>
      <div className="role-selector">
        <div className="role-opt" onClick={() => onSwitch('getStarted', 'companySignup')}>
          <div className="r-icon">🏢</div>
          <div className="r-label">{t('modal.companyLabel')}</div>
          <div className="r-sub">{t('modal.companySub')}</div>
        </div>
        <div className="role-opt" onClick={() => onSwitch('getStarted', 'chooseRole')}>
          <div className="r-icon">👤</div>
          <div className="r-label">{t('modal.advisorLabel')}</div>
          <div className="r-sub">{t('modal.advisorSub')}</div>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--muted)' }}>{t('modal.supervisorText')}</p>
    </Modal>
  );
}

// ── ChooseRole Modal ─────────────────────────────────────────────
interface ChooseRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
  showBack: boolean;
}

export function ChooseRoleModal({ isOpen, onClose, onSwitch, showBack }: ChooseRoleModalProps) {
  const { t } = useLandingLocale();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>{t('modal.chooseRoleTitle')}</h2>
      <p className="modal-sub">{t('modal.chooseRoleSubtitle')}</p>

      <div className="role-selector">
        <div className="role-opt" onClick={() => window.location.href = APP_URLS.conseiller + '/sign-up'}>
          <div className="r-icon">👤</div>
          <div className="r-label">{t('modal.advisorRoleLabel')}</div>
          <div className="r-sub">{t('modal.advisorRoleSub')}</div>
        </div>
        <div className="role-opt" onClick={() => window.location.href = APP_URLS.admin + '/sign-up'}>
          <div className="r-icon">💰</div>
          <div className="r-label">{t('modal.financialRoleLabel')}</div>
          <div className="r-sub">{t('modal.financialRoleSub')}</div>
        </div>
      </div>

      {showBack && (
        <div className="modal-footer">
          <a onClick={() => onSwitch('chooseRole', 'getStarted')}>{t('modal.goBack')}</a>
        </div>
      )}
    </Modal>
  );
}