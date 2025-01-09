
import { useParams, useNavigate } from "react-router-dom"
import { Card, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import './NewsDetails.css'
import { Loading } from "./Loading"
import {IconCalendar, IconClock} from './Icons'
import { useLocation } from "react-router-dom"

export function NewsDetails(){

    window.scroll(0,0)

    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
   
  const { currentNews } = location.state || {};
  const goToNewsDetail = (id) => {
    navigate(`/noticias/${id}`, { state: { currentNews } }); 
  }
    console.log(currentNews)
   
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
                       
                        
                        <Card.Text className="news-content">
                        {newsSingle.content.split("\n").map((parrafo, i) => {
                            if (parrafo.startsWith("https")) {
                            return (
                            <span  key={i}>
                            <a href={parrafo} target="_blank" rel="noopener noreferrer">
                                 {parrafo}
                            </a>
                            </span >
                            );
                    }

   
                    return <p key={i}>{parrafo}</p>;
                    })}

                        </Card.Text>

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
                        
                            <Card  key={item.id} className="mb-3 other-news-card" onClick={()=>{goToNewsDetail(item.id)}}>
                                <Card.Body>
                                    <Card.Title className="other-news-title">{item.title}</Card.Title>
                                    <Card.Text className="text-muted">{formatDate(item.created_at)}</Card.Text>
                                </Card.Body>
                            </Card>
                       
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

