import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const shop = useContext(ShopContext);
  if (!shop) return null;

  const { currency, delivery_free, getCartAmount } = shop;

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchAmount = async () => {
      const amount = await getCartAmount();
      setSubtotal(amount);
    };

    fetchAmount();
  }, [getCartAmount]);

  const total = subtotal === 0 ? 0 : subtotal + delivery_free;

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md">
      <div className="text-2xl mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {subtotal === 0 ? "—" : `${currency} ${delivery_free.toFixed(2)}`}
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-base">
          <b>Total</b>
          <b>
            {currency} {total.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
