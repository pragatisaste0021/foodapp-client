import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const token = await localStorage.getItem("access-token");
            const res = await fetch(`http://localhost:6001/carts?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
    })

    return [cart, refetch]

}
export default useCart;