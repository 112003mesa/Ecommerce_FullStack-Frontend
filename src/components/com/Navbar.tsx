import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItem } =
    useContext(ShopContext)!;

  // ✅ منع سكرول الصفحة لما القائمة مفتوحة
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken(null);
    setCartItem({});
    setProfileOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="flex md:px-[7vw] lg:px-[9vw] items-center justify-between py-4 px-4 sm:px-10 font-medium relative">
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-36 transition-all group-hover:scale-105"
          />
        </Link>

        {/* ✅ Desktop Nav */}
        <ul className="hidden sm:flex gap-8 text-[15px]">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-[-4px] after:bg-black after:transition-all after:duration-300 hover:after:w-full ${
                    isActive
                      ? "text-black font-semibold after:w-full"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ✅ Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search (يظهر في الموبايل كمان) */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowSearch(true)}
          />

          {/* ✅ Profile Dropdown بالضغط */}
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer hover:scale-110 transition-transform"
              onClick={() =>
                token ? setProfileOpen((prev) => !prev) : navigate("/login")
              }
            />

            {token && profileOpen && (
              <div
                className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 transition-all duration-200"
              >
                <p
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                >
                  My Profile
                </p>
                <p
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/orders");
                    setProfileOpen(false);
                  }}
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* ✅ Cart */}
          <Link
            to="/cart"
            className="relative hover:scale-110 transition-transform"
          >
            <img src={assets.cart_icon} alt="Cart" className="w-5" />
            <span className="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center bg-black text-white text-[10px] rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* ✅ Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer sm:hidden hover:scale-110 transition-transform"
          />
        </div>

        {/* ✅ Mobile Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 shadow-lg z-40 h-screen ${
            visible ? "translate-x-0 w-3/4 sm:w-1/3" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setVisible(false)}
                className="text-gray-500 hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col divide-y divide-gray-100">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `py-4 px-6 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* ✅ Orders Button للموبايل */}
              {token && (
                <button
                  onClick={() => {
                    navigate("/orders");
                    setVisible(false);
                  }}
                  className="py-4 px-6 text-left text-gray-700 hover:bg-gray-100 text-sm font-medium"
                >
                  Orders
                </button>
              )}
            </div>

            {/* ✅ Bottom Section */}
            <div className="mt-auto p-6 flex items-center justify-between border-t">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-5 cursor-pointer"
                onClick={() =>
                  token ? navigate("/profile") : navigate("/login")
                }
              />

              <Link
                to="/cart"
                onClick={() => setVisible(false)}
                className="relative"
              >
                <img src={assets.cart_icon} alt="Cart" className="w-5" />
                <span className="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center bg-black text-white text-[10px] rounded-full">
                  {getCartCount()}
                </span>
              </Link>

              {token && (
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
