import { Plan, ModalId } from '../types';
import { useLandingLocale } from '../context/locale-provider';

interface PlansProps {
  onOpenModal: (id: ModalId) => void;
}

export default function Plans({ onOpenModal }: PlansProps) {
  const { t } = useLandingLocale();
  const PLANS: Plan[] = [
    {
      id: 'starter',
      name: t('plans.starterName'),
      desc: t('plans.starterDesc'),
      price: 49,
      period: '/mo',
      buttonLabel: t('plans.getStarted'),
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
      name: t('plans.professionalName'),
      desc: t('plans.professionalDesc'),
      price: 129,
      period: '/mo',
      buttonLabel: t('plans.getStarted'),
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
      name: t('plans.enterpriseName'),
      desc: t('plans.enterpriseDesc'),
      price: 299,
      period: '/mo',
      buttonLabel: t('plans.contactSales'),
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

  return (
    <section id="plans">
      <div className="services-intro reveal" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>{t('plans.label')}</div>
        <h2 className="section-heading">{t('plans.title')}</h2>
      </div>

      <div className="plans-tabs">
        <button className="tab-btn active">🏢 {t('plans.companyPlans')}</button>
      </div>

      <div className="plans-panel active">
        {PLANS.map(plan => (
          <article key={plan.id} className={`plan-card reveal${plan.featured ? ' featured' : ''}`}>
            {plan.featured && <span className="plan-badge">{t('plans.mostPopular')}</span>}
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
              onClick={() => onOpenModal('companySignup')}
            >
              {plan.buttonLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
