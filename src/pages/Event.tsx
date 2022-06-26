import { Button, Col, Layout, Modal, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { createEvent, fetchGuests } from '../store/slices/eventSlice'

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useAppDispatch()

  const { guests, events } = useAppSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchGuests())
  }, [])

  return (
    <Layout>
      {JSON.stringify(events)}
      <Row justify="center">
        <Col span={22}>
          <EventCalendar events={[]} />
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
          <EventForm
            guests={guests}
            submit={(event) => dispatch(createEvent(event))}
          />
        </Modal>
      </Row>
    </Layout>
  )
}

export default Event
