'use client';

import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Typography } from '@workspace/ui/components/typography';
import { Button } from '@workspace/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import Image from 'next/image';
import NavLink from './nav-link';
import ProfileButton from './profile-button';

const Navbar = () => {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 bg-background  w-full isolate overflow-hidden'>
      <div className='relative flex items-center justify-between h-14 pl-8 pr-8'>
        {/* Left */}
        <div className='flex items-center flex-1'>
          <ul className='flex items-center gap-5 list-none'>
            <li>
              <NavLink href='/h/women' label='Women' />
            </li>
            <li>
              <NavLink href='/h/men' label='Men' />
            </li>
            <li>
              <NavLink href='/h/teen' label='Teen' />
            </li>
            <li>
              <NavLink href='/h/kids' label='Kids' />
            </li>
          </ul>
        </div>

        {/* Center */}
        <Link href='/' className='flex items-center justify-center  h-full m-0'>
          <Image
            src='/logo.svg'
            width={200}
            height={100}
            alt='Trendslane'
            className='dark:invert'
          />
        </Link>

        {/* Right */}
        <div className='flex items-center justify-end flex-1 gap-6'>
          <ul className='flex items-center gap-5 list-none'>
            <li>
              <NavLink href='/search/women' label='Search' />
            </li>

            <li>
              <NavLink href='/wishlist' label='Wishlist' />
            </li>

            <li>
              <Link href='/'>
                <Button
                  size='sm'
                  tabIndex={-1}
                  variant='link'
                  className='font-semibold uppercase text-sm hover:text-muted-foreground cursor-pointer'
                >
                  <Typography>Bag (2)</Typography>
                </Button>
              </Link>
            </li>
            {/* Popover Login */}
            <li className='mt-2'>
              <SignedOut>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='link'
                      className='font-semibold hover:text-muted-foreground p-0 mb-2'
                    >
                      LOG IN
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent onFocusOutside={() => setOpen(false)} className='w-100 mt-2'>
                    <div className='flex gap-4 flex-col'>
                      <SignInButton mode='modal'>
                        <Button className='w-full font-semibold'>Sign in</Button>
                      </SignInButton>
                      <div className='flex items-center justify-center gap-2'>
                        <Typography className='capitalize font-normal text-muted-foreground'>
                          Don&lsquo;t have an account?
                        </Typography>
                        <SignUpButton mode='modal'>
                          <Button className='p-0 underline' variant='link'>
                            Register
                          </Button>
                        </SignUpButton>
                      </div>
                      <div className='w-full'>
                        <ul className='flex flex-col gap-2'>
                          <li className='flex items-center justify-between'>
                            <Button asChild variant='link'>
                              <NavLink href='/my-purchase' label='My purchase' />
                            </Button>
                            <ArrowRight size={12} />
                          </li>
                          <li className='flex items-center justify-between'>
                            <Button asChild variant='link'>
                              <NavLink href='/help' label='Help' />
                            </Button>
                            <ArrowRight size={12} />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </SignedOut>
              <Suspense fallback={<>Loading</>}>
                <SignedIn>
                  <ProfileButton />
                </SignedIn>
              </Suspense>
            </li>
          </ul>

          {/* User Menu */}
          {/* <DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage
									src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
									alt='avatar'
								/>
								<AvatarFallback>RG</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent sideOffset={10}>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className='h-[1.2rem] w-[1.2rem] mr-2' />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem variant='destructive'>
								<LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu> */}

          {/* Theme Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='border-0' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
