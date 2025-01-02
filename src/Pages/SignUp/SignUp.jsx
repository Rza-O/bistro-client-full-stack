import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const SignUp = () => {
   const { createUser } = useContext(AuthContext);
   const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
   const onSubmit = data => {
      console.log(data)
      // reset();
      createUser(data.email, data.password)
         .then(res => {
            const loggedUser = res.user;
            console.log(loggedUser);
      })
   };

   return (
      <>
         <Helmet>
            <title>Bistro | Sign Up</title>
         </Helmet>
         <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Sign Up now!</h1>
                  <p className="py-6">
                     Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                     quasi. In deleniti eaque aut repudiandae et a id nisi.
                  </p>
               </div>
               <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                     {/* Name field */}
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Name</span>
                        </label>
                        <input {...register('name', { required: true })} type="text" name='name' placeholder="name" className="input input-bordered" />
                        {errors.name && <span className='text-sm text-red-600'>Name is required</span>}
                     </div>
                     {/* Email field */}
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', { required: true })} name='email' placeholder="email" className="input input-bordered" />
                        {errors.email && <span className='text-sm text-red-600'>Email is required</span>}
                     </div>
                     {/* password field */}
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', {
                           required: true,
                           maxLength: 20,
                           minLength: 6,
                           pattern: /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{6,}$/
                        })} type="password" placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <span className='text-sm text-red-600'>Password is required</span>}

                        {errors.password?.type === 'minLength' && <span className='text-sm text-red-600'>Password must be 6 characters long</span>}

                        {errors.password?.type === 'maxLength' && <span className='text-sm text-red-600'>Password must be less than 20 characters long</span>}

                        {errors.password?.type === 'pattern' && <span className='text-sm text-red-600'>Password must have one uppercase, one lowercase, one number and one special characters</span>}

                     </div>
                     <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up!</button>
                     </div>
                  </form>
                  <p><small>Already Have <Link to='/login'>an account?</Link></small></p>
               </div>
            </div>
         </div>
      </>
   );
};

export default SignUp;