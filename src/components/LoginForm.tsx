import { Button, Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { login } from '../store/slices/authSlice'
import { rules } from '../utils/rules'

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()

  const { error, isLoading } = useAppSelector((state) => state.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    dispatch(login({ username: username, password: password }))
  }

  return (
    <Form onFinish={onSubmit}>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required('Пожалуйста, введите имя пользователя')]}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Пожалуйста, введите пароль')]}
      >
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
