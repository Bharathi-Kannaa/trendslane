// convex/jobs/getBannerById.ts
import { v } from 'convex/values';
import { internalQuery } from '../_generated/server';

export const getBannerById = internalQuery({
  args: { bannerId: v.id('bannerImages') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.bannerId);
  },
});
