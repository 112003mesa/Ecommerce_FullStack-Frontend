import { useState } from "react";
import { Link } from "react-router-dom";
import type { UserInputsProps } from "../type";

const SignupForm = () => {
  const [userInputs, setUserInputs] = useState<UserInputsProps>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userInputs); // هتضيف هنا بعدين كود التسجيل بالسيرفر
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="p-2 rounded-md border border-gray-300"
          minLength={3}
          required
          onChange={handleChange}
          value={userInputs.name}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="p-2 rounded-md border border-gray-300"
          required
          onChange={handleChange}
          value={userInputs.email}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="p-2 rounded-md border border-gray-300"
          minLength={6}
          required
          onChange={handleChange}
          value={userInputs.password}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Sign up
      </button>

      {/* Link to Login */}
      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
