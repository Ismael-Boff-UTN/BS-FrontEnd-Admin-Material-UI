import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import LogIn from "../components/Auth/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { SemipolarLoading } from "react-loadingg";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <SemipolarLoading />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/"
            component={LogIn}
            isAuthenticated={!!uid}
          />

          <PrivateRoute component={DashboardRoutes} isAuthenticated={!!uid} />
        </Switch>
        <Redirect path="/" />
      </div>
    </Router>
  );
};
