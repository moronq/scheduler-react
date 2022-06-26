import { Badge, BadgeProps, Calendar } from 'antd'
import React, { FC } from 'react'
import { EventsType } from '../types/EventsType'
import type { Moment } from 'moment'
import { formatDate } from '../utils/formatDate'

type EventCalendarProps = {
  events: Array<EventsType>
}

const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvent = events.filter((el) => el.date === formatedDate)
    return (
      <ul className="events">
        {currentDayEvent.map((el, index) => {
          return <li key={index}>{el.description}</li>
        })}
      </ul>
    )
  }
  return <Calendar dateCellRender={dateCellRender} />
}

export default EventCalendar
