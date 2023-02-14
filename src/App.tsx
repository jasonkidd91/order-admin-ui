import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { currentDate, loadScript } from './helpers';
import { globalToast } from './redux/slice';
import { submitLogout } from './modules/auth/redux/authSlice';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import AppConfig from './AppConfig';
import './scss/style.scss';
import { useIdleTimer } from 'react-idle-timer';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./modules/auth/screens/Login'));
const Register = React.lazy(() => import('./modules/auth/screens/Register'));
const Page404 = React.lazy(() => import('./modules/auth/screens/Page404'));
const Page500 = React.lazy(() => import('./modules/auth/screens/Page500'));

const ProtectedRoute = (props: any) => {
  const path = props.location.pathname;
  const Component = props.component;
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const isTokenExpired = () => {
    const { exp } = jwtDecode<JwtPayload>(auth.token);
    const tokenExpired = currentDate().unix() > (exp as number);
    return tokenExpired;
  };

  useIdleTimer({
    // timeout: 1000 * 60 * 15,
    // onIdle: handleOnIdle,
    // onActive: () => { console.log('active')},
    onAction: () => {
      // console.log('checking token validiy ...');
      if (auth && auth.token && isTokenExpired()) {
        dispatch(submitLogout());
        dispatch(globalToast('error', 'token is expired'));
      }
    },
    debounce: 500,
  });

  if (auth && auth.token) {
    return <Route path="/" render={(props) => <Component {...props} />} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          // search: `?redirect=${path}`,
          // state: { redirect: path },
        }}
      />
    );
  }
};

class App extends Component {
  constructor(props: any) {
    super(props);
    // app inititialise
    document.title = AppConfig.name;

    // load external scripts
    loadScript([
      {
        id: 'google-api',
        src: `https://maps.googleapis.com/maps/api/js?key=<<GoogleMapKey>>&libraries=places`,
        async: true,
      },
    ]);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                exact
                path="/register"
                render={(props) => <Register key="Register Page" {...props} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login key="Login Page" {...props} />}
              />
              <Route exact path="/404" render={(props) => <Page404 key="Page 404" {...props} />} />
              <Route exact path="/500" render={(props) => <Page500 key="Page 500" {...props} />} />
              <ProtectedRoute component={TheLayout}></ProtectedRoute>
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
