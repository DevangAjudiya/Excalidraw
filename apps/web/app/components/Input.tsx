import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11.5px] font-medium text-white/40 uppercase tracking-[0.06em] mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-white/[0.04] border border-white/[0.09] rounded-[10px] px-3.5 py-[11px] text-sm text-[#e9e8ff] placeholder-white/20 outline-none transition-all duration-150 focus:border-[#7C6FFF]/55 focus:ring-[3px] focus:ring-[#7C6FFF]/10"
        {...props}
      />
    </div>
  );
}
