import { assets } from "../components/assets/frontend_assets/assets"
import Title from "../components/com/Title"
import { motion } from "framer-motion"
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa"

const Contact = () => {
  return (
    <div className="pt-20 pb-16 bg-white text-gray-800 min-h-screen">
      {/* العنوان */}
      <div className="text-center mb-12">
        <Title text1="CONTACT" text2="US" />
        <p className="mt-2 text-gray-500 text-base">Have a question or want to work with us?</p>
      </div>

      {/* الصورة + النموذج */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        {/* الصورة */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={assets.contact_img}
            alt="Contact Illustration"
            className="w-full rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* النموذج */}
        <motion.form
          className="w-full bg-gray-100 rounded-2xl p-8 shadow-xl space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* الاسم */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Your name"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* الإيميل */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Your email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* الرسالة */}
          <textarea
            rows={5}
            placeholder="Your message"
            className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          ></textarea>

          {/* زر الإرسال */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
          >
            <FaPaperPlane /> Send Message
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default Contact
