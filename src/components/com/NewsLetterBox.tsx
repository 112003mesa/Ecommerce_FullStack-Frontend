import React from "react";
import { motion } from "framer-motion";

const NewsLetterBox: React.FC = () => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle subscription logic
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Subscribe now & get 20% off
        </motion.h2>
        <motion.p
          className="text-gray-500 mt-3 text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Stay updated with our latest news and exclusive offers.
        </motion.p>

        <motion.form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border border-gray-300 rounded-full p-2 shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 text-sm text-gray-700 outline-none rounded-full"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-900 transition-all"
          >
            SUBSCRIBE
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsLetterBox;
