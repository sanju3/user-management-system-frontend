import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  InputOnChangeData,
} from "semantic-ui-react";
import auth from "../auth";

const Forgot = () => {
  const [username, setUserName] = useState("");
  const [random, setRandom] = useState("");
  const [randomVisibility, setRandomVisibility] = useState(false);
  const [randomGen, setRandomGen] = useState("");
  const [randomGenErr, setRandomGenErr] = useState("");
  const [randomGenMsg, setRandomGenMsg] = useState("");
  const [counter, setCounter] = useState(0);
  const [expire, setExpire] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const usr = auth.getUser().username;

  useEffect(() => {
    setUserName(usr);
    axios
      .post("http://localhost:5000/user/getsingle", {
        username: usr,
      })
      .then((res) => {
        if (res.status !== 200) {
          window.location.href = "/";
        } else if (!res.data.status) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href = "/";
      });
  }, [usr]);

  const handleChangeRanndom = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setRandom(data.value);
  };

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setPassword(data.value);
  };

  const forgotValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRandomGenErr("");
    setRandomGenMsg("");
    setSuccessMessage("");
    if (passwordVisibility) {
      const credentials = {
        username: username,
        password: password,
      };

      axios
        .post("http://localhost:5000/user/setpassword", credentials)
        .then((res) => {
          if (res.status === 200) {
            setSuccessMessage("Password chainged to: " + password);
            setTimeout(() => {
              window.location.href = "/";
            }, 5000);
          } else {
            setRandomGenErr("Error: Try again!");
          }
        })
        .catch((err) => {
          setRandomGenErr("Error: Try again!");
        });
    } else if (randomVisibility) {
      //shit
      if (randomGen === random) {
        setPasswordVisibility(true);
        setRandomVisibility(false);
      } else {
        setRandomGenErr("Error: Try again!");
      }
    } else {
      //mail thing
      if (!username) {
        window.location.href = "/";
      } else {
        axios
          .post("http://localhost:5000/user/getrandom", { username: username })
          .then((res) => {
            if (res.status === 200) {
              setRandomGen(res.data.random);
              setRandomGenMsg("Verification code sended!");
              setRandomVisibility(true);
              for (let i = 0; i < 120000; i += 1000) {
                setTimeout(() => {
                  setCounter(119 - i / 1000);
                  if (i === 119000) {
                    setExpire("Expired!");
                    setRandomGen("");
                  }
                }, i);
              }
            }
          })
          .catch((err) => {
            setRandomGenErr("Error: Try again!");
          });
      }
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
                User Management System - Recover Password
              </Header>

              {randomGenErr ? (
                <Header as="h4" style={{ backgroundColor: "#FDD4D1" }} block>
                  "Error: Try again!"
                </Header>
              ) : null}

              {randomGenMsg ? (
                <Header as="h4" style={{ backgroundColor: "#E9FDD1" }} block>
                  "Verification code sended Please check your mails!"
                </Header>
              ) : null}

              {successMessage ? (
                <Header as="h4" style={{ backgroundColor: "#E9FDD1" }} block>
                  "Password chainged success fully!"
                </Header>
              ) : null}

              <Form onSubmit={forgotValidation}>
                <Form.Field>
                  <h4 className="ui red header">Username (E-MAIL)</h4>
                  <Form.Input
                    type="email"
                    placeholder="User Name"
                    name="username"
                    value={username}
                    disabled
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                    error
                    focus
                  />
                </Form.Field>
                {randomVisibility ? (
                  <Form.Field>
                    <h4 className="ui red header">
                      Validation text{" ===> "}
                      {Math.floor((counter % 3600) / 60) < 10
                        ? "0" + Math.floor((counter % 3600) / 60)
                        : Math.floor((counter % 3600) / 60)}{" "}
                      :{" "}
                      {Math.floor((counter % 3600) % 60) < 10
                        ? "0" + Math.floor((counter % 3600) % 60)
                        : Math.floor((counter % 3600) % 60)}{" "}
                      {" " + expire}
                    </h4>
                    <Form.Input
                      type="text"
                      placeholder="Validation text"
                      name="random"
                      value={random}
                      onChange={handleChangeRanndom}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                      focus
                    />
                  </Form.Field>
                ) : null}

                {passwordVisibility ? (
                  <Form.Field>
                    <h4 className="ui red header">New password</h4>
                    <Form.Input
                      type="password"
                      placeholder="New password"
                      name="password"
                      value={password}
                      onChange={handleChangePassword}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                      focus
                    />
                  </Form.Field>
                ) : null}

                <Grid columns={4} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button type="submit">Recover</Button>
                    </Grid.Column>

                    <Grid.Column>
                      <Link to="/">
                        <Button>Back</Button>
                      </Link>
                    </Grid.Column>
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

export default Forgot;
