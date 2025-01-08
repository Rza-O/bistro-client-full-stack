import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const { data: isAdmin } = useQuery({
      queryKey: [user.email, 'isAdmin'],
      queryFn: async () => {
         try {
            const { data } = await axiosSecure.get(`/users/admin/${user.email}`)
            console.log(data)
            console.log(data?.admin);
            return data?.admin; 
         } catch (error) {
            console.log(error)
         }
      }
   })
   return [isAdmin];
};

export default useAdmin;