/* eslint-disable react/prop-types */
import React from "react"
import { Container, Row, Col, Card, Pagination } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Home.css'
import { useEvents } from "../hooks/useEvents"
import { useNews } from "../hooks/useNews"
import { IconUsers, IconFileText, IconBuilding, IconList, IconChartBar, IconTrophy, IconClock } from "./Icons"
import { useState } from "react"
import { InfoModal } from "./InfoModal"
import { ElementsArray } from "../elements"

export function Home() {
  
  const {currentPage, currentNews, news, newsPerPage, paginate} = useNews()
  const {upcomingEvents, formatDate} = useEvents()

  const {elements} = ElementsArray()
  const [element, setElement] = useState({})
  const [show, setShow] = useState(false)
  
 
  return (
    <div className="bg-light min-vh-100">
      <Container fluid className="py-4" id="container-home">
        <Row className="g-4">
          {/* Columna de navegación */}
          <Col lg={3}>
            <Card>
              <Card.Body className="p-0">
                <div className="border-bottom p-3">
                  
                  <NavItem icon={<IconUsers/>} text="Dirigencia" handleElement={()=>{setElement(elements[1]),setShow(true)}} />
                  <NavItem icon={<IconFileText />} text="Estatuto FAO" handleElement={()=>{setElement(elements[2]),setShow(true)}}/>
                  <NavItem icon={<IconFileText />} text="Reglamento FAO" handleElement={()=>{setElement(elements[3]),setShow(true)}}/>
                  <NavItem icon={<IconBuilding />} text="Entidades afiliadas" handleElement={()=>{setElement(elements[4]),setShow(true)}}/>
                  <NavItem icon={<IconBuilding />} text="Sede FAO"  handleElement={()=>{setElement(elements[5]),setShow(true)}}/>
                </div>
                <div className="p-3">
                  <NavItem icon={<IconList />} text="Listado clubes" handleElement={()=>{setElement(elements[6]),setShow(true)}}/>
                  <NavItem icon={<IconChartBar />} text="Rating" handleElement={()=>{setElement(elements[7]),setShow(true)}} />
                </div>
              </Card.Body>
            </Card>
            <InfoModal show={show} setShow={setShow} element={element}></InfoModal>
          </Col>

          {/* Columna central */}
          <Col lg={6}>
           
            <h2 className="mb-4" id="news-h2">Últimas Noticias</h2>
            {currentNews.map((item) => (
              <Card key={item.id} className="mb-4">
                <Link to={`/noticias/${item.id}`}>
                  <Card.Img loading="lazy" variant="top" src={item.image_url} alt={item.title} />
                </Link>
                <Card.Body>
                  <Link className="link-news" to={`/noticias/${item.id}`}><Card.Title className="card-title">{item.title}</Card.Title></Link>
                  <Card.Text className="card-subtitle">{item.content}</Card.Text>
                  <div className="text-muted">
                    <IconClock width={20} height={20} />
                    {formatDate(item.created_at)}
                  </div>
                </Card.Body>
              </Card>
            ))}
            <Pagination className="justify-content-center">
              {[...Array(Math.ceil(news.length / newsPerPage)).keys()].map((number) => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>

          {/* Columna de torneos */}
          <Col lg={3}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-4">Próximos Torneos</Card.Title>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={index}>
                      <TournamentItem 
                        title={event.title} 
                        time={event.time} 
                        location={event.location} 
                        date={event.date.toLocaleDateString()}
                      />
                    </div>
                  ))
                ) : (
                  <p>No hay eventos próximos programados.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

function NavItem({ icon, text,handleElement }) {
  return (
    <div id="nav-item" className="d-flex align-items-center py-2 px-3 text-decoration-none text-dark hover-bg-light cursor-pointer" onClick={handleElement}>
      {React.cloneElement(icon, { size: 20 })}
      <span>{text}</span>
    </div>
  )
}

function TournamentItem({ title, time, location, date }) {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-start">
        <IconTrophy width={20} height={20} className="icon-trophy" />
        <div>
          <h6 className="mb-1">{title}</h6>
          <p className="text-muted small mb-1">{date}</p>
          <p className="text-muted small mb-1">{time}</p>
          <p className="text-muted small mb-0">{location}</p>
        </div>
      </div>
    </div>
  )
}



