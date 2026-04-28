import { ServiceCard } from '../types';

const SERVICES: ServiceCard[] = [
  {
    icon: '🤝', iconStyle: 'navy',
    title: 'CRM & Client Management',
    description: 'Centralize all client interactions — leads, buyers, sellers, tenants — with follow-up reminders, history tracking, and lead scoring.',
    tag: 'For Advisors & Companies',
  },
  {
    icon: '🏠', iconStyle: 'navy',
    title: 'Property Management',
    description: 'Create, organize, and monitor all listings for sale, rent, or investment. Filter, search, and track property status in a structured dashboard.',
    tag: 'For Advisors & Companies',
  },
  {
    icon: '💰', iconStyle: 'gold',
    title: 'Financial Management & Billing',
    description: 'Handle invoicing, payment tracking, contract management, and digital signatures — all with AI-assisted billing and transparent financial records.',
    tag: 'For Financial Managers',
  },
  {
    icon: '📣', iconStyle: 'gold',
    title: 'Marketing Automation',
    description: 'Publish listings to partner platforms automatically, run email and WhatsApp campaigns, and track performance across all channels from one dashboard.',
    tag: 'For Companies & Advisors',
  },
  {
    icon: '✅', iconStyle: 'navy',
    title: 'Productivity & Workflow Tools',
    description: 'Kanban boards, task assignments, calendar scheduling, and team collaboration tools keep every advisor and manager on track and accountable.',
    tag: 'For All Roles',
  },
  {
    icon: '🤖', iconStyle: 'gold',
    title: 'AI-Assisted Tools',
    description: 'Generate visual content, auto-prioritize leads, receive AI budget recommendations for digital ads, and automate publishing with our AI modules.',
    tag: 'For Companies & Advisors',
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="services-intro reveal">
        <div className="section-label">What we offer</div>
        <h2 className="section-heading">Everything your agency needs, in one place.</h2>
        <p className="section-sub">
          From client relationships to AI-powered marketing — RESMO handles the complexity
          so your team can focus on closing deals.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <article key={i} className="service-card reveal">
            <div className={`service-icon ${service.iconStyle}`}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-tag">{service.tag}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
