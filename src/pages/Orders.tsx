import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/com/Title";
import type { OrdersResponse, OrderItem } from "../type";
import axios from "axios";

const Orders = () => {
  const shop = useContext(ShopContext);
  if (!shop) return null;

  const { backendURL, token, currency } = shop;
  const [orderData, setOrderData] = useState<
    (OrderItem & {
      status: string;
      payment: boolean;
      paymentMethod: string;
      date: number;
    })[]
  >([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post<OrdersResponse>(
        `${backendURL}/api/order/userOrders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem: (OrderItem & {
          status: string;
          payment: boolean;
          paymentMethod: string;
          date: number;
        })[] = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        // ترتيب الطلبات الأحدث أولاً
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <ul>
        {orderData.slice(0, 4).map((item, i) => (
          <li
            key={i}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* ---------- Left Section ---------- */}
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20 rounded-md"
                src={item.image[0]}
                alt={item.name}
              />

              <div>
                <p className="sm:text-base font-medium">{item.name}</p>

                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p className="text-lg">
                    {currency} {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>

                {/* ---------- Date ---------- */}
                <p className="mt-1 text-sm text-gray-500">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>

                {/* ---------- Payment Status ---------- */}
                <p className="mt-1 text-sm text-gray-500">
                  Payment:{" "}
                  <span
                    className={`${
                      item.payment ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.payment ? "Paid" : "Not Paid"}
                  </span>
                </p>

                {/* ---------- Payment Method ---------- */}
                <p className="mt-1 text-sm text-gray-500">
                  Method:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* ---------- Right Section ---------- */}
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`min-w-2 h-2 rounded-full ${
                    item.status === "Order Placed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition"
              >
                Truck ORDER
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
