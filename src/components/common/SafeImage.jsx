import { useState } from 'react';

const DEFAULT_STYLE = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

export default function SafeImage({ src, alt = '', style, className }) {
  const [errored, setErrored] = useState(false);
  const mergedStyle = { ...DEFAULT_STYLE, ...style };

  if (errored || !src) {
    return (
      <div
        className={className}
        style={{ ...mergedStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1EEE8' }}
        role="img"
        aria-label={alt}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#B9B3A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="m21 15-5-5-9 9" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={mergedStyle}
      onError={() => setErrored(true)}
    />
  );
}
