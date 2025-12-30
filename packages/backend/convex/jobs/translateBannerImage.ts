import { v } from 'convex/values';
import { allowedLanguages, Language } from '@workspace/types';
import { translateBannerImagePrompt } from '../lib/translations/banner_image_translation';
import { internalAction, internalMutation } from '../_generated/server';
import { internal } from '../_generated/api';

export const translateBannerImage = internalAction({
  args: { bannerId: v.id('bannerImages') },
  handler: async (ctx, args) => {
    const banner = await ctx.runQuery(internal.jobs.getBannerById.getBannerById, {
      bannerId: args.bannerId,
    });

    if (!banner) {
      throw new Error('Banner image not found.');
    }

    const newTranslations: Partial<
      Record<Language, NonNullable<(typeof banner)['translations']>['en']>
    > = {};

    for (const lang of allowedLanguages) {
      if (lang === 'en') continue; // Skip English as it's the original language

      const translatedObject = await translateBannerImagePrompt(
        banner.translations?.en.title || banner.title,
        banner.audience,
        lang,
        banner.translations?.en.altText || banner.altText,
      );

      newTranslations[lang] = {
        title: translatedObject?.title ?? banner.title,
        altText: translatedObject?.altText ?? banner.altText,
        audience: translatedObject?.audience ?? banner.audience,
      };
    }
    await ctx.runMutation(internal.jobs.updateBannerTranslations.updateBannerTranslations, {
      bannerId: args.bannerId,
      translations: newTranslations,
    });
  },
});
