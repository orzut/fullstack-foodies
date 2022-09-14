import React from 'react'

export const LandingPage = () => {
  return (
    <div className="pt-24">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full">Food Delivery Service</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Order your favorite food in a hurry!
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Don't wait to have your favorite meal! Order now with Fullstack Food Delivery!
          </p>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Order Now
          </button>
        </div>
        </div>
    </div>
  );
};

