import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle free exchange policy",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "We provide 7 days free return policy",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer support",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {policies.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-12 mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
