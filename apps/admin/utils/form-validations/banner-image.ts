import { allowedCountries, AUDIENCE_ORDER } from '@workspace/types';
import z from 'zod/v4';

export const bannerImageFormSchema = z.object({
  country: z.array(z.enum(allowedCountries)).min(1, 'At least one country must be selected'),
  audience: z.enum(AUDIENCE_ORDER).refine((val) => val !== undefined && val !== null, {
    message: 'Audience is required',
  }),
  title: z.string().min(1, 'Title is required').max(80, 'Title must be at most 80 characters'),
  imageUrl: z
    .string()
    .url('Please upload a valid image')
    .refine((url) => url.startsWith('https://'), {
      message: 'Only https URLs are allowed',
    }),
});

export type CreateBannerImageInput = z.infer<typeof bannerImageFormSchema>;
