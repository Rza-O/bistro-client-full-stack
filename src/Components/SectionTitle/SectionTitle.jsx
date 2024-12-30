import React from 'react';

const SectionTitle = ({ heading, subheading }) => {
   return (
      <div className='md:w-4/12 mx-auto text-center my-8'>
         <p className='text-yellow-600 mb-2 italic'>---{subheading}---</p>
         <h3 className='text-3xl uppercase border-y-4 py-4 border-neutral'>{heading}</h3>
      </div>
   );
};

export default SectionTitle;