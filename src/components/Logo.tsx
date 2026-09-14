import React from 'react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'stacked' | 'horizontal' | 'icon' | string;
  theme?: 'light' | 'dark' | 'auto' | string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  onClick,
}) => {
  if (variant === 'stacked') {
    const heightClass =
      size === 'sm'
        ? 'h-16'
        : size === 'lg'
        ? 'h-32'
        : size === 'xl'
        ? 'h-44'
        : 'h-24';

    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title="JEV Asesoría Financiera"
      >
        <img
          src="/13046_JEV-Asesorias-finacieras_Logo.png"
          alt="Logo JEV Asesoría Financiera"
          referrerPolicy="no-referrer"
          className={`${heightClass} w-auto object-contain rounded-xl bg-[#131b2e] p-2 border border-[#334155]/60 shadow-md transition-transform duration-200 hover:scale-[1.02]`}
          style={{ backgroundColor: '#131b2e' }}
        />
      </div>
    );
  }

  // Horizontal variant for Navbar and top headers
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title="JEV Asesoría Financiera"
    >
      <img
        src="/logo-horizontal-oficial.png"
        alt="Logo JEV Asesoría Financiera"
        referrerPolicy="no-referrer"
        className="w-[43.0781px] h-[56px] bg-[#131b2e] object-contain rounded-lg p-1 border border-[#334155]/60 shadow-sm transition-transform duration-200 hover:scale-[1.02]"
        style={{
          width: '43.0781px',
          height: '56px',
          backgroundColor: '#131b2e',
        }}
      />
    </div>
  );
};
