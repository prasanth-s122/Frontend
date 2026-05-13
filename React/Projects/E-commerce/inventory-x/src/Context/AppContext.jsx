import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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

    // 3. Fetch products from DummyJSON
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=24');
        const data = await response.json();
        
        const overrides = JSON.parse(localStorage.getItem('product_stock_overrides')) || {};
        
        const formattedProducts = data.products.map(p => ({
          id: p.id,
          name: p.title,
          price: Math.round(p.price * 80), // Convert to roughly INR
          stock: overrides[p.id] !== undefined ? overrides[p.id] : p.stock,
          category: p.category,
          image: p.thumbnail,
          description: p.description
        }));
        
        setProducts(formattedProducts);
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
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
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

  return (
    <AppContext.Provider
      value={{
        currentUser,
        products,
        cart,
        loading,
        login,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
        updateProductStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
