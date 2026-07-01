import React from 'react';

type BadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'teal' | 'purple' | 'orange' | 'gray';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'badge-green',
  red: 'badge-red',
  amber: 'badge-amber',
  blue: 'badge-blue',
  teal: 'badge-teal',
  purple: 'badge-purple',
  orange: 'badge-orange',
  gray: 'bg-secondary text-secondary-foreground',
};

export default function Badge({ variant = 'gray', children, className = '', dot = false }: BadgeProps) {
  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  );
}