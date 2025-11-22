
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../App";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  IconButton,
  Badge,
  Tooltip,
  Stack
} from "@mui/material";

export default function Header({ st, onSearchEvent, onSort }) {
  const {
    IsLoggedIn,
    currentUser,
    setIsLoggedIn,
    setcurrentUser,
    totals = { totalItems: 0, uniqueItems: 0, subtotal: 0 },
    clearCart,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const logoff = () => {
    setcurrentUser({});
    setIsLoggedIn(false);
    clearCart();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: "none", color: "white" }}>
          Ecommerce
        </Typography>

        {/* Search & Sort */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={st}
            onInput={onSearchEvent}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          <RadioGroup row onChange={(e) => onSort(e.target.value)} defaultValue="">
            <FormControlLabel value="priceAsc" control={<Radio size="small" />} label="Price ↑" sx={{ color: "white" }} />
            <FormControlLabel value="nameDesc" control={<Radio size="small" />} label="Name ↓" sx={{ color: "white" }} />
          </RadioGroup>
        </Stack>

        {/* User Links / Cart */}
        <Stack direction="row" spacing={2} alignItems="center">
          {!IsLoggedIn ? (
            <>
              <Button component={Link} to="/home" variant="contained" color="secondary">Home</Button>
              <Button component={Link} to="/signup" variant="contained" color="secondary">Signup</Button>
              <Button component={Link} to="/login" variant="contained" color="secondary">Login</Button>
            </>
          ) : (
            <>
              {currentUser?.role === "Role_User" && (
                <Tooltip title={`${totals.uniqueItems} unique items • ${totals.totalItems} total`}>
                  <IconButton component={Link} to="/checkout" color="inherit">
                    <Badge badgeContent={totals.totalItems} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
              <Button variant="contained" color="error" onClick={logoff}>Logout</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
