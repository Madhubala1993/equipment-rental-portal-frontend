import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { API } from "./global";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function AppBar({ cart }) {
  // const [logout, setLogout] = useState(false);
  // const [log, cart, updateLogin] = useContext(UserContext);

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) history.push("/login");
  // }, [logout]);

  // useEffect(() => {
  //   fetch(`${API}/users/cart`)
  //     .then((data) => data.json())
  //     .then((cartItems) => setCart(cartItems));
  // }, []);

  const history = useHistory();
  // const logoutHandler = (e) => {
  //   localStorage.removeItem("token", "user");
  //   setLogout(true);
  // };
  const totalCartQty = cart
    .map((item) => item.qty)
    .reduce((sum, item) => sum + item, 0);

  return (
    <div className="appbar-container">
      <div className="logo-container">
        <img className="logo" src="logo.png" alt="logo" />
      </div>
      <div className="appbar-items">
        <ul onClick={() => history.push("/")}>Home</ul>
        <ul onClick={() => history.push("/about")}>About</ul>
        <ul onClick={() => history.push("/products")}>Products</ul>
      </div>
      <div className="log-items">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={totalCartQty} color="secondary">
            <ShoppingCartIcon onClick={() => history.push(`/cart`)} />
          </StyledBadge>
        </IconButton>

        {/* <p> Logged in as {log}</p>
        <ul onClick={logoutHandler}>Logout</ul> */}
      </div>
    </div>
  );
}
