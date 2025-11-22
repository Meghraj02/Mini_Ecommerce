import CardList  from "./CardList";
import { DataContext } from "../App";
import { useContext } from "react";

export default function UserHome({ products }) {
  const { currentUser } = useContext(DataContext);

  return (
    <div style={{ backgroundColor: "pink", width: "100%", height: "75vh", overflowY: "auto" }}>
 
      <CardList products={products} />   
    </div>
  );
}
