import Modal from './Modal';
import PasswordField from './PasswordField';
import { ModalId } from '../../types';

interface AdvisorSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
}

export default function AdvisorSignupModal({ isOpen, onClose, onSwitch }: AdvisorSignupModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon gold" style={{ margin: '0 auto 18px' }}>👤</div>
      <h2>Request Access</h2>
      <p className="modal-sub">Enter your details and select your company to request access.</p>

      <div className="field-row">
        <div className="field" style={{ margin: 0 }}>
          <label>First name</label>
          <div className="input-icon-wrap">
            <span className="ico">👤</span>
            <input type="text" placeholder="John" />
          </div>
        </div>
        <div className="field" style={{ margin: 0 }}>
          <label>Last name</label>
          <div className="input-icon-wrap">
            <span className="ico">👤</span>
            <input type="text" placeholder="Doe" />
          </div>
        </div>
      </div>

      <div className="field" style={{ marginTop: 14 }}>
        <label>Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="john@example.com" />
        </div>
      </div>

      <div className="field">
        <label>Company</label>
        <div className="input-icon-wrap">
          <span className="ico">🏢</span>
          <input type="text" placeholder="Start typing company name..." />
        </div>
        <div className="field-hint">Type to search for your company. You must select an existing company.</div>
      </div>

      <div className="field">
        <label>Role</label>
        <select defaultValue="">
          <option value="" disabled>Select your role</option>
          <option>Advisor</option>
          <option>Financial Manager</option>
        </select>
      </div>

      <PasswordField />
      <PasswordField label="Confirm password" />

      <button className="form-submit gold-fill">Request Access</button>
      <div className="modal-footer">
        Already have an account?{' '}
        <a onClick={() => onSwitch('advisorSignup', 'signinAdvisor')}>Sign in</a>
      </div>
    </Modal>
  );
}
