import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
   const { user, loading } = useAuth();
   const axiosSecure = useAxiosSecure();
   const { data: isAdmin, isPending: isAdminLoading } = useQuery({
      queryKey: [user?.email, 'isAdmin'],
      enabled: !loading,
      queryFn: async () => {
         try {
            const { data } = await axiosSecure.get(`/users/admin/${user.email}`)
            return data?.admin; 
         } catch (error) {
            console.log(error)
         }
      }
   })
   return [isAdmin, isAdminLoading];
};

export default useAdmin;