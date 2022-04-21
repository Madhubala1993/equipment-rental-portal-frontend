import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { AppBar } from "./AppBar";
import { Footer } from "./Footer";
import { API } from "./global";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function HomePage({ setLogin, setCart }) {
  // const [log, cartDatas, updateLogin] = useContext(UserContext);
  // const user = localStorage.getItem("user");
  // useEffect(() => {
  //   fetch(`${API}/users/logindb`)
  //     .then((data) => data.json())
  //     .then((data) => setLogin(user));
  // }, []);

  return (
    <div className="main-container">
      <AboutContainer />
      <SampleProducts />
      <Services />
      <MailBox />
      <Footer />
    </div>
  );
}
function AboutContainer() {
  return (
    <div className="about-container">
      <div className="about-wordings">
        <p className="heading">Explore our Equipments</p>
        <p className="about-content">
          We provide many equipments related to the photography at lowest rent
          amount. Choose your favourite equipments and rent it. In a medium to
          ease the renting of equipments for Photographers, Cinematographers and
          the media Industry, Equipment Rental Portal has grown from a one-man
          operation in a spare bedroom to a company with team of experienced
          professionals who are dedicated towards providing best and hassle free
          services for all your renting needs. The Team of employees,
          experienced photo and video technicians, and the best customer service
          representatives in the industry makes us the best available option.
        </p>
        <button className="rentnow-button">Rent Now</button>
      </div>
      <img
        className="camera-pic"
        src="https://images.ctfassets.net/u0haasspfa6q/2isy73Vk2y4mwga7R8pL9A/61f190eca8562649366ec2b0a2d12f66/best_camera_lens_accessories_wedding_photography"
        alt="camera-pic"
      />
    </div>
  );
}

function SampleProducts() {
  const history = useHistory();
  return (
    <div className="sample-products">
      <div className="heading-box">
        <p className="sample-heading">Most Popular Products</p>
        <div className="sample-border"></div>
      </div>
      <div>
        <div className="sampleproducts-list">
          <div className="sampleproduct">
            <img
              className="product-pic"
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSWQNEoxl-yhp1mptY8A1J1QT-JR4wlrDYMpL_Gn4XZfqf8J5g0gTfJAQUTFusCjCiPdQLsBCbwfPxmDe7xnnCWF2LNQ4Kw&usqp=CAE"
              alt=""
            />
            <div className="product-spec">
              <p>Sony FDR-AX43 UHD 4K Camcorder</p>
              <p className="rate">₹3000 /day</p>
            </div>
          </div>

          <div className="sampleproduct">
            <img
              className="product-pic"
              src="https://kmlglobal.in/wp-content/uploads/2021/10/canon_1957c002_speedlite_470ex_ai_1519599039_1393465.jpg?v=1636201281"
              alt=""
            />
            <div className="product-spec">
              <p>Canon Speedlite 470EX-AI</p>
              <p className="rate">₹800 /day</p>
            </div>
          </div>

          <div className="sampleproduct">
            <img
              className="product-pic"
              src="https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/rode_videomic_me_and_facebook_1551261502_1275477.jpg"
              alt=""
            />
            <div className="product-spec">
              <p> Rode VideoMic</p>
              <p className="rate">₹1000 /day</p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="rentnow-button"
        onClick={() => history.push("/products")}
      >
        All Products
      </button>
    </div>
  );
}

function Services() {
  return (
    <div className="services-container">
      <div className="services-title">
        <div className="services-heading">
          <p>Services Built For You</p>
        </div>
        <div className="services-content">
          <p>
            Rent Modern And New Equipments Online At Our Rental Portal - Make
            Your Party Or Events Even More Special At Lowest Price
          </p>
        </div>
      </div>

      <div className="services-categories">
        <div>
          <Card className="card-container" sx={{ backgroundColor: "#FFD700" }}>
            <img
              className="symbol-container"
              src="https://thumbs.dreamstime.com/b/customisation-vector-icon-customize-illustration-sign-mechanical-symbol-web-sites-mobile-customisation-vector-icon-175271268.jpg"
              alt=""
            />
            <h3>Custom Build</h3>
            <p className="para-content">
              Get equipments built by your preference and style at very
              effective costs
            </p>
          </Card>
        </div>
        <div>
          <Card className="card-container" sx={{ backgroundColor: "#FFD700" }}>
            <img
              className="symbol-container"
              src="https://media.istockphoto.com/vectors/quality-icon-vector-icon-simple-element-illustration-quality-symbol-vector-id1007786180?k=20&m=1007786180&s=170667a&w=0&h=JT2LhSjfQlCqaKYD7L-RW5m-J_rxUwIfYCV4Ynoa-So="
              alt=""
            />
            <h3>Custom Build</h3>
            <p className="para-content">
              Feel and experience the quality of our wide range of products
            </p>
          </Card>
        </div>
        <div>
          <Card className="card-container" sx={{ backgroundColor: "#FFD700" }}>
            <img
              className="symbol-container"
              src="https://cdn2.vectorstock.com/i/1000x1000/71/16/social-media-positive-feedback-icon-vector-26487116.jpg"
              alt=""
            />
            <h3>consultant experts</h3>
            <p className="para-content">
              Get experts suggestions from our experts consultation and
              profressional guidance
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MailBox() {
  return (
    <div className="footer-container">
      <div className="footer-box">
        <div className="footer-content">
          <h1>Join our newsletter and get 20% off</h1>
          <p style={{ color: "#0073cf" }}>
            Leave your email below and get regular updates about our products
            and discount options. You can unsubscribe anytime you want.
          </p>
        </div>
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder=""
              inputProps={{ "aria-label": "Enter yout email" }}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="text">Subscribe</Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}
