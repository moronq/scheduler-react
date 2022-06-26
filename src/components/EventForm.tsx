import { DatePicker, Form, Input, Select, Button, Row } from 'antd'
import React, { FC, useState } from 'react'
import { Moment } from 'moment'
import { EventsType } from '../types/EventsType'
import { UserType } from '../types/UserType'
import { rules } from '../utils/rules'
import { formatDate } from '../utils/formatDate'
import { isConstructorDeclaration } from 'typescript'
import { useAppSelector } from '../hooks/hook'

type EventFormProps = {
  guests: Array<UserType>
  submit: (event: EventsType) => void
}

const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
  const { user } = useAppSelector((state) => state.auth)

  const [event, setEvent] = useState({
    author: '',
    date: '',
    description: '',
    guest: 'fdfg',
  } as EventsType)

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date?.toDate()) })
    }
  }

  const submitForm = () => {
    submit({ ...event, author: user.username })
    console.log({ ...event, author: user.username })
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Добавить событие"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          autoComplete={'off'}
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Выбрать дату" name="date" rules={[rules.required()]}>
        <DatePicker
          placeholder={'Выбрать дату'}
          onChange={(date) => selectDate(date)}
        />
      </Form.Item>
      <Form.Item
        label="Выбрать участника"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {guests.map((el) => {
            return (
              <Select.Option key={el.username} value={el.username}>
                {el.username}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default EventForm
