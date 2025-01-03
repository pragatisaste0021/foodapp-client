import React from 'react'
import useMenu from '../../../hooks/useMenu'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {

    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    console.log(menu);

    // Handle Delete Item
    const handleDelete = (item) => {
        console.log(item);

        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }

  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>

        <h2 className='text-2xl font-semibold my-2'>Manage All <span className='text-green'>Menu Items</span></h2>


        {/* Menu Items Table */}

        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                      #
                    </th>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                        menu.map((item, index) => (

                            <tr key={index}>

                                <td>{index+1}</td>
                            
                    
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                        src={item.image}
                                        alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                    
                                    </div>
                                </div>
                                </td>
                                <td>
                                {item.name}
                                
                                </td>
                                <td>{item.price}</td>
                                <td>
                                <Link to={`/dashboard/update-menu/${item._id}`}><button className="btn btn-ghost bg-orange-500 text-white"><FaEdit /></button></Link>
                                </td>

                                <td >
                                    <button onClick = {()=> handleDelete(item)} className='btn btn-ghost btn-xs text-red'><FaTrashAlt /></button>
                                </td>
                            </tr>
                
                        ))
                    }
            
                
               </tbody> 
            </table>
        </div>

    </div>
  )
}

export default ManageItems
