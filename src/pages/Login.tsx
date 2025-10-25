import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState<"Sign In" | "Sign Up">("Sign Up");

  const shop = useContext(ShopContext);
  if (!shop) return null;
  const { token, setToken, navigate, backendURL } = shop;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendURL}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Account created successfully 🎉");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendURL}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Welcome back! 👋");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 bg-white p-6 rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {currentState === "Sign Up" ? "Create an Account" : "Welcome Back"}
      </h2>

      {/* زرار التبديل بين Sign In و Sign Up */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setCurrentState("Sign Up")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentState === "Sign Up"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => setCurrentState("Sign In")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentState === "Sign In"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sign In
        </button>
      </div>

      {/* الفورم */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col gap-4"
        >
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </motion.div>
      </AnimatePresence>

      {/* زرار التسجيل */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all"
      >
        {currentState === "Sign Up" ? "Sign Up" : "Sign In"}
      </button>

      {/* النص أسفل الفورم */}
      <p className="text-sm text-gray-500">
        {currentState === "Sign Up" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentState("Sign In")}
              className="text-blue-600 hover:underline font-medium"
            >
              Click "Sign In"
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="text-blue-600 hover:underline font-medium"
            >
              Click "Sign Up"
            </button>
          </>
        )}
      </p>
    </form>
  );
};

export default Login;
