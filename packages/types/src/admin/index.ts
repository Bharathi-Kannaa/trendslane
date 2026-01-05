import { Country } from '../common';

export const autoAdminPrefixSection = ['country', 'banner-image', 'home-banner-image'];

export const SuperAdmin = 'superAdmin';
export const Admin = 'admin';
export const User = 'user';

export const Role = {
  SuperAdmin,
  Admin,
  User,
};

export type UserRole = 'superAdmin' | 'admin' | 'user';

export interface CustomJWTSessionClaims {
  metadata?: {
    role: UserRole;
    country: Country[];
  };
}
