
import React, { useState, useEffect ,createContext,useContext,useMemo} from 'react';
import './App.css';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';

import axios from 'axios';

// import{BrowserRouter, Link}from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export const DataContext = createContext();

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [products, setProducts] = useState([]);
  const[IsLoggedIn,setIsLoggedIn]=useState(false);
  const[currentUser,setcurrentUser]=useState({});
  const [cart, setCart] = useState([]);

  // Add/update product in cart with qty
  const addOrUpdate = (product, qty) => {
    qty = Math.max(0, Math.floor(qty || 0));
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx === -1) {
        if (qty > 0) return [...prev, { ...product, qty }];
        return prev;
      } else {
        if (qty === 0) return prev.filter((_, i) => i !== idx);
        return prev.map((it, i) => (i === idx ? { ...it, qty } : it));
      }
    });
  };

  const increment = (product, by = 1) => {
    const existing = cart.find(c => c.id === product.id);
    addOrUpdate(product, (existing?.qty || 0) + by);
  };

  const decrement = (product, by = 1) => {
    const existing = cart.find(c => c.id === product.id);
    addOrUpdate(product, Math.max(0, (existing?.qty || 0) - by));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));
  const clearCart = () => setCart([]);

  
  const totals = useMemo(() => {
    const totalItems = cart.reduce((s, it) => s + it.qty, 0);
    const uniqueItems = cart.length;
    const subtotal = cart.reduce((s, it) => {
      const price = parseInt(it.price.replace("₹", "")) || 0;
      return s + price * it.qty;
    }, 0);
    return { totalItems, uniqueItems, subtotal };
  }, [cart]);

  useEffect(() => {
   axios.get("http://localhost:3006/products")
   
    //axios.get("http://localhost:9090/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const filtered = products.filter(p =>
     p.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "priceAsc") {
      return parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", ""));
    } else if (selectedSort === "nameDesc") {
      return b.productName.localeCompare(a.productName);
    }
    return 0;
  });
  const addToCart = (product) => {
  setCart((prevCart) => [...prevCart, product]);
};



 
  return (

    <div>
     
        <DataContext.Provider 
        value={{
           IsLoggedIn,
        currentUser,
        setIsLoggedIn,
        setcurrentUser,
        cart,
        addOrUpdate,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        totals
         
  }}>
    
      <BrowserRouter>
        <Header
          st={searchText}
          onSearchEvent={(e) => setSearchText(e.target.value)}
          onSort={(type) => setSelectedSort(type)}
        />
        <MainSection products={sorted}/>
        {/* <Routes>
          <Route path="/" element={<MainSection products={sorted} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes> */}
      
     
      <Footer/>
      </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}
