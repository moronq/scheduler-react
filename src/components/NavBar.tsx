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
        <Col span={4}>
          {isAuth ? (
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={[
                //   { key: 1, label: 'User name', disabled: true },
                { key: 2, label: 'Log out' },
              ]}
            />
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={[{ key: 3, label: <Link to={'login'}>Login</Link> }]}
            />
          )}
        </Col>
      </Row>
    </Header>
  )
}

export default NavBar
