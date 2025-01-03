import { useQuery } from '@tanstack/react-query';
import React, { createElement } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Order = () => {

  const { user } = useAuth();

  console.log(user?.email);

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const token = await localStorage.getItem("access-token");
            const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
    })

    console.log(orders);

    const calculateTotalPrice = (item) => {
      return item.price * item.quantity;
    };

    const orderSubtotal = orders.reduce((total, item) => {
      return total + calculateTotalPrice(item);
    }, 0);
  

    const formatDate=(createdAt) => {
      const createdAtDate = new Date(createdAt);
      return createdAtDate.toLocaleDateString();
    }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 py-24'>

    <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your <span className="text-green">Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}

      <div>
      {
              (orders.length > 0) ? <div>
              <div className="">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead className="bg-green text-white rounded-sm">
                      <tr>
                        <th>#</th>
                        <th>Order Date</th>
                        <th>TransitionId</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                    
                          <td className="font-medium">{formatDate(item.createdAt)}</td>
                          <td>{item.transitionId}</td>
                          <td>
                            {item.price}
                          </td>
                          <td>{item.status}</td>
                          {/* <td>${calculateTotalPrice(item).toFixed(2)}</td> */}
                          <td>
                            <Link to={"/contact"}
                              className="btn btn-sm border-none text-red bg-transparent"
                            >
                              Contact
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* foot */}
                  </table>
                </div>
              </div>
              <hr />
              <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
                <div className="md:w-1/2 space-y-3">
                  <h3 className="text-lg font-semibold">Customer Details</h3>
                  <p>Name: {user?.displayName || "None"}</p>
                  <p>Email: {user?.email}</p>
                  <p>
                    User_id: <span className="text-sm">{user?.uid}</span>
                  </p>
                </div>
                <div className="md:w-1/2 space-y-3">
                  <h3 className="text-lg font-semibold">Shopping Details</h3>
                  <p>Total Items: {orders.length}</p>
                  <p>
                    Total Price:{ " " + orderSubtotal}
                    {/* <span id="total-price">${orderTotal.toFixed(2)}</span> */}
                  </p>
                  
                </div>
              </div>
            </div> : ""
            // <div className="text-center mt-20">
            //   <p>Cart is empty. Please add products.</p>
            //   <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
            // </div>
            }
            </div>

    </div>
  )
}

export default Order