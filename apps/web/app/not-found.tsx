import React from 'react';
import { Typography } from '@workspace/ui/components/typography';
import NavLink from '@/components/Navbar/nav-link';

const NotFound = () => {
  return (
    <div className='w-full items-center justify-center flex flex-col gap-4 h-dvh text-center'>
      <Typography>We’re sorry, that page doesn’t exist</Typography>
      <Typography normalCase>
        Ready to browse our collections and discover the astounding trends of the moment?
      </Typography>
      <NavLink href='/' label='Go Home' className='underline underline-offset-4' />
    </div>
  );
};

export default NotFound;
