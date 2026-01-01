/* eslint-disable react-hooks/rules-of-hooks */
import { BannerImageData } from '@/app/(dashboard)/[country]/[lang]/banner-image/banner-image-client';
import { useClerkDetails } from '@/hooks/use-clerk-details';
import {
  canNavigateToBannerImage,
  navigateIfAllowed,
} from '@/proxy-utils/check-user-authorization';
import { ColumnDef } from '@tanstack/react-table';
import { Country, mapLanguageToCountry } from '@workspace/types';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Typography } from '@workspace/ui/components/typography';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export const columns: ColumnDef<BannerImageData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        // onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && 'indeterminate')}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
        aria-label='Select row'
      />
    ),
  },
  {
    accessorKey: 'audience',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0! m-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Audience
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => {
      const countryData: Country[] = row.getValue('country');
      const { country } = useParams();
      const { role, userCountry } = useClerkDetails();

      const isActive = countryData.filter((c) => c.includes(country as Country));
      const isNotActive = countryData.filter((c) => !c.includes(country as Country));

      return (
        <div className='flex gap-2'>
          <Typography>{isActive}</Typography>

          {isNotActive.length > 0 && (
            <>
              [
              {isNotActive.map((country, index) => (
                <div key={country}>
                  <Typography
                    className={`${
                      canNavigateToBannerImage(role, country as Country, userCountry)
                        ? 'hover:underline text-muted-foreground hover:cursor-pointer'
                        : 'cursor-not-allowed text-muted-foreground'
                    }`}
                    onClick={async () => {
                      await navigateIfAllowed(
                        role,
                        country as Country,
                        userCountry,
                        'banner-image',
                        mapLanguageToCountry(country as Country),
                      );
                    }}
                  >
                    {country}
                  </Typography>
                  {index < isNotActive.length - 1 && ', '}
                </div>
              ))}
              ]
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          className='p-0! m-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'imageUrl',
    header: () => 'Banner Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as string;
      const title = row.getValue('title') as string;
      return (
        <div className='relative h-16 w-16'>
          <Image src={imageUrl} alt={title} fill className='rounded-full object-cover' />
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      const bannerImage = row.original;
      // const { getToken } = useAuth();
      // const { country } = useParams();
      // const handleDeleteBannerImage = async (id: number) => {
      //   try {
      //     const token = await getToken();
      //     const response = await fetch(
      //       `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/banners/deleteBanner/${id}?country=${country}`,
      //       {
      //         method: 'DELETE',
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //           'Content-Type': 'application/json',
      //         },
      //       },
      //     );
      //     if (response.ok) {
      //       toast.success('Banner image deleted successfully');
      //       router.refresh();
      //     } else {
      //       toast.error('Failed to delete banner image');
      //     }
      //   } catch (error) {
      //     console.error('Failed to delete banner image', error);
      //   }
      // };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open Actions menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(bannerImage._id.toString())}
            >
              Copy Banner ID
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/banner-image/edit/${bannerImage._id}`)}>
              View Banner
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/banner-image/edit/${bannerImage._id}`)}>
              Edit Banner
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>Delete Banner</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
