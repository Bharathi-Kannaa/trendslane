'use client';

import { useClerkDetails } from '@/hooks/use-clerk-details';
import { bannerImageFormSchema } from '@/utils/form-validations/banner-image';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@workspace/backend/convex/_generated/api';
import {
  allowedCountries,
  Audience,
  AUDIENCE_ORDER,
  Country,
  getFullCountryName,
  Language,
  Role,
} from '@workspace/types';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/command';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { Typography } from '@workspace/ui/components/typography';
import { cn } from '@workspace/ui/lib/utils';
import { useMutation } from 'convex/react';
import { ArrowLeft, Check, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { BannerImageEditData } from './banner-image-client';
import { Id } from '@workspace/backend/convex/_generated/dataModel';
import { isSuperAdmin } from '@/utils/userRoleCheck';

interface BannerImageFormProps {
  mode: 'create' | 'edit';
  lang: Language;
  initialData?: BannerImageEditData;
}

const BannerImageForm = ({ mode, lang, initialData }: BannerImageFormProps) => {
  const router = useRouter();
  const pathname = useParams<{ country: Country }>();
  const { role, userCountry } = useClerkDetails();
  const [bannerImageFile, setBannerImageFile] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isPending, startTransition] = useTransition();
  const createBannerImage = useMutation(api.functions.bannerImage.createBannerImage);
  const bannerId = initialData?._id as Id<'bannerImages'>;
  const updateBannerImage = useMutation(api.functions.bannerImage.updateBannerById);

  const form = useForm<z.infer<typeof bannerImageFormSchema>>({
    resolver: zodResolver(bannerImageFormSchema),
    defaultValues: {
      country: initialData?.country ?? undefined,
      audience: initialData?.audience ?? undefined,
      title: initialData?.title ?? '',
      imageUrl: initialData?.imageUrl ?? '',
    },
  });

  const countriesAllowedToChoose = role === Role.SuperAdmin ? allowedCountries : userCountry;

  const onSubmit = (data: z.infer<typeof bannerImageFormSchema>) => {
    startTransition(async () => {
      try {
        if (mode === 'create') {
          const result = await createBannerImage(data);
          const skippedCountries = result?.skippedCountries || [];
          const createdFor = result?.createdFor || [];
          const message = result?.message;
          if (skippedCountries.length) {
            toast.warning(
              `Banner already exists for selected audience - ${skippedCountries.join(', ')}`,
            );
          }

          if (createdFor.length) {
            toast.success(`${message} for: ${createdFor.join(', ')}`);
          }

          form.reset();
          setBannerImageFile(null);
          setFileInputKey((k) => k + 1);
          router.push('/banner-image');
        } else {
          const updatedResult = await updateBannerImage({
            bannerId,
            lang,
            country: data.country as Country[],
            title: data.title,
            altText: data.title,
            imageUrl: data.imageUrl,
            audience: data.audience as Audience,
          });
          const skippedCountries = updatedResult?.skippedCountries || [];
          const updatedFor = updatedResult?.updatedFor || [];
          const message = updatedResult?.message;

          if (skippedCountries.length) {
            toast.warning(
              `Banner already exists for selected audience - ${skippedCountries.join(', ')}`,
            );
          }

          if (updatedFor.length) {
            toast.success(`${message} for: ${updatedFor.join(', ')}`);
          }
          form.reset();
          setBannerImageFile(null);
          setFileInputKey((k) => k + 1);
          router.push('/banner-image');
        }
      } catch (error: unknown) {
        toast.error(
          `Failed to create banner image: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
        return;
      }
    });
  };

  return (
    <>
      <div className='w-full  flex flex-col justify-between lg:flex-row gap-4 '>
        <div className='flex items-center gap-4'>
          <Button className='p-4' variant='outline' onClick={() => router.push('/banner-image')}>
            <ArrowLeft />
          </Button>
          <Typography normalCase className='text-sm lg:text-2xl'>
            {mode === 'create' ? 'Add Banner Image' : 'Edit Banner Image'}
          </Typography>
        </div>
      </div>
      <form
        id='banner-image'
        className='mt-4'
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <Card>
          <CardHeader>
            <CardTitle>Banner Image Details</CardTitle>
            <CardDescription>
              This is the entry page users see when they first visit the app.
            </CardDescription>
          </CardHeader>
          <CardContent className='w-full'>
            <FieldGroup>
              <div className='flex flex-col lg:grid lg:grid-cols-2 gap-6'>
                <div className='grid gap-2'>
                  {isSuperAdmin(role) ? (
                    <Controller
                      name='country'
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const selected = field.value || [];

                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Country</FieldLabel>

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  className={cn(
                                    'w-full justify-between',
                                    fieldState.invalid && 'border-destructive',
                                  )}
                                >
                                  {selected.length ? (
                                    countriesAllowedToChoose
                                      ?.filter((c) => selected.includes(c))
                                      .map((c) => c)
                                      .join(', ')
                                  ) : (
                                    <Typography className='opacity-50 normal-case font-normal'>
                                      Select countries
                                    </Typography>
                                  )}
                                  <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
                                </Button>
                              </PopoverTrigger>

                              <PopoverContent className='w-full p-0'>
                                <Command>
                                  <CommandInput placeholder='Search country...' />
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandList>
                                    <CommandGroup>
                                      {countriesAllowedToChoose?.map((c) => {
                                        const isSelected = selected.includes(c);

                                        return (
                                          <CommandItem
                                            key={c}
                                            onSelect={() => {
                                              if (isSelected) {
                                                field.onChange(
                                                  selected.filter((v: Country) => v !== c),
                                                );
                                              } else {
                                                field.onChange([...selected, c]);
                                              }
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                isSelected ? 'opacity-100' : 'opacity-0',
                                              )}
                                            />
                                            {c}
                                          </CommandItem>
                                        );
                                      })}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        );
                      }}
                    />
                  ) : (
                    <div>
                      <Controller
                        control={form.control}
                        name='country'
                        render={({ field, fieldState }) => {
                          if (!field.value) {
                            field.onChange([pathname.country]);
                          }
                          return (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                              <Input
                                disabled
                                value={pathname.country}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          );
                        }}
                      />
                      <Typography className='normal-case mt-10'>
                        {getFullCountryName(pathname.country)}
                      </Typography>
                    </div>
                  )}
                </div>
                <div className='grid gap-2'>
                  <Controller
                    control={form.control}
                    name='audience'
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Audience</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value ?? ''}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full' aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder='Select a audience' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Audience</SelectLabel>
                              {AUDIENCE_ORDER.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              </div>
              <Controller
                control={form.control}
                name='title'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      {...field}
                      max={80}
                      placeholder='Enter banner title'
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name='imageUrl'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Upload Image</FieldLabel>
                    <Input
                      key={fileInputKey}
                      type='file'
                      accept='image/*'
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return '';
                        try {
                          toast.info('Uploading image...');
                          setImageUploading(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          formData.append('upload_preset', 'trendslane');

                          const response = await fetch(
                            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
                            {
                              method: 'POST',
                              body: formData,
                            },
                          );

                          const data = await response.json();

                          if (data.secure_url) {
                            field.onChange(data.secure_url);
                            setBannerImageFile(data.secure_url);
                            setImageUploading(false);
                            toast.success('Image uploaded successfully!');
                          }
                        } catch {
                          toast.error('Failed to upload image. Please try again.');
                          setImageUploading(false);
                        }
                      }}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                    {(bannerImageFile || initialData?.imageUrl) && (
                      <Image
                        src={bannerImageFile || initialData?.imageUrl || ''}
                        width={200}
                        height={200}
                        alt={initialData?.altText || field.name}
                        className='object-cover'
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Field orientation='horizontal'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  form.reset();
                  setBannerImageFile(null);
                  setFileInputKey((k) => k + 1);
                }}
              >
                Reset
              </Button>
              <Button
                type='submit'
                form='banner-image'
                disabled={imageUploading || isPending}
                className='disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {mode === 'create' ? 'Create Banner' : 'Update Banner'}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default BannerImageForm;
