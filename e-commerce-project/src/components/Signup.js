
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const [serverMessage, setServerMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const onSubmit = (data) => {
    data.role = "Role_User";

    axios
      .post("http://localhost:3006/users", data)
      .then((resp) => {
        setServerMessage("Signup successful!");
        setMessageType("success");
        reset();
      })
      .catch((err) => {
        setServerMessage("Signup failed. Please try again.");
        setMessageType("error");
        console.error(err);
      });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Signup Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label style={styles.label}>Email ID</label>
          <input
            type="text"
            style={errors.emailid ? { ...styles.input, ...styles.errorInput } : styles.input}
            {...register("emailid", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
          {errors.emailid && <span style={styles.errorText}>{errors.emailid.message}</span>}

          {/* Password */}
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={errors.password ? { ...styles.input, ...styles.errorInput } : styles.input}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 chars" },
            })}
          />
          {errors.password && <span style={styles.errorText}>{errors.password.message}</span>}

          {/* Name */}
          <label style={styles.label}>Name</label>
          <input
            type="text"
            style={errors.name ? { ...styles.input, ...styles.errorInput } : styles.input}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 chars" },
            })}
          />
          {errors.name && <span style={styles.errorText}>{errors.name.message}</span>}

          {/* Address */}
          <label style={styles.label}>Address</label>
          <input
            type="text"
            style={errors.address ? { ...styles.input, ...styles.errorInput } : styles.input}
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <span style={styles.errorText}>{errors.address.message}</span>}

          {/* Mobile No */}
          <label style={styles.label}>Mobile No</label>
          <input
            type="text"
            style={errors.mobileno ? { ...styles.input, ...styles.errorInput } : styles.input}
            {...register("mobileno", {
              required: "Mobile number is required",
              pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
            })}
          />
          {errors.mobileno && <span style={styles.errorText}>{errors.mobileno.message}</span>}

          {/* Buttons */}
          <button type="submit" style={styles.submitBtn}>
            Signup
          </button>
          <button type="reset" style={styles.clearBtn} onClick={() => reset()}>
            Clear
          </button>
        </form>

        {serverMessage && (
          <div style={messageType === "success" ? styles.successMsg : styles.errorMsg}>
            {serverMessage}
          </div>
        )}
      </div>
    </div>
  );
}

// --------- Inline Styles ---------
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)", // nice gradient
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "450px",
    padding: "30px",
    backgroundColor: "#ffffff", // white card
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#1976d2",
    marginBottom: "25px",
    fontWeight: 600,
  },
  label: {
    display: "block",
    fontWeight: 500,
    marginTop: "15px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  errorInput: {
    borderColor: "#f44336",
  },
  errorText: {
    color: "#f44336",
    fontSize: "12px",
    marginTop: "3px",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
  clearBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
  },
  successMsg: {
    color: "#4caf50",
    fontWeight: 500,
    marginTop: "15px",
    textAlign: "center",
  },
  errorMsg: {
    color: "#f44336",
    fontWeight: 500,
    marginTop: "15px",
    textAlign: "center",
  },
};
