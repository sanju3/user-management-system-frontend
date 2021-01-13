import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { Header } from "semantic-ui-react";

const Confirm = (
  props: RouteComponentProps<{ username?: string; random?: string }>
) => {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const username = props.match.params.username;
  const random = props.match.params.random;

  axios
    .get(`http://localhost:5000/user/verify/${username}/${random}`)
    .then((response) => {
      if (status === 0) {
        setStatus(response.status);
        setMessage(response.data);
      }

      setTimeout(() => {
        window.location.href = "/";
      }, 5000);

      console.log(response.status);
    })
    .catch((error) => console.log(`Error found ${error}`));

  return (
    <Header textAlign="center" as="h3" block>
      {status}: {message}
      <br />
      redirecting....
    </Header>
  );
};

export default Confirm;
