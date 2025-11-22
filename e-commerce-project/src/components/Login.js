

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { setIsLoggedIn, setcurrentUser } = useContext(DataContext);

  const loginCheck = (data) => {
   // let url = "http://localhost:3006/users?emailid=" + data.emailid;
    let url = "http://localhost:3006/users?emailid=" + data.emailid;

    
    axios
      .get(url)
      .then((resp) => {
        if (resp.data.length === 0) {
          alert("Login failed, emailid is wrong...");
        } else {
          if (resp.data[0].password === data.password) {
            alert("Login success...");
            setIsLoggedIn(true);
            setcurrentUser(resp.data[0]);

            if (resp.data[0].role === "Role_Admin") navigate("/adminhome");
            else if (resp.data[0].role === "Role_User") navigate("/userhome");
          } else {
            alert("Login failed, password is wrong...");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",  // soft light grey
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", color: "#4a90e2", marginBottom: "20px" }}>Login</h2>

        <form onSubmit={handleSubmit(loginCheck)}>
          <label style={{ color: "#555" }}>Email:</label><br/>
          <input
            type="text"
            {...register("emailid")}
            placeholder="your@email.com"
            style={{
              width: "100%",
              padding: "8px",
              margin: "6px 0 12px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          /><br/>

          <label style={{ color: "#555" }}>Password:</label><br/>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
            style={{
              width: "100%",
              padding: "8px",
              margin: "6px 0 16px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          /><br/>

          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4a90e2",  // primary blue
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "8px"
          }}>Login</button>

          <button type="button" onClick={() => reset()} style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#f5f5f5",  // light grey
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}>Clear</button>
        </form>

        <p style={{ fontSize: "0.85rem", textAlign: "center", marginTop: "12px", color: "#555" }}>
          Don't have an account? <span
            style={{ color: "#4a90e2", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >Sign Up</span>
        </p>
      </div>
    </div>
  );
}
