import { StatItem } from '../types';
import { useLandingLocale } from '../context/locale-provider';

export default function StatsBar() {
  const { t } = useLandingLocale();
  const STATS: StatItem[] = [
    { value: '12k+', label: t('stats.registeredCompanies') },
    { value: '98%', label: t('stats.satisfaction') },
    { value: '18k', label: t('stats.tasks') },
    { value: '€2.5M+', label: t('stats.transactions') },
  ];

  return (
    <div className="stats-bar reveal">
      {STATS.map((stat, i) => (
        <div key={i} className="stat-item">
          <strong>
            <em>{stat.value}</em>
          </strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
