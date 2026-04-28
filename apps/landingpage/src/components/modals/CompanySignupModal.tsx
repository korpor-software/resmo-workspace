import { useState } from 'react';
import Modal from './Modal';
import PasswordField from './PasswordField';
import { ModalId } from '../../types';

interface CompanySignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (from: ModalId, to: ModalId) => void;
}

type PlanOption = 'starter' | 'professional' | 'enterprise';

interface PlanChoice {
  id: PlanOption;
  name: string;
  desc: string;
  price: string;
}

const PLAN_OPTIONS: PlanChoice[] = [
  { id: 'starter',      name: 'Starter',      desc: 'Up to 3 advisors · 50 listings',    price: '$49/mo'  },
  { id: 'professional', name: 'Professional', desc: 'Up to 15 advisors · Automation',     price: '$129/mo' },
  { id: 'enterprise',   name: 'Enterprise',   desc: 'Unlimited · AI tools · Website',     price: '$299/mo' },
];

export default function CompanySignupModal({ isOpen, onClose, onSwitch }: CompanySignupModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>('starter');

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={480}>
      <div className="modal-icon navy" style={{ margin: '0 auto 18px' }}>🏢</div>
      <h2>Create Company Account</h2>
      <p className="modal-sub">Register your agency and choose a plan.</p>

      <div className="field-row">
        <div className="field" style={{ margin: 0 }}>
          <label>First name</label>
          <input type="text" placeholder="John" />
        </div>
        <div className="field" style={{ margin: 0 }}>
          <label>Last name</label>
          <input type="text" placeholder="Doe" />
        </div>
      </div>

      <div className="field" style={{ marginTop: 14 }}>
        <label>Company / Agency name</label>
        <div className="input-icon-wrap">
          <span className="ico">🏢</span>
          <input type="text" placeholder="Acme Real Estate" />
        </div>
      </div>

      <div className="field">
        <label>Email</label>
        <div className="input-icon-wrap">
          <span className="ico">✉</span>
          <input type="email" placeholder="contact@agency.com" />
        </div>
      </div>

      <PasswordField />

      <div className="field"><label>Choose your plan</label></div>
      <div className="plan-picker">
        {PLAN_OPTIONS.map(plan => (
          <div
            key={plan.id}
            className={`plan-opt ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div>
              <div className="plan-opt-name">{plan.name}</div>
              <div className="plan-opt-desc">{plan.desc}</div>
            </div>
            <div className="plan-opt-price">{plan.price}</div>
          </div>
        ))}
      </div>

      <button className="form-submit navy-fill">Create Company Account</button>
      <div className="modal-footer">
        Already have an account?{' '}
        <a onClick={() => onSwitch('companySignup', 'signinCompany')}>Sign in</a>
      </div>
    </Modal>
  );
}
