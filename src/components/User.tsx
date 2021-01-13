import React, { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";
import NavigationBar from "./NavigationBar";

const User = (props: any) => {
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <NavigationBar history={props.history} />
      <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
          <Card>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{user.username}</Card.Header>
              <Card.Meta>
                <span>
                  {"Welcome: " + user.firstname + " " + user.lastname}
                </span>
              </Card.Meta>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;
