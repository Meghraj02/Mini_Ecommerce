import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start", // align all columns to top
        backgroundColor: "#1f2937",
        color: "#f3f4f6",
        padding: "40px 60px",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {/* Copyright */}
      <div style={{ flex: "1", minWidth: "200px" }}>
        <p style={{ margin: "5px 0", fontWeight: "bold" }}>© 2024 Ecommerce</p>
        <p style={{ margin: "5px 0" }}>All Rights Reserved.</p>
      </div>

      {/* Know Us */}
      <div style={{ flex: "1", minWidth: "150px" }}>
        <h4 style={{ marginBottom: "15px", color: "#fbbf24" }}>Know Us</h4>
        <p
          style={{ margin: "5px 0", cursor: "pointer", transition: "0.3s", color: "#f3f4f6" }}
          onMouseEnter={e => e.target.style.color = "#fbbf24"}
          onMouseLeave={e => e.target.style.color = "#f3f4f6"}
        >
          Contact Us
        </p>
        <p
          style={{ margin: "5px 0", cursor: "pointer", transition: "0.3s", color: "#f3f4f6" }}
          onMouseEnter={e => e.target.style.color = "#fbbf24"}
          onMouseLeave={e => e.target.style.color = "#f3f4f6"}
        >
          About Us
        </p>
      </div>

      {/* Need Help */}
      <div style={{ flex: "1", minWidth: "150px" }}>
        <h4 style={{ marginBottom: "15px", color: "#fbbf24" }}>Need Help</h4>
        <p
          style={{ margin: "5px 0", cursor: "pointer", transition: "0.3s", color: "#f3f4f6" }}
          onMouseEnter={e => e.target.style.color = "#fbbf24"}
          onMouseLeave={e => e.target.style.color = "#f3f4f6"}
        >
          FAQ
        </p>
        <p
          style={{ margin: "5px 0", cursor: "pointer", transition: "0.3s", color: "#f3f4f6" }}
          onMouseEnter={e => e.target.style.color = "#fbbf24"}
          onMouseLeave={e => e.target.style.color = "#f3f4f6"}
        >
          Terms & Conditions
        </p>
      </div>
    </div>
  );
}
