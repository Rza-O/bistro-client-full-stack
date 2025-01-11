import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
   baseURL: 'http://localhost:8000'
})

const useAxiosSecure = () => {
   const navigate = useNavigate();
   const { logOut } = useAuth();
   // request interceptors to add authorization header for every secure call to the api
   axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token');

      // console.log('request stopped by interceptor', token)
      config.headers.authorization = `Bearer ${token}`
      return config;
   }, function (error) {
      // do something with the request error
      return Promise.reject(error);
   });

   // intercepts 401 & 403 status
   axiosSecure.interceptors.response.use((response) => {
      return response;
   }, async (error) => {
      const status = error.response?.status;
      // for 401 & 403 logout the user and navigate to the login page
      if (status === 401 || status === 403) {
         await logOut();
         navigate('/login')
      }
      return Promise.reject(error);
   })


   return axiosSecure;
};

export default useAxiosSecure;