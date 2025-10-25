import { useContext, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/com/Title";
import { assets } from "../components/assets/frontend_assets/assets";
import type { SizeType, OrderItem } from "../type";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const shop = useContext(ShopContext);
  if (!shop) return null;

  const {
    currency,
    delivery_free,
    getCartAmount,
    navigate,
    backendURL,
    token,
    cartItem,
    setCartItem,
    products,
  } = shop;

  const [subtotal, setSubtotal] = useState(0);
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    notes: "",
  });

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const inputClass =
    "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary";

  useEffect(() => {
    const fetchAmount = async () => {
      const amount = await getCartAmount();
      setSubtotal(amount);
    };
    fetchAmount();
  }, [getCartAmount]);

  const total = subtotal === 0 ? 0 : subtotal + delivery_free;

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let orderItems: OrderItem[] = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          const size = item as SizeType;
          if (cartItem[items][size] && cartItem[items][size]! > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                selectedSize: size,
                quantity: cartItem[items][size]!,
              });
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_free,
      };

      switch (method) {
        // 🟢 COD
        case "cod":
          setLoading(true);
          setLoadingText("Placing your order...");
          const response = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setTimeout(() => {
              setLoadingText("✅ Order placed successfully!");
              setCartItem({});
              setTimeout(() => navigate("/orders"), 1200);
            }, 1000);
          } else {
            toast.error(response.data.message);
            setLoading(false);
          }
          break;

        // 💳 STRIPE
        case "stripe":
          try {
            setLoading(true);
            setLoadingText("🔐 Connecting to Stripe...");

            const responseStripe = await axios.post(
              backendURL + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );

            if (responseStripe.data.success) {
              setLoadingText("🚀 Redirecting to Stripe checkout...");
              const { session_url } = responseStripe.data;

              setTimeout(() => {
                window.location.replace(session_url);
              }, 1500);
            } else {
              toast.error(responseStripe.data.message);
              setLoading(false);
            }
          } catch (error) {
            console.error(error);
            toast.error("Stripe payment failed");
            setLoading(false);
          }
          break;

        // 💰 PAYMOB
        case "paymob":
          try {
            setLoading(true);
            setLoadingText("🔐 Connecting to Paymob...");

            // 1️⃣ نجيب auth_token من Paymob
            const { data: authRes } = await axios.post(
              `${backendURL}/api/order/paymob/auth`,
              {},
              { headers: { token } }
            );
            const authToken = authRes.token;

            setLoadingText("🧾 Creating your order...");

            // 2️⃣ نعمل order جديد
            const { data: orderRes } = await axios.post(
              `${backendURL}/api/order/paymob/order`,
              { amount: getCartAmount() + delivery_free, authToken },
              { headers: { token } }
            );
            const orderId = orderRes.orderId;

            setLoadingText("💳 Generating payment link...");

            // 3️⃣ نجيب payment key
            const { data: paymentRes } = await axios.post(
              `${backendURL}/api/order/paymob/paymentKey`,
              { amount: getCartAmount() + delivery_free, orderId, authToken, orderData },
              { headers: { token } }
            );
            const paymentToken = paymentRes.paymentToken;

            setLoadingText("🚀 Redirecting to Paymob page...");

            // 4️⃣ نفتح صفحة الدفع بعد تأخير بسيط
            setTimeout(() => {
              const iframeUrl = `${import.meta.env.VITE_PAYMOB_IFRAME_BASE}/${import.meta.env.VITE_PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;
              window.location.href = iframeUrl;
            }, 1500);
          } catch (error) {
            console.error(error);
            toast.error("Paymob payment failed");
            setLoading(false);
          }
          break;

        default:
          toast.error("Select a valid payment method");
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing the order");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-8 mt-8 sm:pt-14 px-4 sm:px-12 pb-16 min-h-[80vh] bg-gray-50"
      >
        {/* Delivery Info Form */}
        <div className="flex flex-col gap-6 w-full sm:max-w-[600px] bg-white p-6 rounded-xl shadow-sm mt-3 sm:mt-0">
          <div className="text-xl sm:text-2xl">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First name"
              className={inputClass}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last name"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Email"
              className={inputClass}
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Phone"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className={inputClass}
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              className={inputClass}
              required
            />
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              placeholder="Zip Code"
              className={inputClass}
              required
            />
          </div>

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street Address"
            className={inputClass}
            required
          />

          <textarea
            name="notes"
            value={formData.notes}
            onChange={onChangeHandler}
            placeholder="Additional notes (optional)"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />
        </div>

        {/* Order Summary + Payment Method */}
        <div className="w-full sm:max-w-[400px] flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm">
          <div className="text-xl sm:text-2xl">
            <Title text1="ORDER" text2="SUMMARY" />
          </div>

          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency} {subtotal.toFixed(2)}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Shipping</span>
              <span>
                {subtotal === 0 ? "—" : `${currency} ${delivery_free.toFixed(2)}`}
              </span>
            </li>
            <hr />
            <li className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>
                {currency} {total.toFixed(2)}
              </span>
            </li>
          </ul>

          {/* Payment Methods */}
          <div className="mt-6">
            <Title text1="PAYMENT" text2="METHOD" />
            <div className="flex flex-col gap-3 mt-3">
              {/* Stripe */}
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${method === "stripe" ? "border-primary bg-gray-50" : ""
                  }`}
              >
                <span
                  className={`min-w-4 h-4 rounded-full border-gray-200 border-2 ${method === "stripe" ? "bg-green-400" : ""
                    }`}
                ></span>
                <img
                  className="h-5 ml-2"
                  src={assets.stripe_logo}
                  alt="Stripe"
                />
              </div>

              {/* Paymob */}
              <div
                onClick={() => setMethod("paymob")}
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${method === "paymob" ? "border-primary bg-gray-50" : ""
                  }`}
              >
                <span
                  className={`min-w-4 h-4 rounded-full border-2 border-gray-200 ${method === "paymob" ? "bg-green-400" : ""
                    }`}
                ></span>
                <img
                  className="h-5 scale-150 ml-6"
                  src={assets.paymob}
                  alt="Paymob"
                />
              </div>

              {/* COD */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${method === "cod" ? "border-primary bg-gray-50" : ""
                  }`}
              >
                <span
                  className={`min-w-4 h-4 rounded-full border-2 ${method === "cod" ? "bg-green-400" : ""
                    }`}
                ></span>
                <p className="text-gray-700 text-sm font-medium ml-2">
                  Cash on Delivery
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-black hover:bg-gray-800 text-white py-3 rounded-lg text-center transition-all"
          >
            PLACE ORDER
          </button>
        </div>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium animate-pulse">
            {loadingText}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
