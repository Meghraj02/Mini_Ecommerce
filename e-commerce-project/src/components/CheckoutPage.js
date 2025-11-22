import React, { useContext } from "react";
import {
  Box, Grid, Paper, Typography, IconButton,
  Button, Divider, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";

export default function CheckoutPage() {
  const ctx = useContext(DataContext) || {};
  const {
    cart = [],
    increment = () => {},
    decrement = () => {},
    clearCart = () => {},
  } = ctx;

  const navigate = useNavigate();

  const DELIVERY_FEE = 40;
  const TAX_PERCENT = 0.05;

  // subtotal calculation
  const subtotal = cart.reduce(
    (sum, item) => sum + (parseInt(item.price.replace("₹", "")) || 0) * item.qty,
    0
  );
  const tax = Math.round(subtotal * TAX_PERCENT);
  const total = subtotal + tax + (subtotal > 0 ? DELIVERY_FEE : 0);

  // 🔹 UPDATED placeOrder
  const placeOrder = async () => {
    if (cart.length === 0) return;

    // build order object
    const orderData = {
      items: cart,
      subtotal,
      tax,
      deliveryFee: subtotal > 0 ? DELIVERY_FEE : 0,
      total,
      date: new Date().toISOString(),
      status: "Pending",
    };

    try {
      // 🔹 Save to db.json (JSON Server endpoint)
      await axios.post("http://localhost:3005/orders", orderData);

      alert("✅ Order successfully placed!");
      clearCart();
      navigate("/"); // go back to home
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
        Checkout – Dairy Delights
      </Typography>

      <Grid container spacing={3}>
        {/* Left - Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Your Order
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {cart.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="h6">Your cart is empty</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/")}
                >
                  Browse Products
                </Button>
              </Box>
            ) : (
              <List>
                {cart.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton size="small" onClick={() => decrement(item, 1)}>
                          <RemoveIcon />
                        </IconButton>
                        <Box sx={{ minWidth: 26, textAlign: "center", fontWeight: 700 }}>
                          {item.qty}
                        </Box>
                        <IconButton size="small" onClick={() => increment(item, 1)}>
                          <AddIcon />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={item.image}
                        sx={{ width: 64, height: 64, mr: 1, borderRadius: 1 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 700 }}>{item.productName}</Typography>}
                      secondary={<Typography sx={{ color: "#666" }}>₹{item.price}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Right - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, position: { md: "sticky" }, top: 88 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Order Summary
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>₹{subtotal}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography>Delivery Fee</Typography>
                <Typography>₹{subtotal > 0 ? DELIVERY_FEE : 0}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography>Taxes & Charges</Typography>
                <Typography>₹{tax}</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Grand Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  ₹{total}
                </Typography>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 2, py: 1.25, fontWeight: 800 }}
                onClick={placeOrder}
                disabled={cart.length === 0}
              >
                Place order
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={{ mt: 1 }}
                onClick={() => clearCart()}
              >
                Clear cart
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
