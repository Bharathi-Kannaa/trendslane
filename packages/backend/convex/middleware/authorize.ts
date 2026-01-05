import {
  allowedCountries,
  Country,
  CustomJWTSessionClaims,
  Role,
  UserRole,
} from '@workspace/types';
import { MutationCtx, QueryCtx } from '../_generated/server';

type Ctx = MutationCtx | QueryCtx;

export const authorize = async (ctx: Ctx, allowedRoles: UserRole[]) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) throw new Error('You are not logged in!');

  const claims = identity as CustomJWTSessionClaims;
  if (!claims?.metadata?.role || !allowedRoles.includes(claims.metadata.role)) {
    throw new Error('Forbidden user role');
  }
  return claims;
};

export const authorizeCountryAccess = async (
  ctx: Ctx,
  inputCountries: Country[],
): Promise<{
  ok: boolean;
  allowed: Country[];
  skipped: Country[];
  reason?: string;
  message?: string;
}> => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return {
      ok: false,
      allowed: [],
      skipped: [],
      reason: 'unauthenticated',
      message: 'You are not logged in',
    };
  }

  const claims = identity as CustomJWTSessionClaims;

  if (claims?.metadata?.role === Role.SuperAdmin)
    return { ok: true, allowed: inputCountries, skipped: [] };

  if (claims?.metadata?.role !== Role.Admin) {
    return {
      ok: false,
      allowed: [],
      skipped: inputCountries,
      reason: 'role',
      message: 'Forbidden user role',
    };
  }
  if (!inputCountries || inputCountries.length === 0) {
    return {
      ok: false,
      allowed: [],
      skipped: [],
      reason: 'input',
      message: 'Country is required',
    };
  }

  const allowed = inputCountries.filter((c) => allowedCountries.includes(c));
  const skipped = inputCountries.filter((c) => !allowedCountries.includes(c));

  if (allowed.length === 0) {
    return {
      ok: false,
      allowed: [],
      skipped,
      reason: 'permission',
      message: 'You do not have access to any of the selected countries',
    };
  }
  return {
    ok: true,
    allowed,
    skipped,
  };
};
