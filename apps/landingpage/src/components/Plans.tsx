import { Plan, ModalId } from '../types';
import { APP_URLS } from '../config';

interface PlansProps {
  onOpenModal: (id: ModalId) => void;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'For small agencies taking their first steps into digital management.',
    price: 49,
    period: '/mo',
    buttonLabel: 'Get Started',
    buttonStyle: 'outlined',
    features: [
      { text: 'Up to 3 advisors', included: true },
      { text: '50 property listings', included: true },
      { text: 'Basic CRM tools', included: true },
      { text: 'Email support', included: true },
      { text: 'Marketing automation', included: false },
      { text: 'AI-assisted tools', included: false },
      { text: 'Website builder', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    desc: 'For growing agencies that need automation, analytics, and scale.',
    price: 129,
    period: '/mo',
    buttonLabel: 'Get Started',
    buttonStyle: 'gold-fill',
    featured: true,
    features: [
      { text: 'Up to 15 advisors', included: true },
      { text: 'Unlimited listings', included: true },
      { text: 'Full CRM + lead tracking', included: true },
      { text: 'Marketing automation', included: true },
      { text: 'Reports & dashboards', included: true },
      { text: 'Priority support', included: true },
      { text: 'AI-assisted tools', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'Full platform with AI tools, website builder, and dedicated support.',
    price: 299,
    period: '/mo',
    buttonLabel: 'Contact Sales',
    buttonStyle: 'navy-fill',
    features: [
      { text: 'Unlimited advisors', included: true },
      { text: 'Unlimited listings', included: true },
      { text: 'Full CRM + analytics', included: true },
      { text: 'Marketing automation', included: true },
      { text: 'AI-assisted tools', included: true },
      { text: 'Website builder module', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
  },
];

export default function Plans({ onOpenModal: _onOpenModal }: PlansProps) {
  return (
    <section id="plans">
      <div className="services-intro reveal" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
        <h2 className="section-heading">Plans for every team, every size.</h2>
      </div>

      <div className="plans-tabs">
        <button className="tab-btn active">🏢 Company Plans</button>
      </div>

      <div className="plans-panel active">
        {PLANS.map(plan => (
          <article key={plan.id} className={`plan-card reveal${plan.featured ? ' featured' : ''}`}>
            {plan.featured && <span className="plan-badge">Most Popular</span>}
            <p className="plan-name">{plan.name}</p>
            <p className="plan-desc">{plan.desc}</p>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="amount">{plan.price}</span>
              <span className="period">{plan.period}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i} className={f.included ? '' : 'no'}>{f.text}</li>
              ))}
            </ul>
            <button
              className={`plan-btn ${plan.buttonStyle}`}
              onClick={() => (window.location.href = APP_URLS.company + '/sign-up')}
            >
              {plan.buttonLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
