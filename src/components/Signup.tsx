import React, { ChangeEvent, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  InputOnChangeData,
  Loader,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userActons";
const mailformat = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

export const emailValidation = (email: string) => email.match(mailformat);

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordre, setPasswordRe] = useState("");
  const [usernamevalidation, setusernameValidation] = useState({});
  const [responseStatus, setResponseStatus] = useState(0);
  const [color, setColor] = useState("");
  const userSignup = useSelector((state: any) => state.userSignup);
  const { loading, data, error } = userSignup;
  const dispatch = useDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    if (data.name === "username") {
      setUsername(data.value);
    } else if (data.name === "firstname") {
      setFirstName(data.value);
    } else if (data.name === "lastname") {
      setLastName(data.value);
    } else if (data.name === "password") {
      setPassword(data.value);
    } else {
      setPasswordRe(data.value);
    }
  };

  const handleEmail = (
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    handleChange(event, data);
    if (!emailValidation(data.value)) {
      setusernameValidation({ error: "Invalid Email" });
    } else {
      setusernameValidation({});
    }
  };
  const signupValidation = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    const credentials = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      passwordre: passwordre,
    };
    if (!emailValidation(credentials.username)) {
      setusernameValidation({ error: "Invalid Email" });
    } else if (!(username && firstname && lastname && password && passwordre)) {
      setResponseStatus(123);
      setColor("#FDD4D1");
    } else if (!password.match(passwordre)) {
      setResponseStatus(124);
      setColor("#FDD4D1");
    } else {
      dispatch(signup(credentials));
    }
  };

  return (
    <Grid columns="three">
      <Grid.Row>
        <Grid.Column></Grid.Column>
        <Grid.Column>
          <Grid style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h3" textAlign="center" block>
                User Management System - Signup
              </Header>

              {data ? (
                <Header as="h4" style={{ backgroundColor: "#E9FDD1" }} block>
                  Registration Successfull! Verification mail sended!
                  Redirecting ...
                  <div style={{ display: "none" }}>
                    {setTimeout(() => {
                      window.location.href = "/";
                    }, 5000)}
                  </div>
                </Header>
              ) : null}

              {error ? (
                <Header as="h4" style={{ backgroundColor: "#FDD4D1" }} block>
                  {error}
                </Header>
              ) : null}

              {responseStatus === 123 ? (
                <Header as="h4" style={{ backgroundColor: color }} block>
                  Please fill all the fields!
                </Header>
              ) : null}

              {responseStatus === 124 ? (
                <Header as="h4" style={{ backgroundColor: color }} block>
                  Passwords missmatch!
                </Header>
              ) : null}
              <Form onSubmit={signupValidation}>
                <Form.Field>
                  <label>User Name (E-MAIL)</label>
                  <Form.Input
                    type="email"
                    placeholder="User Name"
                    name="username"
                    value={username}
                    onChange={handleEmail}
                    {...usernamevalidation}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Input
                    placeholder="First Name"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <Form.Input
                    placeholder="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Form.Input
                    type="Password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Re-Enter Password</label>
                  <Form.Input
                    type="Password"
                    placeholder="Password Re"
                    name="passwordre"
                    value={passwordre}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Grid columns={4} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button type="submit">Signup</Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Link to="/">
                        <Button>Login</Button>
                      </Link>
                    </Grid.Column>
                    {loading ? (
                      <Grid.Column>
                        <Loader size="small" active></Loader>
                      </Grid.Column>
                    ) : null}
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Signup;
