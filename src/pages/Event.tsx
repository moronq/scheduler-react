import { Button, Col, Layout, Modal, Row } from 'antd'
import React, { FC, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Layout>
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
          <EventForm />
        </Modal>
      </Row>
    </Layout>
  )
}

export default Event
