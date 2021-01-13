import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  InputOnChangeData,
  Loader,
} from "semantic-ui-react";
import auth from "../auth";
import { emailValidation } from "./Signup";

const Login = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fillField, setFillField] = useState({});
  const [badEmail, setBadEmail] = useState({});
  const [responseStatus, setResponseStatus] = useState(0);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotpass, setForgotpass] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    if (data.name === "username") {
      setUsername(data.value);
      setBadEmail({});
      auth.setUser({ username: data.value, firstname: "", lastname: "" });
    } else {
      setPassword(data.value);
      setFillField({});
    }
  };
  const loginValidation = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };

    if (!(credentials.username && credentials.password)) {
      if (!credentials.username) {
        setBadEmail({ error: "Fill the field!" });
      } else {
        setFillField({ error: "Fill the field!" });
      }
    } else if (!emailValidation(credentials.username)) {
      setBadEmail({ error: "Email error!" });
    } else {
      setLoading(true);
      axios
        .post("http://localhost:5000/user/login", credentials)
        .then((response) => {
          setLoading(false);

          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            props.history.push("/user");
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response !== undefined) {
            if (err.response.status === 403) {
              setResponseStatus(403);
              setColor("#FDD4D1");
            } else if (err.response.status === 500) {
              setResponseStatus(500);
              setColor("#FDD4D1");
            } else if (err.response.status === 404) {
              setResponseStatus(404);
              setColor("#FDD4D1");
            } else if (err.response.status === 401) {
              setResponseStatus(401);
              setColor("#FDD4D1");
              setForgotpass(true);
            }
          } else {
            setResponseStatus(500);
            setColor("#FDD4D1");
            setForgotpass(true);
          }
        });
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
                User Management System - Login
              </Header>

              {responseStatus === 500 ? (
                <Header as="h4" style={{ backgroundColor: color }} block>
                  Server Error: please try again!
                </Header>
              ) : null}

              {responseStatus === 401 ? (
                <Header as="h4" style={{ backgroundColor: color }} block>
                  Invalid password: please try again!
                </Header>
              ) : null}

              {responseStatus === 403 ? (
                <Header as="h4" style={{ backgroundColor: color }} block>
                  Account not activated: please check your mails!
                </Header>
              ) : null}

              {responseStatus === 404 ? (
                <Header as="h4" style={{ backgroundColor: color }} block>
                  User not found: please try again!
                </Header>
              ) : null}

              <Form onSubmit={loginValidation}>
                <Form.Field>
                  <label>User Name (E-MAIL)</label>
                  <Form.Input
                    type="email"
                    placeholder="User Name"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    {...badEmail}
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
                    {...fillField}
                    required
                  />
                </Form.Field>
                {forgotpass ? (
                  <Form.Field>
                    <p>
                      Forgot Password? <Link to="/forgot">Click here!</Link>
                    </p>
                  </Form.Field>
                ) : null}

                <Grid columns={4} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button type="submit">Login</Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Link to="/signup">
                        <Button>Signup</Button>
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

export default Login;
