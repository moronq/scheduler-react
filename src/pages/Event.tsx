import { Button, Col, Layout, Modal, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import {
  createEvent,
  fetchEvents,
  fetchGuests,
} from '../store/slices/eventSlice'
import { EventsType } from '../types/EventsType'

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useAppDispatch()

  const { guests, events } = useAppSelector((state) => state.events)
  const { user } = useAppSelector((state) => state.auth)

  const addNewEvent = (event: EventsType) => {
    setModalVisible(false)
    dispatch(createEvent(event))
  }

  useEffect(() => {
    dispatch(fetchEvents(user.username))
    dispatch(fetchGuests())
  }, [])

  return (
    <Layout>
      <Row justify="center">
        <Col span={22}>
          <EventCalendar events={events} />
        </Col>
        <Row>
          <Button onClick={() => setModalVisible(true)}>
            Добавить событие
          </Button>
        </Row>
        <Modal
          title="Добавить событие"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <EventForm guests={guests} submit={addNewEvent} />
        </Modal>
      </Row>
    </Layout>
  )
}

export default Event
