import React, { useState } from "react";
import { Menu, Segment, MenuItemProps, Button } from "semantic-ui-react";

const NavigationBar = (props: any) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (event: any, data: MenuItemProps) => {
    setActiveItem(data.name!);
  };

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Button
            basic
            inverted
            color="red"
            floated="right"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default NavigationBar;
