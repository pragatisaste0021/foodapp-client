import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdOutlineSpaceDashboard, MdOutlineManageAccounts, MdDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { TiThMenuOutline } from "react-icons/ti";
import logo from "/logo.png"
import { IoMdLogOut } from "react-icons/io";
import { TbReorder } from "react-icons/tb";
import useAdmin from '../hooks/useAdmin'
import useAuth from '../hooks/useAuth';
import Login from '../components/Login';
import LoadingSpinner from '../components/LoadingSpinner'

const sharedLinks = (
    <>
    <li className='mt-3'>
        <Link to="/dashboard"><MdOutlineSpaceDashboard /> Dashboard</Link>
    </li>
    <li className='mt-3'>
        <Link to="/menu"><TiThMenuOutline /> Menu</Link>
    </li>
    <li className='mt-3'>
        <Link to="/order"><TbReorder/> Order Tracking</Link>
    </li>
    
    </>
)

const DashboardLayout = () => {
    
    const {loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    console.log(isAdminLoading);
    
    return (
        <div>
          {
            isAdminLoading ? (<LoadingSpinner/>) : (

                isAdmin ? (
                    <div>
    
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                    {/* Page content here */}
                    <div className='flex flex-col items-center sm:items-center sm:justify-center'>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    <MdDashboardCustomize />
                    </label>
                    <button className='btn rounded-full flex items-center gap-2 px-6 bg-green text-white sm:hidden'><IoMdLogOut /> Logout</button>
                    </div>
                    <div className='mt-5 md:mt-2 mx-4'>
                    <Outlet/>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><Link to="/dashboard" className='flex justify-start mb-3'><img src={logo} alt="" className='w-20'/><div className="badge badge-primary">Admin</div></Link></li>
                    <hr className='border border-black border-solid'/>
                    <li><Link to="/dashboard" className='mt-5'> <MdOutlineSpaceDashboard /> Dashboard </Link></li>
                    <li><Link to="/dashboard/manage-items"><MdOutlineManageAccounts /> Manage Bookings</Link></li>
                    <li><Link to="/dashboard/add-menu"><TiThMenuOutline /> Add Menu</Link></li>
                    <li><Link to="/dashboard/manage-items"><HiTemplate /> Manage Items</Link></li>
                    <li><Link to="/dashboard/users"><FaUser /> All Users</Link></li>
        
                    <hr className='border border-black border-solid  mt-4'/>
        
                    {/* Shared Links */}
                    {
                        sharedLinks
                    }
                    </ul>
                </div>
               </div>
    
                    </div>
                ) : (
                    <Login/>
                )

            )
          }
    
        </div>
        
      )
}

export default DashboardLayout
