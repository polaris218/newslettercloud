import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'


export default function PrivateRoute ({ needRedirect, redirectTo, component: Component, ...rest }) {
  const Layout = rest.layout || Fragment
  return (
    <Route
      {...rest}
      render={props =>
          (needRedirect ? (
          <Layout>
            <Component {...props}>
              {rest.children}
            </Component>
          </Layout>

          ) : (
              <Redirect
                  to={{ pathname: redirectTo }}
              />
          ))
      }
    />
  )
}
