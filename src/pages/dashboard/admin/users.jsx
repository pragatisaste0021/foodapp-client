import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {FaTrash, FaUsers} from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const Users = () => {

  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    },
})

const handleMakeAdmin= (user) => {
  axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
    alert(`${user.name} is now admin`);
    refetch();
  })
}

// Delete User
const handleDeleteUser=(user)=>{
  axiosSecure.delete(`/users/${user._id}`).then((res) => {
    alert(`${user.name} has been deleted successfully`);
    refetch();
  })
}

return(
  <div>
    <div className='flex items-center justify-between m-4'>
      <h5>All Users</h5>
    <h5>Total Users: {users.length}</h5>
    </div>

    {/* Table */}

    <div>
      
    <div className="overflow-x-auto">
      <table className="table table-zebra md:w-[870px]">
        {/* head */}
        <thead className='bg-green text-white rounded-lg'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) =>(
              <tr key={index}>
                <th>{index+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === "admin"? "Admin" : (
                  <button className='btn btn-xs btn-circle bg-green text-white' onClick={()=>handleMakeAdmin(user)}><FaUsers/></button>
                )}</td>
                <td>
                  <button className='btn btn-xs bg-[#cc0000] text-white' onClick={()=>handleDeleteUser(user)}><FaTrash/></button>
                </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
  </div>

    </div>
  </div>
)
}

export default Users
