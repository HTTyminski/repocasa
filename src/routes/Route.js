import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';
import { signInRequest } from '../store/modules/auth/actions';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  titlePage,
  ...rest
}) {

  let withQueryString = false;
  const { signed } = store.getState().auth;

  const dispatch = useDispatch();
  const search = rest.location.search;
  const params = new URLSearchParams(search);
  const login = params.get('login');
  const password = params.get('access');

  if(login && password){
    withQueryString = true;
    dispatch(signInRequest(login, password));
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard/consumo/leitura-consumo" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout titlePage={titlePage}>
          <Component withQueryString={withQueryString} {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
