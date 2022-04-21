import { Alert, Button, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { API } from "./global";
import { cartCtx, UserContext } from "./App.js";

const currencyFormatter = (number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    number
  );

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
// const __DEV__ = document.domain === "equipmentp-rental-portal.herokuapp";

export function Cart({ setCart }) {
  const history = useHistory();
  const [cart, updateCart] = useContext(cartCtx);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const user = localStorage.getItem("user");
  useEffect(() => {
    fetch(`${API}/products/${user}`)
      .then((data) => data.json())
      .then((cartItems) => setCart(cartItems));
  }, []);

  const CheckOut = () => {
    fetch(`${API}/products/checkout/${user}`, {
      method: "POST",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((latestCart) => setCart(latestCart))
      .then(() =>
        handleClick({
          vertical: "top",
          horizontal: "right",
        })
      )
      .then(() => setTimeout(() => history.push("/"), 3000));
  };

  const total = cart
    .map((item) => item.qty * item.rate)
    .reduce((sum, item) => sum + item, 0);

  async function displayRazorpay() {
    // handler: function (response) {
    alert(
      `Make payment. You wont be charged. Enter yout mobile number and select card payment. Enter card number as 4111111111111 and any expiry date and cvv and proceed. You will get OTP number for your mobile and the payment will be succeeded. 
      Note: You wont be charged for making payment`
    );
    // CheckOut();
    // }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection ");
      return;
    }
    const data = await fetch(`${API}/razorpay`, {
      method: "POST",
      body: JSON.stringify({ amount: total }),
      headers: { "Content-Type": "application/json" },
    }).then((t) => t.json());
    console.log(data);

    const options = {
      key: "rzp_test_6fHFrUpcWB8dL5", // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(),
      currency: data.currency,
      name: "Equipment_Rental",
      description: "Thankyou for purchasing",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Success");
        CheckOut();
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        // contact: "9999999999",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <section className="cart-list">
      <h2>Purchase Items</h2>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Order Placed Successfully !
        </Alert>
      </Snackbar>
      <div className="phone-list-container">
        {cart.map((equipment) => (
          <div className="cartPage-container">
            <CartDisplay equipment={equipment} key={equipment._id} />
          </div>
        ))}
      </div>
      <div className="cart-checkout">
        <h1>{currencyFormatter(total)}</h1>
        <Button variant="outlined" onClick={displayRazorpay}>
          ✔ Checkout
        </Button>
      </div>
    </section>
  );
}

function CartDisplay({ equipment }) {
  const [cart, updateCart] = useContext(cartCtx);
  const user = localStorage.getItem("user");
  equipment = { ...equipment, username: user };
  return (
    <div className="cartItem-container">
      <img
        src={equipment.pic}
        alt={equipment.description}
        className="cartItem-picture"
      />
      <div>
        <h2 className="cartItem-name">{equipment.description}</h2>
        <p className="cartItem-price">{currencyFormatter(equipment.rate)}</p>
        <p className="cartItem-quantity">
          <Button
            variant="outlined"
            onClick={() => updateCart({ equipment, action: "decrement" })}
          >
            -
          </Button>
          {equipment.qty} days
          <Button
            variant="outlined"
            onClick={() => updateCart({ equipment, action: "increment" })}
          >
            +
          </Button>
        </p>
      </div>
      <p className="subtotal-price">
        SubTotal : {currencyFormatter(equipment.qty * equipment.rate)}
      </p>
    </div>
  );
}
