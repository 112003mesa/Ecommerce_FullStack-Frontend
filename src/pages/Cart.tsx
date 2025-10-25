import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import type { CartEntry, SizeType } from "../type";
import Title from "../components/com/Title";
import { FaTrash } from "react-icons/fa";
import CartTotal from "../components/com/CartTotal";


const Cart = () => {
  const shop = useContext(ShopContext);
  if (!shop) return null;

  const { products, currency, cartItem, updateQuantity, navigate, removeFromCart } = shop;

  const [cartData, setCartData] = useState<CartEntry[]>([]);


  useEffect(() => {

    if (products.length > 0) {
      const tempData: CartEntry[] = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          const quantity = cartItem[productId][size as SizeType];

          if (typeof quantity === "number" && quantity > 0) {
            const product = products.find((p) => p._id === productId);
            tempData.push({
              _id: productId,
              size: size as SizeType,
              quantity,
              product,
            });
          }
        }
      }

      setCartData(tempData);
    }

  }, [cartItem, products]);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            const totalPrice =
              item.product?.price ? item.product.price * item.quantity : null;

            return (
              <div
                key={index}
                className="border bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                {/* Left: Image & Info */}
                <div className="flex items-center gap-4 flex-1 w-full">
                  <img
                    src={productData?.image[0]}
                    alt={productData?.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {productData?.name || "Product not found"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-sm text-gray-700 font-semibold">
                      Total: {currency}
                      {totalPrice !== null ? totalPrice.toFixed(2) : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Middle: Quantity Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))
                    }
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-base font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Right: Delete */}
                <button
                  onClick={() => removeFromCart(item._id, item.size)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Remove from cart"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Total */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-12">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
