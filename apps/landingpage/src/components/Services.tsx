import { ServiceCard } from '../types';
import { useLandingLocale } from '../context/locale-provider';

export default function Services() {
  const { t } = useLandingLocale();

  const SERVICES: ServiceCard[] = [
    { icon: '🤝', iconStyle: 'navy', title: t('services.crmTitle'), description: t('services.crmDesc'), tag: t('services.forAdvisorsCompanies') },
    { icon: '🏠', iconStyle: 'navy', title: t('services.propertyTitle'), description: t('services.propertyDesc'), tag: t('services.forAdvisorsCompanies') },
    { icon: '💰', iconStyle: 'gold', title: t('services.billingTitle'), description: t('services.billingDesc'), tag: t('services.forFinancialManagers') },
    { icon: '📣', iconStyle: 'gold', title: t('services.marketingTitle'), description: t('services.marketingDesc'), tag: t('services.forCompaniesAdvisors') },
    { icon: '✅', iconStyle: 'navy', title: t('services.workflowTitle'), description: t('services.workflowDesc'), tag: t('services.forAllRoles') },
    { icon: '🤖', iconStyle: 'gold', title: t('services.aiTitle'), description: t('services.aiDesc'), tag: t('services.forCompaniesAdvisors') },
  ];

  return (
    <section id="services">
      <div className="services-intro reveal">
        <div className="section-label">{t('services.label')}</div>
        <h2 className="section-heading">{t('services.title')}</h2>
        <p className="section-sub">{t('services.subtitle')}</p>
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
