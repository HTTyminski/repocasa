import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import dashboardRoutes from './dashboardRoutes';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      {dashboardRoutes}
    </Switch>
  );
}
