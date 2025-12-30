/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_bannerImage from "../functions/bannerImage.js";
import type * as jobs_getBannerById from "../jobs/getBannerById.js";
import type * as jobs_translateBannerImage from "../jobs/translateBannerImage.js";
import type * as jobs_updateBannerTranslations from "../jobs/updateBannerTranslations.js";
import type * as lib_gemini_config from "../lib/gemini_config.js";
import type * as lib_translations_banner_image_translation from "../lib/translations/banner_image_translation.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "functions/bannerImage": typeof functions_bannerImage;
  "jobs/getBannerById": typeof jobs_getBannerById;
  "jobs/translateBannerImage": typeof jobs_translateBannerImage;
  "jobs/updateBannerTranslations": typeof jobs_updateBannerTranslations;
  "lib/gemini_config": typeof lib_gemini_config;
  "lib/translations/banner_image_translation": typeof lib_translations_banner_image_translation;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
