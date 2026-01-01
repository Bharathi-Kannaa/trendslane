import { useAuth, useUser } from '@clerk/nextjs';
import type { UseAuthReturn, UseUserReturn } from '@clerk/types';
import { Country, UserRole } from '@workspace/types';

type UseClerkDetailsReturn = {
  user: UseUserReturn;
  signOut: UseAuthReturn['signOut'];
  imageUrl?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  fallbackName: string;
  role?: UserRole;
  userCountry?: Country[];
};

export const useClerkDetails = (): UseClerkDetailsReturn => {
  const user = useUser();
  const { signOut } = useAuth();

  const imageUrl = user.user?.imageUrl;
  const fullName = user.user?.fullName || '';
  const firstName = user.user?.firstName ?? '';
  const lastName = user.user?.lastName ?? '';
  const fallbackName = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const role = user.user?.publicMetadata.role as UserRole;
  const userCountry = user.user?.publicMetadata.country as Country[];

  return {
    user,
    imageUrl,
    fullName,
    firstName,
    lastName,
    fallbackName,
    role,
    userCountry,
    signOut,
  };
};
