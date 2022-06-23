import { Col, Menu, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hook/hook'

const NavBar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  return (
    <Header>
      <Row justify="end">
        {isAuth && <span style={{ color: 'white' }}>user name</span>}
        <Col span={4}>
          {isAuth ? (
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={[{ key: 'logout', label: 'Log out' }]}
            />
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={[{ key: 'login', label: <Link to={'login'}>Login</Link> }]}
            />
          )}
        </Col>
      </Row>
    </Header>
  )
}

export default NavBar
