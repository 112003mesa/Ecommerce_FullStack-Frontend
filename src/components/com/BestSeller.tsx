import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "./Title";
import type { ProductListProps } from "../../type";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const BestSeller = () => {
  const shop = useContext(ShopContext);

  if (!shop || !shop.products) return <div className="text-center text-red-500 py-10">Error: ShopContext not available</div>;

  const { products } = shop;
  const [bestSeller, setBestSeller] = useState<ProductListProps[]>([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-10">
        <Title text1="BEST" text2="SELLERS" />
        <p className="max-w-2xl mx-auto mt-3 text-gray-600 text-sm sm:text-base">
          Check out our most popular items, loved by our customers and highly rated for quality and value.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {bestSeller.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductItem
              _id={item._id}
              price={item.price}
              image={item.image}
              name={item.name}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BestSeller;