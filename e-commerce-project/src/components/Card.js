import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';

export default function Card({ product }) {
  const { currentUser, cart = [], addOrUpdate } = useContext(DataContext);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const existing = cart.find((c) => c.id === product.id);
    setQty(existing ? existing.qty : 0);
  }, [cart, product.id]);

  const handleIncrease = () => {
    if (currentUser?.role === 'Role_User') {
      addOrUpdate(product, qty + 1);
    }
  };

  const handleDecrease = () => {
    if (currentUser?.role === 'Role_User') {
      addOrUpdate(product, Math.max(0, qty - 1));
    }
  };

  const formatPrice = (priceString) => {
    return parseFloat(priceString).toFixed(2);
  };

  return (
    <div
      style={{
        width: '25%',
        minWidth: '220px',
        backgroundColor: '#e9ebf0',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '12px',
        minHeight: '330px',
        maxHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '10px'
      }}
    >
      {/* Product Image */}
      <div style={{ flexGrow: 1, overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.productName}
          style={{
            width: '100%',
            borderRadius: '8px',
            height: '200px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Product Text */}
      <div style={{ marginTop: '8px' }}>
        <p style={{ fontWeight: 'bold', color: 'black', margin: '0 0 4px 0', lineHeight: '1.2' }}>
          {product.productName}
        </p>

        {/* Product Description */}
        <p
          style={{
            color: '#333',
            margin: '4px 0',
            fontSize: '14px',
            height: '45px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.description}
        </p>

        <p style={{ fontWeight: '700', color: '#E23744', margin: '0 0 10px 0' }}>
          ₹{formatPrice(product.price)}
        </p>
      </div>

      {/* Add to Cart / Qty Control */}
      {currentUser?.role === 'Role_User' &&
        (qty === 0 ? (
          <button
            onClick={handleIncrease}
            style={{
              width: '25%',
              marginTop: '5px',
              padding: '8px 12px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Add to Cart
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '4px'
            }}
          >
            <button onClick={handleDecrease} style={buttonStyle('red')}>
              -
            </button>
            <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
              {qty}
            </span>
            <button onClick={handleIncrease} style={buttonStyle('green')}>
              +
            </button>
          </div>
        ))}
    </div>
  );
}

// Button Style
const buttonStyle = (color) => ({
  background: color,
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
});
