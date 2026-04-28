import { StatItem } from '../types';

const STATS: StatItem[] = [
  { value: '12k+', label: 'Registered Companies' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '18k', label: 'AI Tasks Generated' },
  { value: '€2.5M+', label: 'Transactions Managed' },
];

export default function StatsBar() {
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
