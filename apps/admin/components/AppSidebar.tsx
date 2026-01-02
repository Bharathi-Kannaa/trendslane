'use client';
import React from 'react';
import {
  Home,
  Package,
  Heart,
  User,
  Settings,
  Bell,
  HelpCircle,
  ChevronUp,
  Projector,
  Plus,
  PanelsTopLeft,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@workspace/ui/components/sidebar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/collapsible';
import Image from 'next/image';
import { useClerkDetails } from '@/hooks/use-clerk-details';
import { Typography } from '@workspace/ui/components/typography';
import { setLocaleCookies } from '@/app/actions/set-locale-cookies';
import { RoleSkeleton } from './skeletons/RoleSkeleton';
import ListSkeleton from './skeletons/ListSkeleton';
import { mapLanguageToCountry } from '@workspace/types';

export const navLinks = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Banner Image',
    url: '/banner-image',
    icon: ImageIcon,
  },
  {
    title: 'Home Banner Image',
    url: '/home-banner-image',
    icon: PanelsTopLeft,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: Package,
  },
  {
    title: 'Wishlist',
    url: '/wishlist',
    icon: Heart,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
  },
  {
    title: 'Help',
    url: '/help',
    icon: HelpCircle,
  },
];

const AppSidebar = () => {
  const { role, userCountry, fallbackName, fullName, imageUrl, signOut } = useClerkDetails();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/' className='flex items-center'>
                <Image
                  src='/logo.svg'
                  width={100}
                  height={20}
                  alt='Trendslane'
                  className='h-5 dark:invert'
                />
                {role ? (
                  <p className='text-xs text-muted-foreground capitalize'>{role}</p>
                ) : (
                  <RoleSkeleton />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.title === 'Notifications' && <SidebarMenuBadge>3</SidebarMenuBadge>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className='sr-only'>Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/#'>
                    <Projector />
                    See All Projects
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/#'>
                    <Plus />
                    Add Project
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible className='group/collapsible' open>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>Countries</CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userCountry ? (
                    <>
                      {userCountry?.map((country) => (
                        <SidebarMenuButton key={country} asChild>
                          <SidebarMenuItem className='w-full'>
                            <Link
                              href={'#'}
                              className='w-full'
                              onClick={async () => {
                                await setLocaleCookies(country, mapLanguageToCountry(country));
                              }}
                            >
                              <Typography>{country}</Typography>
                            </Link>
                          </SidebarMenuItem>
                        </SidebarMenuButton>
                      ))}
                    </>
                  ) : (
                    <ListSkeleton />
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* NESTED */}
        <SidebarGroup>
          <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/#'>
                    <Projector />
                    See All Projects
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Project
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Category
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className='size-4'>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>{fallbackName}</AvatarFallback>
                  </Avatar>
                  {fullName} <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
