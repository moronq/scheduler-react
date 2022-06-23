import { Input, Form, Button } from 'antd'
import React, { FC } from 'react'
import { useAppDispatch } from '../hook/hook'
import { login } from '../store/slices/authSlice'
import { UserType } from '../types/UserTypes'
import { rules } from './utils/rules'

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = () => {
    dispatch(login({ username: 'admin', password: '123' }))
  }

  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required('Пожалуйста, введите имя пользователя')]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Пожалуйста, введите пароль')]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
