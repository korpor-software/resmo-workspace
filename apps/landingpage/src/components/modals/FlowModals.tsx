import Modal from './Modal';
import { ModalId } from '../../types';
import { APP_URLS } from '../../config';

// ── GetStarted Modal ─────────────────────────────────────────────
interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
}

export function GetStartedModal({ isOpen, onClose, onSwitch }: GetStartedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Get Started</h2>
      <p className="modal-sub">How would you like to join RESMO?</p>
      <div className="role-selector">
        <div className="role-opt" onClick={() => window.location.href = APP_URLS.company + '/sign-up'}>
          <div className="r-icon">🏢</div>
          <div className="r-label">Company</div>
          <div className="r-sub">Register your agency</div>
        </div>
        <div className="role-opt" onClick={() => onSwitch('getStarted', 'chooseRole')}>
          <div className="r-icon">👤</div>
          <div className="r-label">Advisor / Manager</div>
          <div className="r-sub">Join an existing company</div>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--muted)' }}>
        Supervisors are created by the platform admin.
      </p>
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Choose Your Role</h2>
      <p className="modal-sub">Select how you want to join the company.</p>

      <div className="role-selector">
        <div className="role-opt" onClick={() => window.location.href = APP_URLS.conseiller + '/sign-up'}>
          <div className="r-icon">👤</div>
          <div className="r-label">Advisor</div>
          <div className="r-sub">Manage clients &amp; listings</div>
        </div>
        <div className="role-opt" onClick={() => window.location.href = APP_URLS.admin + '/sign-up'}>
          <div className="r-icon">💰</div>
          <div className="r-label">Financial Manager</div>
          <div className="r-sub">Handle billing &amp; contracts</div>
        </div>
      </div>

      {showBack && (
        <div className="modal-footer">
          <a onClick={() => onSwitch('chooseRole', 'getStarted')}>← Go back</a>
        </div>
      )}
    </Modal>
  );
}