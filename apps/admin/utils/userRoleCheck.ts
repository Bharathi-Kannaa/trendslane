import { Role, UserRole } from '@workspace/types';

export const isAdmin = (userRole: UserRole | undefined) => {
  return userRole === 'admin';
};

export const isSuperAdmin = (userRole: UserRole | undefined) => {
  return userRole === Role.SuperAdmin;
};
