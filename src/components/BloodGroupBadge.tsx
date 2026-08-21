import React from 'react';
import { BloodGroup } from '../types';

interface BloodGroupBadgeProps {
  group: BloodGroup;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'subtle';
  className?: string;
  onClick?: () => void;
}

export const BloodGroupBadge: React.FC<BloodGroupBadgeProps> = ({
  group,
  size = 'md',
  variant = 'solid',
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 font-bold',
    md: 'text-sm px-3 py-1 font-bold',
    lg: 'text-base px-4 py-1.5 font-extrabold',
    xl: 'text-xl px-5 py-2.5 font-black',
  };

  const variantClasses = {
    solid: 'bg-red-600 text-white shadow-sm shadow-red-900/20 hover:bg-red-700',
    outline: 'border-2 border-red-600 text-red-700 bg-red-50/70 hover:bg-red-100',
    subtle: 'bg-red-100 text-red-900 border border-red-200 font-extrabold',
  };

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg tracking-wide transition-all ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''} ${className}`}
    >
      {group}
    </span>
  );
};
