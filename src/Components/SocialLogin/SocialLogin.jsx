import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
   const { googleSignIn } = useAuth();  // Import the googleSignIn function from useAuth hook;
   const axiosPublic = useAxiosPublic();     // Import the useAxiosPublic hook;
   const navigate = useNavigate();

   const handleGoogleSignIn = async () => { 
      try {
         const res = await googleSignIn();
         console.log(res.user);
         const userInfo = {
            name: res.user.displayName,
            email: res.user.email,
         }
         const {data} = await axiosPublic.post('/users', userInfo);
         console.log(data);
         navigate('/');
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <div className='p-8'>
         <div className="divider"></div>
         <div>
            <button onClick={handleGoogleSignIn} className='btn btn-primary '> <FaGoogle className='mr-2'></FaGoogle> Sign in with Google</button>
         </div>
      </div>
   );
};

export default SocialLogin;