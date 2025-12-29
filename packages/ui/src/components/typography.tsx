import React from 'react';
import { cn } from '@workspace/ui/lib/utils';

type TypographyProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  normalCase?: boolean;
};

export const Typography = ({ children, className, onClick, normalCase }: TypographyProps) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'font-semibold uppercase text-sm tracking-normal',
        normalCase ? 'normal-case' : '',
        className,
      )}
    >
      {children}
    </span>
  );
};
