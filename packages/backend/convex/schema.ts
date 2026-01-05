import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const CountryConvex = v.union(v.literal('in'), v.literal('fr'), v.literal('ae'));
export const CountryConvexArray = v.array(
  v.union(v.literal('in'), v.literal('fr'), v.literal('ae')),
);

export const AudienceConvex = v.union(
  v.literal('women'),
  v.literal('men'),
  v.literal('teen'),
  v.literal('kids'),
);

export const LanguageConvex = v.union(
  v.literal('en'),
  v.literal('ar'),
  v.literal('fr'),
  v.literal('ta'),
);

export const BannerTranslation = v.object({
  audience: v.string(),
  title: v.string(),
  altText: v.optional(v.string()),
});

export default defineSchema({
  bannerImages: defineTable({
    userId: v.string(),
    country: v.array(CountryConvex),
    audience: AudienceConvex,
    imageUrl: v.string(),
    title: v.string(),
    altText: v.optional(v.string()),
    sortIndex: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    translations: v.object({
      en: BannerTranslation,
      ar: v.optional(BannerTranslation),
      fr: v.optional(BannerTranslation),
      ta: v.optional(BannerTranslation),
    }),
  }).index('by_audience', ['audience']),
});
