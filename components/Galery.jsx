import { useState } from "react";
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import './Galery.css'
import { ModalComponent } from "./ModalComponent";
import { useGalery } from "../hooks/useGalery";

export function Galery() {

  
  const [show, setShow] = useState(false);
  const [img, setImg] = useState({})
  const { imgs, totalPages, currentPage, goToPage } = useGalery()
  
  
  const handlePageChange = (pageNumber) => {
    goToPage(pageNumber)
    window.scrollTo(0, 0)
  }


  const selectUrl = (e) =>{
    const url = e.currentTarget.src
    const title = e.currentTarget.alt
   
    if(url !== '' || url !== null || url !== undefined){
      setImg({url:url, title:title, created_at:e.currentTarget.id})
      setShow(true)
    }
    else{
      return
    }
  }
  

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Galería de fotos</h1>
      <p className="text-center mb-5">
        Explora nuestra colección de imágenes.
      </p>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {imgs.map((img, index) => (
          <Col key={index}>
            <Card className="h-100" id="card-galery">
              <Card.Img
                loading="lazy"
                variant="top"
                src={img.url}
                alt={img.title || `Image ${index + 1}`}
                style={{ height: '200px', objectFit: 'cover' }}
                onClick={selectUrl}
                created_at={img.created_at}
                id={img.created_at}
              />
              
            </Card>
            
          </Col>
        ))}
       
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
      <ModalComponent show={show} setShow={setShow} img={img}></ModalComponent>
    </Container>
  )
}

