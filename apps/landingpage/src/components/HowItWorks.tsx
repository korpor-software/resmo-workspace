import { HowStep } from '../types';
import { useLandingLocale } from '../context/locale-provider';

export default function HowItWorks() {
  const { t } = useLandingLocale();
  const STEPS: HowStep[] = [
    { num: '01', title: t('how.step1Title'), description: t('how.step1Desc') },
    { num: '02', title: t('how.step2Title'), description: t('how.step2Desc') },
    { num: '03', title: t('how.step3Title'), description: t('how.step3Desc') },
  ];

  return (
    <section>
      <div className="services-intro reveal">
        <div className="section-label">{t('how.label')}</div>
        <h2 className="section-heading">{t('how.title')}</h2>
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
