import { Row } from 'antd'
import Layout from 'antd/lib/layout/layout'
import React, { FC } from 'react'
import LoginForm from '../components/LoginForm'

const Login: FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <LoginForm />
      </Row>
    </Layout>
  )
}

export default Login
