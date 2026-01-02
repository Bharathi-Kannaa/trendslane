import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { AudienceConvex, CountryConvex, LanguageConvex } from '../schema';
import { AUDIENCE_ORDER, Country } from '@workspace/types';
import { internal } from '../_generated/api';

// Create Banner Image
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

    // 1) Find conflicting countries
    const conflictingCountries = new Set<string>();

    for (const banner of existing) {
      for (const country of banner.country) {
        if (args.country.includes(country as Country)) {
          conflictingCountries.add(country);
        }
      }
    }

    // 2) Filter out conflicting countries from the requested countries
    const allowedCountries = args.country.filter((country) => !conflictingCountries.has(country));

    // 3) If no allowed countries remain, skip creation
    if (allowedCountries.length === 0) {
      return {
        created: false,
        message: `Banner already exists for audience "${args.audience}" in selected countries`,
        skippedCountries: Array.from(conflictingCountries),
      };
    }

    // 4) Create banner for allowed countries only
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

    // await ctx.scheduler.runAfter(0, internal.jobs.translateBannerImage.translateBannerImage, {
    //   bannerId,
    // });

    return {
      created: true,
      bannerId,
      message: 'Banner image created successfully ',
      createdFor: allowedCountries,
      skippedCountries: Array.from(conflictingCountries),
    };
  },
});

export const getBannerById = query({
  args: { bannerId: v.id('bannerImages') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.bannerId);
  },
});

export const getBannerTranslationById = query({
  args: {
    bannerId: v.id('bannerImages'),
    lang: LanguageConvex,
  },
  handler: async (ctx, { bannerId, lang }) => {
    const banner = await ctx.db.get(bannerId);
    if (!banner) return null;

    const t = banner.translations?.[lang];

    return {
      _id: banner._id,
      country: banner.country,
      audience: banner.audience,
      imageUrl: banner.imageUrl,
      sortIndex: banner.sortIndex,
      title: t?.title ?? banner.title,
      altText: t?.altText ?? banner.altText,
    };
  },
});

export const updateBannerTranslationById = mutation({
  args: {
    bannerId: v.id('bannerImages'),
    lang: LanguageConvex,
    title: v.string(),
    altText: v.optional(v.string()),
    audience: v.string(),
  },
  handler: async (ctx, args) => {
    const banner = await ctx.db.get(args.bannerId);
    if (!banner) throw new Error('Not found');

    await ctx.db.patch(args.bannerId, {
      translations: {
        ...banner.translations,
        [args.lang]: {
          title: args.title,
          altText: args.altText ?? args.title,
          audience: args.audience,
        },
      },
      updatedAt: Date.now(),
    });
  },
});

// export const updateById = query({})

// Get Banner Images
export const getBannerImages = query({
  args: { country: CountryConvex, lang: LanguageConvex },
  handler: async (ctx, args) => {
    const all = (await ctx.db.query('bannerImages').collect()).sort(
      (a, b) => a.sortIndex! - b.sortIndex!,
    );

    let allBannerImages = all;

    if (args.country) {
      allBannerImages = allBannerImages.filter((banner) => banner.country.includes(args.country));
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
