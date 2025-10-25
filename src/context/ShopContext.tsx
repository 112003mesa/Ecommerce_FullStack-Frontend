import { createContext, useEffect, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { ProductListProps, SizeType } from "../type";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

type CartItemType = {
  [productId: string]: {
    [size in SizeType]?: number;
  };
};

interface ShopContextType {
  products: ProductListProps[];
  currency: string;
  delivery_free: number;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  cartItem: CartItemType;
  setCartItem: Dispatch<SetStateAction<CartItemType>>;
  addToCart: (itemId: string, size: SizeType) => Promise<void>;
  getCartAmount: () => number;
  updateQuantity: (itemId: string, size: SizeType, quantity: number) => void;
  navigate: ReturnType<typeof useNavigate>;
  getCartCount: () => number;
  backendURL: string;
  removeFromCart: (itemId: string, size: SizeType) => Promise<void>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const ShopContext = createContext<ShopContextType | null>(null);

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_free = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItem, setCartItem] = useState<CartItemType>({});
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductListProps[]>([]);
  const navigate = useNavigate();

  const addToCart = async (itemId: string, size: SizeType) => {
    if (!token) {
      toast.error("Please log in to add items to your cart");
      return;
    }
  
    const cartData = JSON.parse(JSON.stringify(cartItem)) as CartItemType;
  
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItem(cartData);
  
    try {
      const response = await axios.post(
        backendURL + "/api/cart/add",
        { itemId, size },
        { headers: { token } }
      );
      if(response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  const removeFromCart = async (itemId: string, size?: SizeType) => {
    const updatedCart = { ...cartItem };
  
    if (updatedCart[itemId]) {
      if (size) {
        delete updatedCart[itemId][size];
  
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      } else {
        delete updatedCart[itemId];
      }
  
      setCartItem(updatedCart);
    }
  
    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/remove`,
          { itemId, size },
          { headers: { token } }
        );
  
        if (size) {
          toast.success(`Removed size ${size} from cart`);
        } else {
          toast.success("Item removed from cart");
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    } else {
      toast.error("Please log in to modify your cart");
    }
  };
  
  

  const updateQuantity = async (itemId: string, size: SizeType, quantity: number) => {
    const cartData = JSON.parse(JSON.stringify(cartItem)) as CartItemType;
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if(token) {
      try {
        await axios.post(backendURL + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
      } catch (error: any) {
        console.log(error)
        toast.error(error.message)
      }
    }

  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItem) {
      const sizes = cartItem[productId];
      for (const size in sizes) {
        const count = sizes[size as SizeType];
        if (count && count > 0) totalCount += count;
      }
    }
    return totalCount;
  };

  const getCartAmount = (): number => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const itemInfo = products.find((product) => product._id === productId);
      if (!itemInfo) continue;
      const sizes = cartItem[productId];
      for (const size in sizes) {
        const count = sizes[size as SizeType];
        if (count && count > 0) {
          totalAmount += itemInfo.price * count;
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get<{
        success: boolean;
        products: ProductListProps[];
        message?: string;
      }>(backendURL + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const getUserCart = async (token: string) => {
    try {
      const response = await axios.get(backendURL + '/api/cart/get', {headers: {token}})
      if(response.data.success) {
        setCartItem(response.data.cartData)
      } else {
        toast.error(response.data.message || 'Failed to fetch cart data')
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
      getUserCart(savedToken)
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const value: ShopContextType = {
    products,
    currency,
    delivery_free,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartCount,
    getCartAmount,
    navigate,
    backendURL,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
