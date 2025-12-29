import Image from 'next/image';
import React from 'react';

const Country = () => {
  return (
    <div className='w-full'>
      Hi Bharathi Kannaa S P, you are super admin of Trendslane! You can manage all countries here.
      List of countries will be displayed here in future.
      <Image width={64} height={64} alt='india' src='https://flagsapi.com/IN/shiny/64.png' /> India
    </div>
  );
};

export default Country;
