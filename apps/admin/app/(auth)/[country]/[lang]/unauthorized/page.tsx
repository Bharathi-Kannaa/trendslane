'use client';
import { LogOut } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@workspace/ui/components/empty';
import { useAuth } from '@clerk/nextjs';

const Unauthorized = () => {
  const { signOut } = useAuth();
  return (
    <Empty className='from-muted/50 to-background h-screen bg-gradient-to-b from-30%'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>403</EmptyMedia>
        <EmptyTitle>You don&apos;t have access</EmptyTitle>
        <EmptyDescription>
          This account doesn&apos;t have permission to access this page. Try signing out or contact
          your administrator for help.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='destructive' size='sm' onClick={() => signOut()}>
          <LogOut />
          Signout
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default Unauthorized;
