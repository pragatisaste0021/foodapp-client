import React from "react";

const offers = [
  {
    title: "50% Off on Pizza",
    description: "Get 50% off on all pizzas. Limited time offer!",
    image: "/images/home/offers/pizza.png",
    discount: "50%",
  },
  {
    title: "Buy 1 Get 1 Free Burgers",
    description: "Order one burger and get another absolutely free!",
    image: "/images/home/offers/burger.png",
    discount: "BOGO",
  },
  {
    title: "20% Off on Desserts",
    description: "Enjoy a 20% discount on all dessert items!",
    image: "/images/home/offers/desserts_offer.png",
    discount: "20%",
  },
  {
    title: "Free Drink with Meal",
    description: "Get a free drink with every meal purchase over $15.",
    image: "/images/home/offers/drink_meal.png",
    discount: "Free",
  },
];

const OffersPage = () => {
  return (
    <div className="py-10 px-6 bg-gray-100">
      <h1 className="text-center text-4xl font-bold mb-8">Current Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
           <img
                src={offer.image}
                alt={offer.title}
                className="w-full max-h-30 object-contain rounded-t-lg"
                ></img>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">{offer.title}</h2>
              <p className="text-gray-700 mt-2">{offer.description}</p>
              <div className="mt-4 text-center">
                <span className="text-xl font-bold text-[#D20103]">{offer.discount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
