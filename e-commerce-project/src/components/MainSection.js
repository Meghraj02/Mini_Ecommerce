
import React, { useContext, useEffect, useState } from "react";
import CardList from "./CardList";
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserHome from "./UserHome";
import AdminHome from "./AdminHome";
import { DataContext } from "../App";
import CheckoutPage from "./CheckoutPage"; 
//import { useNavigate } from "react-router-dom";
export default function MainSection({ products }) {
  
  const location = useLocation();
  const [panelOpen, setPanelOpen] = useState(false);
const { IsLoggedIn } = useContext(DataContext);

const ProtectedRoute = () => {
   console.log(IsLoggedIn);
  return IsLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
  useEffect(() => {
    const isFormPage = location.pathname === "/login" 
    || location.pathname === "/signup";
    setPanelOpen(isFormPage);
  }, [location.pathname]);


  // Decide when to show CardList
   const showCardList = ["/", "/home", "/login", "/signup"].
   includes(location.pathname); //// changed
  // Layout styles for normal pages
  const gridFlex = panelOpen ? "0 0 70%" : "1 1 auto";
  const gridCols = panelOpen ? "repeat(3, auto)" : "repeat(4, auto)";
  const gridScroll = panelOpen ? "scroll" : "hidden";

  const cardListStyle = {
    flex: gridFlex,
    display:showCardList?"grid":"none",///changed
    // display: 'grid',
    gridTemplateColumns: gridCols,
    overflowY: gridScroll,
    padding: "1rem",
    backgroundColor: "white",
  };

  const panelStyle = {
   width: panelOpen ? "30%" : showCardList ? "0" : "100%",//changed
    transition: "width 0.3s ease",
    // backgroundColor: "red",
    backgroundColor:panelOpen?"red":"transparent",
    overflow: "hidden",
    padding: panelOpen ? "1rem" : "0",
  };

  
   
  

  // Default split layout
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div style={cardListStyle}>
        <CardList products={products} />
      </div>
      <div style={panelStyle}>
        <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
   <Route path="/checkout" element={<CheckoutPage />} />

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
            <Route path="/userhome" element={<UserHome products={products} />} />
            <Route path="/adminhome" element={<AdminHome products={products} />} />
          </Route>
</Routes>

      </div>
    </div>
  );

}

