import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { AudienceConvex, CountryConvex, LanguageConvex } from '../schema';
import { AUDIENCE_ORDER, Country } from '@workspace/types';
import { internal } from '../_generated/api';

export const createBannerImage = mutation({
  args: {
    country: v.array(CountryConvex),
    audience: AudienceConvex,
    imageUrl: v.string(),
    title: v.string(),
    altText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query('bannerImages')
      .withIndex('by_audience', (q) => q.eq('audience', args.audience))
      .collect();

    if (
      existing.some((banner) => banner.country.some((country) => args.country.includes(country)))
    ) {
      throw new Error('Banner image for the specified country and audience already exists.');
    }

    const bannerId = await ctx.db.insert('bannerImages', {
      ...args,
      altText: args.title,
      sortIndex: AUDIENCE_ORDER.indexOf(args.audience),
      userId: 'anonymous', // Replace with actual user ID when authentication is implemented
      createdAt: now,
      updatedAt: now,
      translations: {
        en: { title: args.title, altText: args.title, audience: args.audience },
      },
    });

    if (!bannerId) {
      throw new Error('Failed to create banner image.');
    }

    await ctx.scheduler.runAfter(0, internal.jobs.translateBannerImage.translateBannerImage, {
      bannerId,
    });

    return bannerId;
  },
});

export const getBannerImages = query({
  args: { country: CountryConvex, lang: LanguageConvex },
  handler: async (ctx, args) => {
    const all = await ctx.db.query('bannerImages').collect();

    let allBannerImages = all;

    if (args.country) {
      allBannerImages = allBannerImages.filter((banner) =>
        banner.country.includes(args.country as Country),
      );
    }

    const lang = args.lang ?? 'en';

    return allBannerImages.map((banner) => {
      const t = banner.translations[lang];

      return {
        _id: banner._id,
        imageUrl: banner.imageUrl,
        sortIndex: banner.sortIndex,
        country: banner.country,
        audience: banner.audience,
        translatedAudience: t?.audience ?? banner.audience,
        title: t?.title ?? banner.title,
        altText: t?.altText ?? banner.altText,
        lang,
      };
    });
  },
});
