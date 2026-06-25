import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string; // Hex color or CSS color value
  gradient?: string; // Gradient background, e.g., 'linear-gradient(...)'
  variant?: 'solid' | 'outline';
  loading?: boolean;
  loadingText?: string;
}

export function Button({ 
  children, 
  color,
  gradient,
  variant = 'solid',
  loading = false, 
  loadingText = 'Loading...', 
  className = '', 
  style,
  ...props 
}: ButtonProps) {
  
  const customStyles: React.CSSProperties = {
    ...style,
  };
  
  let baseStyles = "w-full py-[11px] text-sm rounded-[10px] transition-all duration-200 flex items-center justify-center disabled:opacity-55 disabled:cursor-not-allowed ";
  
  if (variant === 'solid') {
    if (gradient) {
      customStyles.backgroundImage = gradient;
    } else if (color) {
      customStyles.backgroundColor = color;
    } else {
      // default color
      customStyles.backgroundColor = '#7C6FFF';
    }
    baseStyles += "text-white font-semibold hover:-translate-y-px hover:brightness-110 disabled:hover:translate-y-0 disabled:hover:brightness-100";
  } else if (variant === 'outline') {
    baseStyles += "bg-transparent border border-white/[0.10] hover:border-white/20 text-white/60 hover:text-white/90 font-medium";
  }

  return (
    <button 
      className={`${baseStyles} ${className}`}
      style={customStyles}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
