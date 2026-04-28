import Logo from './Logo';
import { useLandingLocale } from '../context/locale-provider';

const FOOTER_LINKS = [
  ['FAQ', 'Investor Relations', 'Privacy Policy', 'Terms of Service'],
  ['Help Center', 'Careers', 'Cookie Preferences', 'Legal Notices'],
  ['My Account', 'How It Works', 'Corporate Information', 'Only on RESMO'],
  ['Media Center', 'Contact Us', 'Blog', 'Security'],
];

export default function Footer() {
  const { t } = useLandingLocale();

  return (
    <footer>
      <div className="container">
        <div className="footer-contact">
          <a href="#">{t('footer.contact')}</a>
        </div>

        <div className="footer-links">
          {FOOTER_LINKS.map((col, i) => (
            <div key={i}>
              {col.map(link => (
                <a key={link} href="#">{link}</a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-logo-row">
            <Logo variant="light" height={24} showTagline={false} />
            <span className="footer-platform">{t('footer.platform')}</span>
          </div>
          <span className="footer-copy">{t('footer.copyright')}</span>
        </div>
      </div>
    </footer>
  );
}
