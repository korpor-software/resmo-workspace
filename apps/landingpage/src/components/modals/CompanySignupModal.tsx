import Modal from './Modal';
import { APP_URLS } from '../../config';

interface CompanySignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanySignupModal({ isOpen, onClose }: CompanySignupModalProps) {
  const handleGetStarted = () => {
    window.location.href = `${APP_URLS.company}/sign-up`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={520}>
      <div className="modal-icon navy" style={{ margin: '0 auto 18px' }}>🏢</div>
      <h2>Create Company Account</h2>
      <p className="modal-sub">Complete your registration to get started with Resmo.</p>

      <div style={{ marginTop: 28, marginBottom: 28 }}>
        <p style={{ textAlign: 'center', color: '#666', lineHeight: 1.6 }}>
          Choose your plan and fill in your company details in the next step. It only takes a few minutes.
        </p>
      </div>

      <button
        className="form-submit navy-fill"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
      <div className="modal-footer">
        Already have an account?{' '}
        <a onClick={() => window.location.href = APP_URLS.company + '/sign-in'}>Sign in</a>
      </div>
    </Modal>
  );
}
