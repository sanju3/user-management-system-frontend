import { RouteComponentProps } from "react-router-dom";
import React, { useEffect } from "react";
import { Grid, Header, Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { confirmUser } from "../actions/userActons";

const Confirm = (
  props: RouteComponentProps<{ username?: string; random?: string }>
) => {
  const username = props.match.params.username;
  const random = props.match.params.random;
  const userConfirm = useSelector((state: any) => state.userConfirm);
  const { loading, data, error } = userConfirm;
  const dispatch = useDispatch();

  useEffect(() => {
    if (username && random) dispatch(confirmUser(username, random));
  }, [dispatch, random, username]);

  return (
    <Header textAlign="center" as="h3" block>
      {loading ? (
        <Grid.Column>
          Processing <Loader size="small" active></Loader>
        </Grid.Column>
      ) : null}
      {error ? (
        <Header as="h4" style={{ backgroundColor: "#FDD4D1" }} block>
          "Error Please try Again!" Redirecting ...
          <div style={{ display: "none" }}>
            {setTimeout(() => {
              window.location.href = "/";
            }, 5000)}
          </div>
          <br />
        </Header>
      ) : null}
      {data ? (
        <Header as="h4" style={{ backgroundColor: "#E9FDD1" }} block>
          Account Activated!
          <br />
          Redirecting ...
          <div style={{ display: "none" }}>
            {setTimeout(() => {
              window.location.href = "/";
            }, 5000)}
          </div>
        </Header>
      ) : null}
    </Header>
  );
};

export default Confirm;
