import React from 'react'
import Catagories from '../../home/Catagories'
import SpecialDishes from '../../home/SpecialDishes'
import { useState } from 'react'
import { useEffect } from 'react'
import Cards from '../../../components/Cards'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      fetch("/menu.json")
        .then((res) => res.json())
        .then((data) => {
          const specials = data.filter((item) => item.category === "popular");
          console.log(specials)
          setRecipes(specials);
        });
    }, []);


  const categoryItems = [
    {id: 1, title: "Main Dish", despriction: "(86 dishes)", image: "/images/home/category/img1.png"},
    {id: 2, title: "Break Fast", despriction: "(12 break fast)", image: "/images/home/category/img2.png"},
    {id: 3, title: "Dessert", despriction: "(48 dessert)", image: "/images/home/category/img3.png"},
    {id: 4, title: "Browse All", despriction: "(255 Items)", image: "/images/home/category/img4.png"}
]


  return (
    <div className='overflow-x-hidden max-w-screen-xl'>

        {/* <Catagories/>
        */}

<div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
        <div className='text-center'>
            <h2 className='title'>Popular Catagories</h2>
        </div>

        {/* category cards */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
            {
                categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                        <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                            <p className='text-secondary text-sm'>{item.despriction}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
        
      

      {/* Special Dishes */}

      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
       <div className='text-center'>
            <h2 className='title'>Popular Dishes</h2>
        </div>

        <div className='md:grid grid-cols-2 sm:grid-cols-2'>
            {recipes.map((item, i) => (
              <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
                    <Link to={`/menu/${item._id}`}>
                      <figure>
                        <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
                      </figure>
                    </Link>
                    <div className="card-body">
                     <Link to={`/menu/${item._id}`}><h2 className="flex flex-col text-center card-title">{item.name}!</h2></Link>
                      <p className=''>{item.recipe}</p>
                      <div className="card-actions justify-between items-center mt-2">
                        <h5 className="font-semibold">
                          <span className="text-sm text-red">$ </span> {item.price}
                        </h5>
                      </div>
                    </div>
                  </div>
            ))}
        </div>

        </div>

    </div>
  )
}

export default Dashboard
