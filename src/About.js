import { AppBar } from "./AppBar";
import { Footer } from "./Footer";

export function About() {
  return (
    <div className="aboutuspage-container">
      {/* <AppBar /> */}
      <div className="aboutpage-container">
        <h1 style={{ marginLeft: "200px" }}>
          Home <span style={{ color: "goldenrod" }}> / About </span>
        </h1>
      </div>
      <div className="aboutpage-content">
        <img
          className="camera-pic"
          src="https://images.ctfassets.net/u0haasspfa6q/2isy73Vk2y4mwga7R8pL9A/61f190eca8562649366ec2b0a2d12f66/best_camera_lens_accessories_wedding_photography"
          alt="accessories-pic"
        />
        <div style={{ marginLeft: "30px" }}>
          <h1 style={{ fontSize: "40px" }}>About-Us</h1>

          <p style={{ width: "60%" }}>
            Equipment Rental Portal serves thousands of photographers and
            videographers annually, always while maintaining the values of our
            founder – share the best available equipment at its optimum quality,
            and educate and provide support to our customers to ensure they can
            achieve their goals regardless of experience level. We carry camera
            bodies and lenses almost in every format from every major
            manufacturer, and all the audio, lighting and support accessories
            needed to cover any kind of shoot, from a family holiday card to a
            commercial advertising job. All equipment available with us are
            frequently inspected for Technical errors to avoid any issues to the
            user.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
