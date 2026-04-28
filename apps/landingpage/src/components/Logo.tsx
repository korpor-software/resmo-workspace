interface LogoProps {
  variant?: 'dark' | 'light';
  height?: number;
  showTagline?: boolean;
}

export default function Logo({ variant = 'dark', height = 44, showTagline = true }: LogoProps) {
  const primary = variant === 'dark' ? '#1e3a5f' : '#4a7fb5';
  const gold = '#c9a227';

  return (
    <svg
      height={height}
      viewBox="0 0 220 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="6,26 28,6 50,26" fill={primary} />
      <rect x="34" y="9" width="6" height="9" fill={primary} />
      <rect x="9" y="24" width="38" height="24" fill={primary} />
      <rect x="14" y="28" width="9" height="9" fill={gold} rx="1" />
      <rect x="27" y="30" width="12" height="18" fill={gold} rx="1" />
      <text x="58" y="34" fontFamily="Sora,sans-serif" fontWeight="800" fontSize="26" fill={primary} letterSpacing="-0.5">RES</text>
      <text x="109" y="34" fontFamily="Sora,sans-serif" fontWeight="800" fontSize="26" fill={gold} letterSpacing="-0.5">MO</text>
      {showTagline && (
        <text x="58" y="48" fontFamily="DM Sans,sans-serif" fontWeight="500" fontSize="9.5" fill="#7a8aaa" letterSpacing="2">REAL ESTATE MANAGEMENT</text>
      )}
    </svg>
  );
}
