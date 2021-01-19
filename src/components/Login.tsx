import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  InputOnChangeData,
  Loader,
} from "semantic-ui-react";
import { getUserSingle, login } from "../actions/userActons";
import auth from "../auth";
import { emailValidation } from "./Signup";

const Login = (props: RouteComponentProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fillField, setFillField] = useState({});
  const [badEmail, setBadEmail] = useState({});
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, data, error } = userLogin;
  const getUser = useSelector((state: any) => state.getUser);
  const { dataUser } = getUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("user", username);
    }

    if (data) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      props.history.push("/user");
    }
  }, [data, dataUser, props.history, username]);

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
      dispatch(login(credentials));
      dispatch(getUserSingle(username));
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

              {error ? (
                <Header as="h4" style={{ backgroundColor: "#FDD4D1" }} block>
                  Invalid username or password!
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
                {error && dataUser ? (
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
