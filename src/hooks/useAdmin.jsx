import React from 'react'

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () =>{
            const res = await axiosSecure.get(`users/admin/${user?.email}`);
            // console.log(res);
            console.log(res.data);
            // console.log((await res).data.admin);
            return  res.data?.admin;
        } 
    })

    return [isAdmin, isAdminLoading];
}

export default useAdmin
