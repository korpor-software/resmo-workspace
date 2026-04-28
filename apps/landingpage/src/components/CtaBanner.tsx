import { ModalId } from '../types';
import { useLandingLocale } from '../context/locale-provider';

interface CtaBannerProps {
  onOpenModal: (id: ModalId) => void;
  onOpenChooseRoleDirect: () => void;
}

export default function CtaBanner({ onOpenModal, onOpenChooseRoleDirect }: CtaBannerProps) {
  const { t } = useLandingLocale();
  return (
    <div className="cta-banner reveal">
      <div>
        <h2>{t('cta.title')}</h2>
        <p>{t('cta.subtitle')}</p>
      </div>
      <div className="cta-banner-btns">
        <button className="btn gold" onClick={() => onOpenModal('companySignup')}>
          {t('cta.company')}
        </button>
        <button
          className="btn ghost"
          style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}
          onClick={onOpenChooseRoleDirect}
        >
          {t('cta.advisor')}
        </button>
      </div>
    </div>
  );
}
