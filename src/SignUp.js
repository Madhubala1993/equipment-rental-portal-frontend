import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { API } from "./global.js";

const formValidationSchema = yup.object({
  username: yup.string().required("Required"),
  mailid: yup
    .string()

    .required("Required"),
  password: yup
    .string()
    .min(8, "Password should be minimum of 8 characters")
    .required("Required"),
});

export function Signup() {
  const [auth, setAuth] = useState(" ");
  const history = useHistory();

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        mailid: "",
        password: "",
        confirmPwd: "",
        cartQty: 0,
      },
      validationSchema: formValidationSchema,
      onSubmit: (signupDatas) => {
        addSignup(signupDatas);
      },
    });
  const addSignup = (signupDatas) => {
    fetch(`${API}/users/signup`, {
      method: "POST",
      body: JSON.stringify(signupDatas),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) =>
        data.message === "Registered successfully"
          ? history.push("/login")
          : setAuth(data.message)
      );
  };
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="loginPage-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-container">
          <div className="details">
            {auth === " " ? " " : <p className="error-message">{auth}</p>}
            <p>Username</p>
            <TextField
              className="textfield"
              id="username"
              name="username"
              label="Enter Username"
              variant="outlined"
              onBlur={handleBlur}
              value={values.username}
              onChange={handleChange}
              error={touched.username && errors.username}
              helperText={touched.username && errors.username}
            />
            {touched.username && errors.username ? errors.username : ""}
            <p>Mail ID</p>
            <TextField
              className="textfield"
              id="mailid"
              name="mailid"
              label="Enter e-mail id"
              variant="outlined"
              onBlur={handleBlur}
              value={values.mailid}
              onChange={handleChange}
              error={touched.mailid && errors.mailid}
              helperText={touched.mailid && errors.mailid}
            />
            {touched.mailid && errors.mailid ? errors.mailid : ""}
            <p>Password</p>
            {showPwd ? (
              <div className="password-container">
                <TextField
                  className="textfield"
                  id="password"
                  name="password"
                  label="Enter Password"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                />
                {touched.password && errors.password ? errors.password : ""}
                <Button variant="outlined" onClick={() => setShowPwd(false)}>
                  <VisibilityOff />
                </Button>
              </div>
            ) : (
              <div className="password-container">
                <TextField
                  className="textfield"
                  id="password"
                  name="password"
                  label="Enter Password"
                  variant="outlined"
                  type="password"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                />
                {touched.password && errors.password ? errors.password : ""}
                <Button variant="outlined" onClick={() => setShowPwd(true)}>
                  <Visibility />
                </Button>
              </div>
            )}

            <p>Confirm Password</p>
            {showPwd ? (
              <div className="password-container">
                <TextField
                  className="textfield"
                  id="confirmPwd"
                  name="confirmPwd"
                  label="Confirm password"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.confirmPwd}
                  onChange={handleChange}
                  error={touched.confirmPwd && errors.confirmPwd}
                  helperText={touched.confirmPwd && errors.confirmPwd}
                />
                {touched.confirmPwd && errors.confirmPwd
                  ? errors.confirmPwd
                  : ""}
                <Button variant="outlined" onClick={() => setShowPwd(false)}>
                  <VisibilityOff />
                </Button>
              </div>
            ) : (
              <div className="password-container">
                <TextField
                  className="textfield"
                  id="confirmPwd"
                  name="confirmPwd"
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  onBlur={handleBlur}
                  value={values.confirmPwd}
                  onChange={handleChange}
                  error={touched.confirmPwd && errors.confirmPwd}
                  helperText={touched.confirmPwd && errors.confirmPwd}
                />
                {touched.confirmPwd && errors.confirmPwd
                  ? errors.confirmPwd
                  : ""}
                <Button variant="outlined" onClick={() => setShowPwd(true)}>
                  <Visibility />
                </Button>
              </div>
            )}
          </div>
          <br />
          <br />
          <br />
          <Button variant="outlined" type="submit">
            Sign Up
          </Button>
          <p>OR</p>
          <Button variant="outlined" onClick={() => history.push("/login")}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
