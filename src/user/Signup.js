import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <TextField
          fullWidth
          id="outlined-search"
          onChange={handleChange("name")}
          value={name}
          label="Name"
          type="text"
          variant="outlined"
        />
      </div>

      <div className="form-group">
        <TextField
          fullWidth
          id="outlined-search"
          onChange={handleChange("email")}
          value={email}
          label="Email"
          type="email"
          variant="outlined"
        />{" "}
      </div>

      <div className="form-group">
        <TextField
          fullWidth
          id="outlined-search"
          onChange={handleChange("password")}
          value={password}
          label="Password"
          type="password"
          variant="outlined"
        />{" "}
      </div>
      <Button onClick={clickSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
