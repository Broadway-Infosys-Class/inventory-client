import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ILogin } from "../../interfaces";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({} as ILogin);

  const handleChange = (event: any) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/user/signin",
      values
    );

    if (response.status === 200) {
      console.log(response);
      Cookies.set("token", response.data.token);
      history.push("/item");
    } else {
      console.log("Login Unsuccessfull! ");
    }
  };
  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <div className="title-wrapper">
          <h3 className="login-title">Login</h3>
        </div>
        <div className="form-wrapper">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
