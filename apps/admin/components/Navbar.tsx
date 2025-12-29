'use client';
import Link from 'next/link';
import React from 'react';
import { LogOut, Moon, Settings, Sun, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { useTheme } from 'next-themes';
import { Button } from '@workspace/ui/components/button';
import { SidebarTrigger } from '@workspace/ui/components/sidebar';
import { useClerkDetails } from '@/hooks/use-clerk-details';

const Navbar = () => {
  const { setTheme } = useTheme();
  const { fallbackName, imageUrl, signOut } = useClerkDetails();

  return (
    <nav className='p-4 flex items-center justify-between sticky top-0 z-10 bg-background'>
      <SidebarTrigger />
      <div className='flex items-center gap-4'>
        <Link href='/'>Dashboard</Link>
        {/* Theme Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
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
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{fallbackName}</AvatarFallback>
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
            <DropdownMenuItem variant='destructive' onClick={() => signOut()}>
              <LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
