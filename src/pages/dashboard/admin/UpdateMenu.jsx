import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';

const UpdateMenu = () => {

    const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset
      } = useForm()

      const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
      // console.log(image_hosting_key);

      const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;
    
      const onSubmit = async(data) => { console.log(data)
        const imageFile = {
          image: data.image[0]
        }
        const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            'content-type' : "multipart/form-data"
          }
        })
        // console.log(hostingImage.data);

        if(hostingImage.data.success){
          const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: hostingImage.data.data.display_url
          // console.log(menuItem);
          }

          const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
          // console.log((await postMenuItem).status);

          if((await postMenuItem).status == 200){
            reset();
            Swal.fire({
              position: "between",
              icon: "success",
              title: "Your Menu Item Updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/dashboard/manage-items");
          }
        }
      }

    const item = useLoaderData();
    console.log(item);

  return (

    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl font-semibold my-2'>Update this <span className='text-green'>Menu Item</span></h2>

      <div>

      {/* Form */}

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Recipe Name*</span>
            <span className="label-text-alt">Top Right label</span>
        </label>
        <input type="text" placeholder="Recipe Name" className="input input-bordered w-full" {...register("name", { required: true })} defaultValue={item.name}/>
      </div>

      {/* 2nd row */}

      <div className='flex items-center gap-6'>

      {/* Categories */}
      <div className="form-control w-full my-6">
            <div className="label">
            <span className="label-text">Category*</span>
            
            </div>
            <select className="select select-bordered" defaultValue={item.category} {...register("category", { required: true })}>
            <option disabled value="default">Select Category</option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="dessert">Desserts</option>
            <option value="soup">Soup</option>
            <option value="drinks">Drinks</option>
            <option value="popular">Popular</option>
            </select>
            
     </div>

     {/* Prices */}

     <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Price*</span>
        </label>
        <input type="number" placeholder="Price" className="input input-bordered w-full" {...register("price", { required: true })} defaultValue={item.price}/>
      </div>


      </div>

      {/* 3rd row */}

      <div className="form-control">
        <div className="label">
            <span className="label-text">Recipe Details</span>
        </div>
        <textarea className="textarea textarea-bordered h-24" placeholder="Add the complete recipe details for your customers" {...register("recipe", { required: true })} defaultValue={item.recipe}></textarea>

      </div>

      {/* 4th row */}

      <div className="form-control w-full my-6">
        <div className="label">
            <span className="label-text">Pick a file</span>
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs"{...register("image", { required: true })} />
        
      </div>

      <button className='btn bg-green text-white px-6'>Update Item <FaUtensils/></button>

      </form>
      </div>

    </div>

  )
}

export default UpdateMenu
