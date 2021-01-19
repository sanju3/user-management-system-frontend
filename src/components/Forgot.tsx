import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  InputOnChangeData,
  Loader,
} from "semantic-ui-react";
import { getRandomString, updatePassword } from "../actions/userActons";

const Forgot = () => {
  const [random, setRandom] = useState("");
  const [password, setPassword] = useState("");
  const usr = localStorage.getItem("user");
  const [recover, setRecover] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [save, setSave] = useState(false);
  const [randomError, setRandomError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!usr) {
      window.location.href = "/";
    }
  }, [usr]);

  const updateUserPassword = useSelector(
    (state: any) => state.updateUserPassword
  );
  const { loadingPassword, dataPassword, errorPassword } = updateUserPassword;
  const randomString = useSelector((state: any) => state.randomString);
  let { loadingRandom, dataRandom, errorRandom } = randomString;
  const dispatch = useDispatch();

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

  const handleConfirm = () => {
    if (random !== "" && random === dataRandom.data.random) {
      setConfirm(false);
      setSave(true);
      setShow(false);
    } else {
      setShow(false);
      setRandomError(true);
    }
  };

  const handleSave = () => {
    if (password !== "") {
      dispatch(updatePassword(usr!, password));
      //setShow(false);
    }
  };

  const handleRecover = () => {
    if (usr) {
      setShow(true);
      dispatch(getRandomString(usr));
      setRecover(false);
      setConfirm(true);
    } else {
      setRandomError(true);
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
              {dataPassword ? (
                <Header as="h4" style={{ backgroundColor: "#E9FDD1" }} block>
                  <div style={{ display: "none" }}>
                    {setTimeout(() => {
                      window.location.href = "/";
                    }, 5000)}
                  </div>
                  Password Changed!
                  <br />
                  Redirecting ...
                </Header>
              ) : null}

              {dataRandom && show ? (
                <Header as="h4" style={{ backgroundColor: "#E9FDD1" }} block>
                  Verification code sended, Check your mails!
                </Header>
              ) : null}

              {errorPassword || errorRandom || randomError ? (
                <Header as="h4" style={{ backgroundColor: "#FDD4D1" }} block>
                  <div style={{ display: "none" }}>
                    {setTimeout(() => {
                      window.location.href = "/";
                    }, 5000)}
                  </div>
                  Error Please try Again!
                  <br />
                  Redirecting ...
                </Header>
              ) : null}

              <Form>
                <Form.Field>
                  <h4>Username (E-MAIL)</h4>
                  <Form.Input
                    type="email"
                    placeholder="User Name"
                    name="username"
                    value={usr}
                    disabled
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                    error
                    focus
                  />
                </Form.Field>
                {dataRandom && !save ? (
                  <Form.Field>
                    <h4>Validation text</h4>
                    <Form.Input
                      type="text"
                      placeholder="Validation text"
                      name="random"
                      value={random}
                      onChange={handleChangeRanndom}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                      focus
                      required
                    />
                  </Form.Field>
                ) : null}

                {save ? (
                  <Form.Field>
                    <h4>New password</h4>
                    <Form.Input
                      type="password"
                      placeholder="New password"
                      name="password"
                      value={password}
                      onChange={handleChangePassword}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                      focus
                      required
                    />
                  </Form.Field>
                ) : null}

                <Grid columns={4} divided>
                  <Grid.Row>
                    {recover ? (
                      <Grid.Column>
                        <Button onClick={handleRecover}>Recover</Button>
                      </Grid.Column>
                    ) : null}
                    {confirm ? (
                      <Grid.Column>
                        <Button onClick={handleConfirm}>Confirm</Button>
                      </Grid.Column>
                    ) : null}
                    {save ? (
                      <Grid.Column>
                        <Button onClick={handleSave}>Save</Button>
                      </Grid.Column>
                    ) : null}
                    <Grid.Column>
                      <Link to="/">
                        <Button>Back</Button>
                      </Link>
                    </Grid.Column>
                    {loadingPassword || loadingRandom ? (
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

export default Forgot;
