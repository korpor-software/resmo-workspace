import { HowStep } from '../types';

const STEPS: HowStep[] = [
  {
    num: '01',
    title: 'Company Signs Up & Chooses a Plan',
    description: 'The company registers, selects a subscription plan, and configures their workspace — all in minutes.',
  },
  {
    num: '02',
    title: 'Advisors & Managers Request Access',
    description: 'Team members submit a join request linked to their company. The company reviews and approves their role.',
  },
  {
    num: '03',
    title: 'Everyone Works from One Platform',
    description: 'Each role gets a personalised dashboard — CRM for advisors, financials for managers, full control for the company.',
  },
];

export default function HowItWorks() {
  return (
    <section>
      <div className="services-intro reveal">
        <div className="section-label">How it works</div>
        <h2 className="section-heading">Get your agency running in three steps.</h2>
      </div>
      <div className="how-grid">
        {STEPS.map((step, i) => (
          <div key={i} className="how-card reveal">
            <div className="how-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
