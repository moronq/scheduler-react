import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const LayoutRouter: FC = () => {
  return (
    <Layout className="layout">
      <NavBar />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default LayoutRouter
