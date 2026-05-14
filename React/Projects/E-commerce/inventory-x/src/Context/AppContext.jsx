import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Initialize data on load
  useEffect(() => {
    // 1. Load users
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if new admin exists, if not, add it
    const adminExists = storedUsers.some(u => u.email === 'admin@inventoryx.com');
    if (!adminExists) {
      storedUsers.push({
        name: 'Admin',
        email: 'admin@inventoryx.com',
        password: 'admin123',
        mobile: '0000000000',
        age: '99',
        role: 'admin',
      });
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    // 2. Load current session if exists
    const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
    if (sessionUser) {
      setCurrentUser(sessionUser);
      // Load cart for this user
      const storedCart = JSON.parse(localStorage.getItem(`cart_${sessionUser.email}`)) || [];
      setCart(storedCart);
    }

    // 3. Fetch products from Multiple dummy APIs
    const fetchProducts = async () => {
      try {
        const [dummyRes, fakeRes] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=100'),
          fetch('https://fakestoreapi.com/products')
        ]);
        
        const dummyData = await dummyRes.json();
        const fakeData = await fakeRes.json();
        
        const overrides = JSON.parse(localStorage.getItem('product_stock_overrides')) || {};
        
        const formattedDummyProducts = dummyData.products.map(p => ({
          id: `dummy_${p.id}`,
          name: p.title,
          price: Math.round(p.price * 80), // Convert to roughly INR
          stock: overrides[`dummy_${p.id}`] !== undefined ? overrides[`dummy_${p.id}`] : p.stock,
          category: p.category,
          image: p.thumbnail,
          description: p.description
        }));

        const formattedFakeProducts = fakeData.map(p => ({
          id: `fake_${p.id}`,
          name: p.title,
          price: Math.round(p.price * 80), // Convert to roughly INR
          stock: overrides[`fake_${p.id}`] !== undefined ? overrides[`fake_${p.id}`] : 20, // Default stock to 20
          category: p.category,
          image: p.image,
          description: p.description
        }));
        
        setProducts([...formattedDummyProducts, ...formattedFakeProducts]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    const userCart = JSON.parse(localStorage.getItem(`cart_${userData.email}`)) || [];
    setCart(userCart);
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem('currentUser');
  };

  const addToCart = (product) => {
    if (!currentUser) return false;

    const existingItem = cart.find((item) => item.id === product.id);
    let newCart;

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error("Cannot add more than available stock!");
        return false;
      }
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      if (product.stock <= 0) {
        toast.error("Product is out of stock!");
        return false;
      }
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(newCart));
    return true;
  };

  const removeFromCart = (productId) => {
    if (!currentUser) return;
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(newCart));
  };

  const decreaseQuantity = (productId) => {
    if (!currentUser) return;
    const existingItem = cart.find((item) => item.id === productId);
    if (!existingItem) return;

    let newCart;
    if (existingItem.quantity === 1) {
      newCart = cart.filter((item) => item.id !== productId);
    } else {
      newCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
    setCart(newCart);
    localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify([]));
    }
  };

  const updateProductStock = (productId, newStock) => {
    // Update local state
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
    
    // Save override to localStorage
    const overrides = JSON.parse(localStorage.getItem('product_stock_overrides')) || {};
    overrides[productId] = newStock;
    localStorage.setItem('product_stock_overrides', JSON.stringify(overrides));
  };

  const updateUserAddress = (newAddress) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, address: newAddress };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(u => 
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        products,
        cart,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        login,
        logout,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        updateProductStock,
        updateUserAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
