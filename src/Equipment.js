import { useContext, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { UserContext } from "./UserContext";
import { cartCtx } from "./App";
import { useHistory } from "react-router-dom";

const currencyFormatter = (number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    number
  );

export function Equipment({ equipment, setCart }) {
  // const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [cart, updateCart] = useContext(cartCtx);
  const user = localStorage.getItem("user");
  equipment = { ...equipment, username: user };
  const history = useHistory();

  const handleClick = (newState) => () => {
    if (!localStorage.getItem("token")) history.push("/login");
    else {
      <Alert severity="success">Item added to cart</Alert>;
      // alert("button click catched");
      updateCart({ equipment, action: "increment" });
      setState({ open: true, ...newState });
    }
  };

  const handleClose = (event, reason) => {
    setState({ ...state, open: false });
  };

  const { vertical, horizontal, open } = state;
  return (
    <div className="equipment_container">
      <img
        className="pic_container"
        src={equipment.pic}
        alt={equipment.description}
      />
      <p className="description">{equipment.description}</p>
      <p className="rate">{currencyFormatter(equipment.rate)} /day</p>

      <Button
        variant="contained"
        onClick={handleClick({
          vertical: "top",
          horizontal: "right",
        })}
      >
        Add to cart
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Item added to cart succesfully
          </Alert>
        </Snackbar>
      </Button>
    </div>
  );
}
