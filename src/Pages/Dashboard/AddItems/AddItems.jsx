import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
   const axiosPublic = useAxiosPublic();   
   const axiosSecure = useAxiosSecure();
   const { register, handleSubmit, reset } = useForm();
   const onSubmit = async(data) => {
      console.log(data)
      // image upload to imgbb and get an url
      const imageFile = {image: data.image[0]};
      const res = await axiosPublic.post(img_hosting_api, imageFile,{
         headers: {
            "content-type": "multipart/form-data"
         }
      });
      if (res.data.success) {
         // now send the menu data with the image url
         const menuData = {
            name: data.name,
            category: data.category,
            recipe: data.recipe,
            price: parseFloat(data.price),
            image: res.data.data.display_url
         };
         // we'll send the menu data to the server using secure axios
         const menuRes = await axiosSecure.post('/menu', menuData);
         console.log(menuRes.data)
         if (menuRes.data.insertedId) {
            toast.success(`${data.name} Added Successfully`);
            reset();
         }
      }
      console.log(res.data)
   };

   return (
      <div>
         <SectionTitle subheading={"What's new?"} heading='Add An Items'></SectionTitle>
         <form onSubmit={handleSubmit(onSubmit)}>
            {/* recipe name */}
            <label className="form-control w-full my-6">
               <div className="label">
                  <span className="label-text">Recipe Name*</span>
               </div>
               <input {...register("name", {required: true})} type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
            </label>
            <div className='flex gap-6'>
               {/* category */}
               <label className="form-control w-full">
                  <div className="label">
                     <span className="label-text">Recipe Category*</span>
                  </div>
                  <select defaultValue={'default'} {...register("category", {required: true})} className="select select-bordered w-full">
                     <option className='text-white' disabled value={'default'}>Select a category</option>
                     <option value="salad">Salad</option>
                     <option value="soup">Soup</option>
                     <option value="pizza">Pizza</option>
                     <option value="dessert">Dessert</option>
                     <option value="drinks">Drinks</option>
                  </select>
               </label>

               {/* price */}
               <label className="form-control w-full ">
                  <div className="label">
                     <span className="label-text">Price*</span>
                  </div>
                  <input {...register("price", {required: true})} type="number" placeholder="Price" className="input input-bordered w-full " />
               </label>
            </div>

            {/* Recipe Details */}
            <label className="form-control mt-6">
               <div className="label">
                  <span className="label-text">Recipe Details</span>
               </div>
               <textarea {...register('recipe', {required: true})} className="textarea textarea-bordered h-24" placeholder="Recipe Details..."></textarea>
            </label>
            <input {...register('image', {required:true})} type="file" className="file-input w-full max-w-xs my-6" />
            <div className='flex items-center justify-center'><button className='btn' type='submit'>Add Items <FaUtensils></FaUtensils></button></div>
         </form>
      </div>
   );
};

export default AddItems;