import React from 'react';
import Card from './Card';



export default function CardList({products}) {
  return (
    <div style={{padding: '40px',backgroundColor: 'white', borderTop: '1px solid #ccc', 
      borderBottom: '1px solid #ccc',overflow:"auto"
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
       justifyContent: 'space-around'
      }}>
        {
          products.map(product=> (
          // <Card key={product.id} products={products} />
          <Card key={product.id} product={product} /> 

        ))}
      </div>
    </div>
  );
}
