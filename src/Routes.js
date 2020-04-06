import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Products from "./containers/Products";
import Customers from "./containers/Customers";
import Transactions from "./containers/Transactions";
import Reports from "./containers/Reports";
import DetailedReports from './containers/DetailedReport';


export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/products" exact component={Products} appProps={appProps} />
      <AppliedRoute path="/customers" exact component={Customers} appProps={appProps} />
      <AppliedRoute path="/transactions" exact component={Transactions} appProps={appProps} />
      <AppliedRoute path="/inventory-summary-reports" exact component={Reports} appProps={appProps} />
      <AppliedRoute path="/inventory-detailed-reports" exact component={DetailedReports} appProps={appProps} />

      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}