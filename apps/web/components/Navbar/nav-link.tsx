import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { Typography } from '@workspace/ui/components/typography';

type NavLinkProps = {
  href: string;
  label: string;
  underline?: boolean;
  hoverNoColorChange?: boolean;
  labelSize?: 'sm' | 'md' | 'lg';
  className?: string;
  linkClass?: string;
};

const NavLink = ({
  href,
  label,
  underline = true,
  hoverNoColorChange = false,
  labelSize,
  className,
  linkClass,
}: NavLinkProps) => {
  return (
    <Link
      prefetch
      href={href}
      className={cn(
        'relative no-underline text-sm',
        hoverNoColorChange
          ? 'hover:underline hover:decoration-1 hover:underline-offset-4'
          : underline &&
              'hover:underline hover:decoration-1 hover:underline-offset-4 hover:text-muted-foreground',
        linkClass,
      )}
    >
      <Typography
        className={cn(
          labelSize === 'sm' ? 'text-xs ' : '',
          className,
          // textCase === 'normal'
          // 	? 'normal-case'
          // 	: textCase === 'lowercase'
          // 	? 'lowercase'
          // 	: 'uppercase'
        )}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavLink;
