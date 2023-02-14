import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';

// routes config
import routes from '../routes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const TheContent = () => (
  <main className="c-main">
    <CContainer fluid>
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route) => {
            // render for all modules screen
            if (route.component) {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => (
                    <CFade>
                      <route.component {...props} key={Math.random()} />
                    </CFade>
                  )}
                />
              );
            }
            // render for redirect case
            return <Redirect key={route.name} from={route.path} to={route.redirect} />;
          })}
        </Switch>
      </Suspense>
    </CContainer>
  </main>
);

export default React.memo(TheContent);
