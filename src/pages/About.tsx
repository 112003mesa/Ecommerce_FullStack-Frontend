import { assets } from "../components/assets/frontend_assets/assets"
import Title from "../components/com/Title"
import { motion } from "framer-motion"

const About = () => {
  return (
    <div className="pt-24 pb-20 bg-[#f9fafb] text-gray-800">
      <div className="text-center mb-14">
        <Title text1="ABOUT" text2="US" />
        <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
          We're not just building a store — we're building trust, experience, and lasting connections.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-700">Who We Are</h2>
          <p className="text-[17px] text-gray-700 leading-7">
            We are a team of passionate creators, designers, and developers committed to redefining online shopping.
            Our mission is to empower customers with quality, affordability, and seamless experience. Every click,
            every product, and every customer matters. Join us in making eCommerce smarter, simpler, and more human.
          </p>
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={assets.about_img}
            alt="About"
            className="w-full max-w-md mx-auto rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>

      <div className="mt-20 max-w-6xl mx-auto px-4">
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-12">What Makes Us Different?</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Lightning Fast Delivery",
              desc: "Our logistics are optimized to get products to your doorstep in no time.",
            },
            {
              title: "Handpicked Products",
              desc: "Every product in our store is chosen with quality and performance in mind.",
            },
            {
              title: "Human Support",
              desc: "No bots — only real people helping real people. Anytime, anywhere.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h4 className="text-blue-600 font-semibold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
