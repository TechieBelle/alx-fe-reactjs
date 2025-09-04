import React from 'react'
import heroImage from "../assets/hero-image.png";
const Hero = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-around p-6 bg-white shadow-md rounded-lg mt-6 mx-6">
        <div>
          <h1 className="text-6xl font-bold text-center mb-6">
            Cook. Share. Enjoy.
          </h1>
          <p>
            Discover, save, and share your favorite recipes with friends and
            food lovers everywhere.
          </p>
          <button>VIEW ALL RECIPES</button>
        </div>
        <div className="">
          <img src={heroImage} alt="Food image" style={{ width: "400px" }} />
        </div>
      </section>
    </div>
  );
}

export default Hero