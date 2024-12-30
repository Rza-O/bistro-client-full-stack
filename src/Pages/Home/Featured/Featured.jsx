import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
   return (
      <div className='featured-item text-white pt-8 my-20 bg-fixed bg-blend-overlay bg-black/50'>
         <SectionTitle heading={'Featured Item'} subheading={'check it out'}></SectionTitle>
         <div className='md:flex justify-center items-center pt-12 pb-20 px-36'>
            <div>
               <img src={featuredImg} alt="" />
            </div>
            <div className='md:ml-10'>
               <p>March 20, 2025</p>
               <p>WHERE CAN I GET SOME?</p>
               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati culpa nulla quo possimus cum voluptates harum impedit expedita rerum esse eaque ullam commodi numquam ducimus consequuntur tempore quasi quam delectus, fugiat deserunt sunt officia perspiciatis magnam odit. Omnis praesentium amet asperiores nisi quas cupiditate eius. Maiores aliquam molestiae cupiditate quos.</p>
               <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now!</button>
            </div>
         </div>
      </div>
   );
};

export default Featured;