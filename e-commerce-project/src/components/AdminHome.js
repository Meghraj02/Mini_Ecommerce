
// export default function AdminHome({ products }) 
// {
//   return (
//     <div style={{ backgroundColor: "pink", width: "100%", height: "75vh", overflowY: "auto" }}>
//       {/* Header row */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "50px 100px 150px 80px 120px 200px 200px 100px",
//           backgroundColor: "lightblue",
//           padding: "10px",
//           fontWeight: "bold"
//         }}
//       >
//         <p>ID</p>
//         <p>Image</p>
//         <p>Product Name</p>
//         <p>Price</p>
//         <p>Category</p>
//         <p>Description</p>
//         <p>Nutritional Value</p>
//         <p>Action</p>
//       </div>

//       {/* Data rows */}
//       {products.map((p) => (
//         <div
//           key={p.id}
//           style={{
//             display: "grid",
//             gridTemplateColumns: "50px 100px 150px 80px 120px 200px 200px 100px",
//             padding: "10px",
//             borderBottom: "1px solid #ccc",
//             alignItems: "center"
//           }}
//         >
//           <p>{p.id}</p>
//           <img
//             src={p.image}
//             alt={p.productName}
//             style={{ width: "80px", height: "60px", objectFit: "cover" }}
//           />
//           <p>{p.productName}</p>
//           <p>{p.price}</p>
//           <p>{p.category}</p>
//           <p>{p.description}</p>
//           <p>{p.nutritionalValue}</p>
//          <div style={{ display: "flex", gap: "5px" }}>
//             <button style={{ padding: "5px 10px" }}>Edit</button>
//             <button style={{ padding: "5px 10px" }}>Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
