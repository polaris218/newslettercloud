import React from 'react'

import AppBar from 'components/AppBar'
import Footer from 'components/Footer'


export default function AppLayout({ children }) {
  return (
    <>
    <AppBar/>
    { children }
    <Footer />
    </>
  )
}
