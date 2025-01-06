
import { useParams } from "react-router-dom"
import { Card, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import './NewsDetails.css'
import { Loading } from "./Loading"
import {IconCalendar, IconClock} from './Icons'
import { useLocation } from "react-router-dom"

export function NewsDetails(){

    window.scroll(0,0)

    const {id} = useParams()
   
    const location = useLocation()
   
  const { currentNews } = location.state || {};

   
    const newsSingle = currentNews.find(p => p.id === parseInt(id))
    const otherNews = currentNews.filter(p => p.id !== parseInt(id)).slice(0,5)

    
      
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
      
    return(
        <Container className="my-5">
            <Row>
                <Col lg={9} className="mb-4">
                   {
                    newsSingle
                    ?
                    <Card className="news-details-card">
                    <Card.Img 
                        loading="lazy"
                        variant="top" 
                        src={newsSingle.image_url} 
                        alt={newsSingle.title}
                        className="news-image"
                    />
                    <Card.Body>
                        <Card.Title as="h1" className="news-title">{newsSingle.title}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">{newsSingle.content}</Card.Subtitle>
                        
                        <Card.Text className="news-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia eligendi possimus qui esse architecto fugit sunt nihil sequi dolore, rem aperiam earum nulla ut corporis dicta aliquam officia quod eos!</Card.Text>

                        <div className="news-meta">
                            <span className="news-date">
                                <IconCalendar />
                                {formatDate(newsSingle.created_at)}
                            </span>
                            <span className="news-time">
                                <IconClock/>
                                {new Date(newsSingle.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </Card.Body>
                </Card>

                : <Loading></Loading>
                   }
                </Col>
                <Col lg={3}>
                    <h3 className="mb-3">Otras Noticias</h3>
                    {otherNews.map((item) => (
                        <Link key={item.id} to={`/noticias/${item.id}`} className="text-decoration-none">
                            <Card className="mb-3 other-news-card">
                                <Card.Body>
                                    <Card.Title className="other-news-title">{item.title}</Card.Title>
                                    <Card.Text className="text-muted">{formatDate(item.created_at)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

