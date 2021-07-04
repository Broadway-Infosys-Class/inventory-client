import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ILogin } from "../../interfaces";
import { useCookies } from "react-cookie";

const Register = () => {
  const [user, setUser] = useState({} as ILogin);
  const [cookies, setCookie] = useCookies(["token"]);

  const handleChange = (event: any) => {
    event.persist();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/user/signin",
      user
    );
    console.log(response);
    if (response.data.message === "Login Successful") {
      setCookie("token", response.data.token, { path: "/" });
    }
  };

  return (
    <div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
  );
};

export default Register;
