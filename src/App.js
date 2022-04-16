import "./App.css";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { About } from "./About";
import { AppBar } from "./AppBar";
import { Footer } from "./Footer";
import { Login } from "./Login";
import { Signup } from "./SignUp";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { EquipmentsList } from "./EquipmentList";
import { API } from "./global.js";
import { Cart } from "./Cart";
import { useHistory } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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

export const cartCtx = createContext();
export default function App() {
  const history = useHistory();
  const [logout, setLogout] = useState("Logout");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/login");
    else history.push("/");
  }, [logout]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    fetch(`${API}/products/cart?user=${user}`)
      .then((data) => data.json())
      .then((cartItems) => setCart(cartItems));
  }, [logout]);

  const updateCart = ({ equipment, action }) => {
    // console.log(equipment);
    fetch(`${API}/products/cart?type=${action}`, {
      method: "PUT",
      body: JSON.stringify(equipment),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((latestCart) => setCart(latestCart));
  };

  const logoutHandler = (e) => {
    localStorage.clear();
    setLogout("Login");
  };

  const totalCartQty = cart
    .map((item) => item.qty)
    .reduce((sum, item) => sum + item, 0);

  console.log(logout);

  return (
    <div className="App">
      <cartCtx.Provider value={[cart, updateCart]}>
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
            <IconButton aria-label="cart" color="primary">
              <StyledBadge badgeContent={totalCartQty} color="secondary">
                <ShoppingCartIcon onClick={() => history.push(`/cart`)} />
              </StyledBadge>
            </IconButton>
            {logout === "Login" ? (
              ""
            ) : (
              <p> Logged in as {localStorage.getItem("user")}</p>
            )}

            {logout === "Login" ? "" : <ul onClick={logoutHandler}>Logout</ul>}
          </div>
        </div>

        <section className="router-container">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/cart">
              <Cart setCart={setCart} />
            </Route>
            <Route exact path="**">
              Not found
            </Route>
          </Switch>
        </section>
      </cartCtx.Provider>
    </div>
  );
}

function Products({ setCart }) {
  return (
    <div className="productspage-container">
      <div className="products-page">
        <EquipmentsList setCart={setCart} />
      </div>
      <Footer />
    </div>
  );
}
