import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b mt-1 from-white to-gray-50 overflow-hidden">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 gap-10">
        {/* Content */}
        <motion.div
          className="text-[#414141] w-full sm:w-1/2 text-center sm:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base tracking-wide">OUR BESTSELLERS</p>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold mb-6">
            Latest Arrivals
          </h1>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <button className="bg-black text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-gray-800 transition-all">
              SHOP NOW
            </button>
            <div className="w-8 md:w-11 h-[1px] bg-[#414141]"></div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.img
          src={assets.hero_img}
          alt="Hero"
          className="w-full sm:w-1/2 max-w-md rounded-xl shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </section>
  );
};

export default Hero;
