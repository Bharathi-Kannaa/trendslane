'use client';
import {
  bannerImageFormSchema,
  CreateBannerImageInput,
} from '@/utils/form-validations/banner-image';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@workspace/backend/convex/_generated/api';
import { Audience } from '@workspace/types';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Input } from '@workspace/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { useMutation } from 'convex/react';
import React from 'react';
import { useForm } from 'react-hook-form';
const audiences = ['women', 'men', 'teen', 'kids'] as const;
const countries = ['in', 'fr', 'ae'] as const;
const BannerImageForm = () => {
  const createBanner = useMutation(api.functions.bannerImage.createBannerImage);

  const form = useForm<CreateBannerImageInput>({
    resolver: zodResolver(bannerImageFormSchema),
    defaultValues: {
      country: [],
    },
  });

  async function onSubmit(values: CreateBannerImageInput) {
    await createBanner(values);
    form.reset();
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 max-w-lg'>
        {/* Title */}
        <Input placeholder='Title (English)' {...form.register('title')} />

        {/* Image URL */}
        <Input placeholder='Image URL' {...form.register('imageUrl')} />

        {/* Audience */}
        <Select onValueChange={(v) => form.setValue('audience', v as Audience)}>
          <SelectTrigger>
            <SelectValue placeholder='Select audience' />
          </SelectTrigger>
          <SelectContent>
            {audiences.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Countries */}
        <div className='space-y-2'>
          <p className='text-sm font-medium'>Countries</p>
          {countries.map((c) => (
            <label key={c} className='flex items-center gap-2'>
              <Checkbox
                checked={form.watch('country').includes(c)}
                onCheckedChange={(checked) => {
                  const current = form.getValues('country');
                  form.setValue(
                    'country',
                    checked ? [...current, c] : current.filter((x) => x !== c),
                  );
                }}
              />
              {c.toUpperCase()}
            </label>
          ))}
        </div>

        <Button type='submit'>Create Banner</Button>
      </form>
    </div>
  );
};

export default BannerImageForm;
