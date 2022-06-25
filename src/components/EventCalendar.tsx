import { EventType } from '@testing-library/react'
import { Calendar } from 'antd'
import React, { FC } from 'react'

type EventCalendarProps = {
  events: Array<EventType>
}

const EventCalendar: FC<EventCalendarProps> = () => {
  return <Calendar />
}

export default EventCalendar
