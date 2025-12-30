// convex/jobs/updateBannerTranslations.ts
import { v } from 'convex/values';
import { internalMutation } from '../_generated/server';
import { Language } from '@workspace/types';
import { BannerTranslation } from '../schema';

const translationsValidator = v.record(v.string(), BannerTranslation);

export const updateBannerTranslations = internalMutation({
  args: {
    bannerId: v.id('bannerImages'),
    translations: translationsValidator,
  },
  handler: async (ctx, args) => {
    const banner = await ctx.db.get(args.bannerId);

    if (!banner) {
      throw new Error('Banner image not found.');
    }

    await ctx.db.patch(args.bannerId, {
      translations: {
        ...banner.translations,
        ...args.translations,
      },
      updatedAt: Date.now(),
    });
  },
});
