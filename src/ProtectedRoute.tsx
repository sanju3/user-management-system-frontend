import { Route, Redirect } from "react-router-dom";

interface IProps {
  component: any;
  [x: string]: any;
}

export const ProtectedRoute = ({ component: Component, ...rest }: IProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("user")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
