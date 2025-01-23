/* eslint-disable react/prop-types */
import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import './Home.css'
import { useEvents } from "../hooks/useEvents"
import { useNews } from "../hooks/useNews"
import { IconUsers, IconFileText, IconBuilding, IconList, IconChartBar, IconTrophy, IconClock, IconChevronLeft, IconChevronRight, IconChevronsLeft } from "./Icons"
import { useState } from "react"
import { InfoModal } from "./InfoModal"
import { ElementsArray } from "../elements"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { HeroSection } from "./HeroSection"

export default function Home() {
  
  
  const {theme} = useTheme()
  const {upcomingEvents, formatDate} = useEvents()
  const { currentNews, loadMore, isFetching, loadLess,offset, limit, setOffset } = useNews();
  const {elements} = ElementsArray()
  const [element, setElement] = useState({})
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  
  
  const goToNewsDetail = (id) => {
    navigate(`/noticias/${id}`, { state: { currentNews } }); 
  }

 
  
 
  return (
    <div className="container-home">
     
      <Container fluid className="py-4" id="container-home">
        <Row className="g-4">
       
          {/* Columna de navegación */}
          <Col lg={3}>
            <Card id='col-nav'>
              <Card.Body className="p-0">
                <div className="border-bottom p-3">
                  
                  <NavItem icon={<IconUsers/>} text="Dirigencia" handleElement={() => {if (Array.isArray(elements) && elements[1]) {setElement(elements[1]);setShow(true);}}} />
                  <NavItem icon={<IconFileText />} text="Estatuto FAO" handleElement={()=>{if (Array.isArray(elements) && elements[2]) {setElement(elements[2]);setShow(true);}}}/>
                  <NavItem icon={<IconFileText />} text="Reglamento FAO" handleElement={()=>{if (Array.isArray(elements) && elements[3]) {setElement(elements[3]);setShow(true);}}}/>
                  <NavItem icon={<IconBuilding />} text="Entidades afiliadas" handleElement={()=>{if (Array.isArray(elements) && elements[4]) {setElement(elements[4]);setShow(true);}}}/>
                  <NavItem icon={<IconBuilding />} text="Sede FAO"  handleElement={()=>{if (Array.isArray(elements) && elements[5]) {setElement(elements[5]);setShow(true);}}}/>
                </div>
                <div className="p-3">
                  <NavItem icon={<IconList />} text="Listado clubes" handleElement={()=>{if (Array.isArray(elements) && elements[6]) {setElement(elements[6]);setShow(true);}}}/>
                  <NavItem icon={<IconChartBar />} text="Rating" handleElement={()=>{if (Array.isArray(elements) && elements[7]) {setElement(elements[7]);setShow(true);}}} />
                </div>
              </Card.Body>
            </Card>
            <InfoModal show={show} setShow={setShow} element={element}></InfoModal>
          </Col>

          {/* Columna central */}
          <Col lg={6}>
           
            <h2 className="mb-4" id="news-h2">Últimas Noticias</h2>
            {Array.isArray(currentNews) && currentNews.map((item) => (
              <Card key={item.id} className="mb-4" id="card-news-home">
                 <Card.Img className="card-news-img" onClick={()=>{goToNewsDetail(item.id)}}  loading="lazy" variant="top" src={item.image_url} alt={item.title} />
             
                <Card.Body>
                 <Card.Title onClick={()=>{goToNewsDetail(item.id)}}  className="card-news-title">{item.title}</Card.Title>
                 
                  <div className="text-muted">
                    <IconClock width={20} height={20} />
                    {formatDate(item.created_at)}
                  </div>
                </Card.Body>
              </Card>
            ))}
           

      <div className="btn-news-div">

      {
        offset>0 && currentNews.length>0
        ? <Button variant={theme} className="btn-load-news" onClick={loadLess} disabled={isFetching}>
      <IconChevronLeft></IconChevronLeft>Más actuales
      </Button>
      :<></>
      }
    {
      currentNews.length>0 && currentNews.length===limit  ?
        <Button variant={theme} onClick={loadMore} disabled={isFetching}>
        Más antiguas<IconChevronRight></IconChevronRight>
      </Button>
      :<></>
    }
    {
      currentNews.length===0 ?
      <div>
        <Button variant={theme} className="btn-load-news" onClick={loadLess} disabled={isFetching}>
      <IconChevronLeft></IconChevronLeft>Más actuales
      </Button>
      <Button variant={theme} className="btn-load-news" onClick={()=>{setOffset(0)}} disabled={isFetching}>
      <IconChevronsLeft></IconChevronsLeft>Últimas noticias
      </Button>
      </div>
      :<></>
    }
      </div>
     
          </Col>

          {/* Columna de torneos */}
          <Col lg={3}>
            <Card id="col-events">
              <Card.Body>
                <Card.Title className="mb-4">Próximos Torneos</Card.Title>
                {Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? (
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





