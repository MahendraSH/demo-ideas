import React from 'react'
import Navabar from './ui/Navabar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navabar/>
      <Outlet/>
    </>
  )
}

export default Layout
