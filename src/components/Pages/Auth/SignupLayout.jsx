import React from 'react'
import { FormattedMessage } from 'react-intl'


export default function AuthLayout({ children }) {
  return (
    <div className="container d-flex mt-5">
      <div className="row justify-content-between align-items-center">
        <div className="col-5">
          <img alt="upgrade account" src="/img/auth-signup.svg" />
        </div>
        { children }
      </div>
    </div>
  )
}
