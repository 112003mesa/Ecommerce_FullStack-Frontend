import { useContext, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import ProductItem from "../components/com/ProductItem";
import Title from "../components/com/Title";
import { assets } from "../components/assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import type { ProductListProps } from "../type";
import { motion } from "framer-motion";

const Collection = () => {
  const shop = useContext(ShopContext);
  if (!shop) return null;
  const { products, search, showSearch } = shop;

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<ProductListProps[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("relevant");

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortBy("relevant");
  };

  useEffect(() => {
    let filtered = products;

    if (category.length > 0) {
      filtered = filtered.filter((product) => category.includes(product.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((product) => subCategory.includes(product.subCategory));
    }

    if (showSearch && search.trim() !== "") {
      const loweredSearch = search.toLowerCase();
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(loweredSearch));
    }

    if (sortBy === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [category, subCategory, products, sortBy, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t px-4 md:px-10 lg:px-20">
      {/* Sidebar Filters */}
      <motion.div
        className="w-full sm:w-64"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-3 w-fit cursor-pointer mb-4"
        >
          <p className="text-xl font-semibold">Filters</p>
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown icon"
          />
        </div>

        <div className={`${showFilter ? "" : "hidden"} sm:block space-y-6`}>
          {/* Category Filter */}
          <div className="border border-gray-300 rounded-lg p-4">
            <p className="mb-3 text-sm font-semibold text-gray-700">Categories</p>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label className="flex items-center gap-2 text-sm text-gray-600" key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* SubCategory Filter */}
          <div className="border border-gray-300 rounded-lg p-4">
            <p className="mb-3 text-sm font-semibold text-gray-700">Type</p>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label className="flex items-center gap-2 text-sm text-gray-600" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={subCategory.includes(type)}
                  onChange={toggleSubCategory}
                />
                {type}
              </label>
            ))}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 py-2 rounded-md mt-2"
          >
            Reset Filters
          </button>
        </div>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {filterProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found matching your filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProducts.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ProductItem
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Collection;
