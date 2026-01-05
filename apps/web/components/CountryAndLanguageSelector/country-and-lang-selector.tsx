'use client';
import React, { useState } from 'react';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog';
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
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { Label } from '@workspace/ui/components/label';
import { setLocaleCookies } from '@/app/actions/set-locale-cookies';

export const countries = [
  { value: 'us', label: 'United States' },
  // { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'in', label: 'India' },
  // { value: 'CA', label: 'Canada' },
  // { value: 'GB', label: 'United Kingdom' },
  // { value: 'AU', label: 'Australia' },
  // { value: 'JP', label: 'Japan' },
  // { value: 'CN', label: 'China' },
  // { value: 'BR', label: 'Brazil' },
  // { value: 'MX', label: 'Mexico' },
  // { value: 'IT', label: 'Italy' },
  // { value: 'ES', label: 'Spain' },
  // { value: 'NL', label: 'Netherlands' },
  // { value: 'RU', label: 'Russia' },
  // { value: 'ZA', label: 'South Africa' },
  // { value: 'SG', label: 'Singapore' },
  // { value: 'KR', label: 'South Korea' },
  // { value: 'SE', label: 'Sweden' },
  // { value: 'CH', label: 'Switzerland' },
  // { value: 'NZ', label: 'New Zealand' },
  // { value: 'AE', label: 'United Arab Emirates' },
  // { value: 'AR', label: 'Argentina' },
  // { value: 'BE', label: 'Belgium' },
  // { value: 'DK', label: 'Denmark' },
  // { value: 'FI', label: 'Finland' },
  // { value: 'IE', label: 'Ireland' },
  // { value: 'NO', label: 'Norway' },
  // { value: 'PL', label: 'Poland' },
  // { value: 'PT', label: 'Portugal' },
  // { value: 'TR', label: 'Turkey' },
];

const CountryAndLanguageSelector = ({ country, lang }: { country: string; lang: string }) => {
  const [selectedCountry, setCountry] = useState(country);
  const [selectedLang, setLang] = useState(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setLocaleCookies(selectedCountry, selectedLang);
  };

  return (
    <DialogContent className='sm:max-w-112.5 flex gap-6 flex-col'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>
            <span className='uppercase text-sm'>Which country would like to shop in?</span>
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-6'>
          <div className='grid gap-3'>
            <Label htmlFor='Country'>Select a country or region</Label>
            <Select value={selectedCountry} onValueChange={setCountry}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a country or region' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>North America</SelectLabel>
                  <SelectItem value='us'>United States</SelectItem> */}
                  {/* <SelectItem value='ca'>Canada</SelectItem>
                  <SelectItem value='mx'>Mexico</SelectItem> */}
                  <SelectLabel>MiddleEast</SelectLabel>
                  <SelectItem value='ae'>United Arab Emirates</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  {/* <SelectItem value='de'>Germany</SelectItem> */}
                  <SelectItem value='fr'>France</SelectItem>
                  {/* <SelectItem value='gb'>United Kingdom</SelectItem>
                  <SelectItem value='it'>Italy</SelectItem>
                  <SelectItem value='es'>Spain</SelectItem> */}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Asia</SelectLabel>
                  <SelectItem value='in'>India</SelectItem>
                  {/* <SelectItem value='cn'>China</SelectItem>
                  <SelectItem value='jp'>Japan</SelectItem>
                  <SelectItem value='kr'>South Korea</SelectItem>
                  <SelectItem value='sg'>Singapore</SelectItem> */}
                </SelectGroup>
                {/* <SelectGroup>
                  <SelectLabel>Australia & Pacific</SelectLabel>
                  <SelectItem value='au'>Australia</SelectItem>
                  <SelectItem value='nz'>New Zealand</SelectItem>
                  <SelectItem value='fj'>Fiji</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>South America</SelectLabel>
                  <SelectItem value='br'>Brazil</SelectItem>
                  <SelectItem value='ar'>Argentina</SelectItem>
                  <SelectItem value='cl'>Chile</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Africa</SelectLabel>
                  <SelectItem value='za'>South Africa</SelectItem>
                  <SelectItem value='eg'>Egypt</SelectItem>
                  <SelectItem value='ng'>Nigeria</SelectItem>
                </SelectGroup>*/}
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='language'>Language</Label>
            <Select value={selectedLang} onValueChange={setLang}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a language' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  <SelectItem value='fr'>French</SelectItem>
                  {/* <SelectItem value='de'>German</SelectItem> */}
                  {/* <SelectItem value='it'>Italian</SelectItem>
                  <SelectItem value='es'>Spanish</SelectItem>
                  <SelectItem value='pt'>Portuguese</SelectItem>
                  <SelectItem value='ru'>Russian</SelectItem> */}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Asia</SelectLabel>
                  <SelectItem value='ta'>Tamil</SelectItem>
                  {/* <SelectItem value='hi'>Hindi</SelectItem> */}
                  {/* <SelectItem value='zh'>Chinese (Mandarin)</SelectItem>
                  <SelectItem value='ja'>Japanese</SelectItem>
                  <SelectItem value='ko'>Hindi</SelectItem>
                  <SelectItem value='ar'>Arabic</SelectItem>
                  <SelectItem value='bn'>Bengali</SelectItem> */}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Americas</SelectLabel>
                  <SelectItem value='en'>English</SelectItem>
                  {/* <SelectItem value='es-mx'>Spanish (Mexico)</SelectItem>
                  <SelectItem value='pt-br'>Portuguese (Brazil)</SelectItem> */}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>MiddleEast</SelectLabel>
                  <SelectItem value='ar'>Arabic</SelectItem>
                </SelectGroup>
                {/* <SelectGroup>
                  <SelectLabel>Africa</SelectLabel>
                  <SelectItem value='sw'>Swahili</SelectItem>
                  <SelectItem value='ar-af'>Arabic (North Africa)</SelectItem>
                </SelectGroup> */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className='my-4'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit'>Accept</Button>
          </DialogClose>
        </DialogFooter>
        <Typography className='normal-case font-normal'>
          By continuing, you accept the{' '}
          <Link href='/terms'>
            <Typography className='normal-case underline'> Terms & Conditions </Typography>
          </Link>
          of your chosen country or region.
        </Typography>
      </form>
    </DialogContent>
  );
};

export default CountryAndLanguageSelector;
