import { Col, Menu, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { logout } from '../store/slices/authSlice'

const NavBar: FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <Header>
      <Row justify="end">
        {isAuth && (
          <span style={{ color: 'white', marginRight: '15px' }}>
            {user.username}{' '}
          </span>
        )}
        <Col span={4}>
          {isAuth ? (
            <Menu
              onClick={() => dispatch(logout())}
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
