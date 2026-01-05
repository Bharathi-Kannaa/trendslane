import React from 'react';
import { cookies } from 'next/headers';
import { Dialog, DialogTrigger } from '@workspace/ui/components/dialog';
import { Button } from '@workspace/ui/components/button';
import { Typography } from '@workspace/ui/components/typography';
import { ArrowRight } from 'lucide-react';
import CountryAndLanguageSelector from '../CountryAndLanguageSelector/country-and-lang-selector';
import NavLink from '../Navbar/nav-link';
const footerLinks = [
  { href: '/help', label: 'Help' },
  { href: '/company', label: 'Company' },
  { href: '/outlet', label: 'Mango Outlet' },
  { href: '/gift-voucher', label: 'Gift Voucher' },
  { href: '/purchases', label: 'My purchases' },
  { href: '/work-for-mango', label: 'Work for Mango' },
  { href: '/sitemap', label: 'Site map' },
  { href: '/stores', label: 'Stores' },
  { href: '/returns', label: 'Returns' },
  { href: '/press', label: 'Press' },
  { href: '/responsibility', label: 'Responsibility' },
];

const Footer = async () => {
  const cookieStore = await cookies();
  const country = cookieStore.get('web.country')?.value;
  const lang = cookieStore.get('web.lang')?.value;

  return (
    <footer className='flex flex-col items-center gap-y-16 mt-10 px-8 py-8'>
      <div className='flex flex-col sm:w-fit sm:items-center gap-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='link'
              className='flex items-center w-full sm:w-fit justify-between  gap-4 m-0 p-0'
            >
              <Typography>{country?.toUpperCase()}</Typography>
              <span>
                <ArrowRight size={12} />
              </span>
            </Button>
          </DialogTrigger>
          <CountryAndLanguageSelector country={country!} lang={lang!} />
        </Dialog>
        <div>
          <ul className='flex sm:flex-row gap-8 flex-wrap '>
            <li>
              <NavLink href='www.fb.com' label='Instagram' />
            </li>
            <li>
              <NavLink href='www.fb.com' label='Facebook' />
            </li>
            <li>
              <NavLink href='www.fb.com' label='Youtube' />
            </li>
            <li>
              <NavLink href='www.fb.com' label='Spotify' />
            </li>
            <li>
              <NavLink href='www.fb.com' label='Pinterest' />
            </li>
            <li>
              <NavLink href='www.fb.com' label='X' />
            </li>
            <li>
              <NavLink href='www.fb.com' label='LinkedIn' />
            </li>
          </ul>
        </div>
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
        {footerLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
      <div className='flex justify-between py-10 flex-col gap-4 lg:flex-row  w-full'>
        <ul className='flex flex-col sm:flex-row gap-4'>
          <li>
            <NavLink href='/privacy-policy' label='Privacy policy and cookies' />
          </li>
          <li>
            <NavLink href='/terms' label='Terms and condition' />
          </li>
          <li>
            <NavLink href='/ethics' label='Ethics channel' />
          </li>
        </ul>
        <Typography className='normal-case'>
          © {new Date().getFullYear()} TRENDSLANE, All rights reserved
        </Typography>
      </div>
      <span className='text-muted-foreground'>Website designed by Bharathi Kannaa</span>
    </footer>
  );
};

export default Footer;
