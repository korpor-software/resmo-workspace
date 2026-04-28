import { ModalId } from '../types';
import { useLandingLocale } from '../context/locale-provider';

interface HeroProps {
  onOpenModal: (id: ModalId) => void;
  onOpenChooseRoleDirect: () => void;
}

export default function Hero({ onOpenModal, onOpenChooseRoleDirect }: HeroProps) {
  const { t } = useLandingLocale();
  return (
    <div className="hero reveal">
      <div className="hero-eyebrow">{t('hero.eyebrow')}</div>
      <h1>{t('hero.title')}</h1>
      <p className="hero-sub">{t('hero.subtitle')}</p>
      <div className="hero-ctas">
        <button className="cta-company" onClick={() => onOpenModal('companySignup')}>
          🏢 {t('hero.company')}
        </button>
        <button className="cta-advisor" onClick={onOpenChooseRoleDirect}>
          👤 {t('hero.advisor')}
        </button>
      </div>
      <div className="hero-roles">
        <span className="role-pill"><span className="navy"></span>{t('hero.supervisor')}</span>
        <span className="role-pill"><span className="navy"></span>{t('hero.companyRole')}</span>
        <span className="role-pill"><span className="gold"></span>{t('hero.financialManager')}</span>
        <span className="role-pill"><span className="gold"></span>{t('hero.advisorRole')}</span>
      </div>
    </div>
  );
}