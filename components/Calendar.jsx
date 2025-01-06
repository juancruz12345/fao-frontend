import { useState } from 'react';
import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { IconChevronLeft, IconChevronRight } from './Icons.jsx';
import { useEvents } from '../hooks/useEvents';
import './Calendar.css';


const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { events } = useEvents()
  console.log(events)

  const getDaysInMonth = (date) => {
    
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      const dayEvents = events.filter(event => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      ) 
      days.push(
        <div key={i} className={`calendar-day ${dayEvents.length > 0 ? 'has-event' : ''}`}>
          <span className="day-number">{i}</span>
          {dayEvents.map((event, index) => (
            <OverlayTrigger
              key={index}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${i}-${index}`}>
                  <strong>{event.title}</strong><br />
                  Hora: {event.time}<br />
                  Lugar: {event.location}
                </Tooltip>
              }
            >
              <div className="event-title">
                {event.title}
              </div>
            </OverlayTrigger>
          ))}
        </div>
      )
    }

    return days
  }

  const changeMonth = (increment) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + increment)
      return newDate
    })
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <div className="calendar-header">
            <Button onClick={() => changeMonth(-1)} ><IconChevronLeft className="calendar-nav-icon"></IconChevronLeft></Button>
            <h2>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <Button onClick={() => changeMonth(1)} ><IconChevronRight className="calendar-nav-icon"></IconChevronRight></Button>
          </div>
          <Row className="calendar-weekdays">
            {DAYS.map(day => (
              <Col key={day}>{day}</Col>
            ))}
          </Row>
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}






