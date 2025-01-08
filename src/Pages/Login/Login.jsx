import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
   const captchaRef = useRef(null);
   const [disabled, setDisabled] = useState(true);
   const { signIn } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {
      loadCaptchaEnginge(6);
   }, []);

   const handleLogin = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.table({ email, password });

      signIn(email, password)
         .then(res => {
            const user = res.user;
            console.log(user);
            Swal.fire({
               title: "Login Successful",
               icon: "success",
               draggable: true
            });
            navigate(location?.state ? location.state : '/')
         })

   }

   const handleValidateCaptcha = () => {
      const user_captcha_value = captchaRef.current.value;
      if (validateCaptcha(user_captcha_value)) {
         setDisabled(false);
      }
      else {
         setDisabled(true);
      }
   }

   return (
      <>
         <Helmet>
            <title>Bistro | Login</title>
         </Helmet>
         <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col md:flex-row-reverse">
               <div className="text-center md:w-1/2 lg:text-left">
                  <h1 className="text-5xl font-bold">Login now!</h1>
                  <p className="py-6">
                     Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                     quasi. In deleniti eaque aut repudiandae et a id nisi.
                  </p>
               </div>
               <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shadow-2xl">
                  <form className="card-body" onSubmit={handleLogin}>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        <label className="label">
                           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <LoadCanvasTemplate />
                        </label>
                        <input ref={captchaRef} type="text" name='captcha' placeholder="Type Captcha Above" className="input input-bordered" required />
                        <button type='button' onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button>
                     </div>
                     <div className="form-control mt-6">
                        {/* TODO: apply disabled for reCaptcha */}
                        <button disabled={false} className="btn btn-primary">Login</button>
                     </div>
                  </form>
                  <p className='px-6 py-3'><small>New Here? <Link to='/signup'>Create an account.</Link></small></p>
                  <SocialLogin />
               </div>
            </div>
         </div>

      </>
   );
};

export default Login;