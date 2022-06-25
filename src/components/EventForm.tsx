import { Form, Input } from 'antd'
import React from 'react'
import { rules } from '../utils/rules'

const EventForm = () => {
  return (
    <Form>
      <Form.Item
        label="Добавить событие"
        name="description"
        rules={[rules.required()]}
      >
        <Input autoComplete={'off'} />
      </Form.Item>
    </Form>
  )
}

export default EventForm
