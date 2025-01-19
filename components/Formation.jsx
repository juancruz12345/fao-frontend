

import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { 
  IconMapPin, 
  IconCalendar, 
  IconClock, 
  IconUser, 
  IconPhone 
} from './Icons';
import './Formation.css'

const Formation = () => {
  const entidades = [
    {nombre:"Club San Martin de Sierras Bayas", direccion:"Av. San Martín 1792 (Sierras Bayas)", dia:"Lunes", horario:"18:00 a 20:00 hs.", profesor:"Omar Navarro"},
    {nombre:"Sociedad de Fomento Pueblo Nuevo", direccion:"Maipú 2848", dia:"Martes", horario:"14:30 a 17:30 hs", profesor:"Luis Gonzales", tel:"2284-539827", descripcionAdicional:"Para mayores de 18 años"},
    {nombre:"Club Mariano Moreno", direccion:"Av. Sarmiento 3093", dia:"Martes", horario:"18.15 a 20.15 hs.", profesor:"Juan Rodriguez", tel:"2284-563929"},
    {nombre:"F.C. Ferro Carril Sud", direccion:"Modalidad virtual", dia:"Martes", horario:"18:30 a 20:30 hs.", profesor:"Darío Maidana", tel:"2284-454168"},
    {nombre:"Biblioteca Popular 'Héctor N. Amoroso'", direccion:"Dean Funes 3329", dia:"Miércoles", horario:"18.15 a 20.15 hs.", profesor:"Lautaro Sampaoli", tel:"2284-246939"},
    {nombre:"C.A. Estudiantes", direccion:"Av. Del Valle y Lavalle.", dia:"Viernes", horario:"18:00 a 20:00 hs.", profesor:"Lautaro Sampaoli", tel:"2284-246939"},
    {nombre:"Museo Hogar Municipal Loma Negra", direccion:"Sarmiento 830 (Loma Negra)", dia:"Viernes", horario:"18:00 a 20:00 hs.", profesor:"Omar Navarro"},
    {nombre:"Biblioteca 'Coty Laborde'", direccion:"Coronel Suarez 1795", dia:"Sábados", horario:"10.15 a 12.15 hs.", profesor:"Darío Maidana", tel:"2284-454168"},
    {nombre:"Racing A.C.", direccion:"Av. Colón y Río Bamba", dia:"Sábados", horario:"18.00 a 20.00 hs.", profesor:"Paola Nievas", tel:"2284-526393"},
    {nombre:"Museo de las Ciencias", direccion:"Av. Pellegrini 4200", dia:"Sábados", horario:"18.30 a 21.30 hs.", profesor:"Darío Maidana", tel:"2284-454168", descripcionAdicional:"Nivel avanzado"}
  ];

  return (
    <div className="formation-container">
      <h1 className="text-center my-5">Formación</h1>
      <Container id='formation-container'>
        <Row xs={1} md={2} lg={3} className="g-4">
          {entidades.map((e, i) => (
            <Col key={i}>
              <Card className="h-100 shadow-sm">
                <Card.Header className='text-white bg-primary' >
                  <Card.Title>{e.nombre}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="mb-2">
                    <IconMapPin  stroke="currentColor" strokeWidth="1.5" className="icon" />
                    <span>{e.direccion}</span>
                  </div>
                  <div className="mb-2">
                    <IconCalendar  stroke="currentColor" strokeWidth="1.5" className="icon" />
                    <span>{e.dia}</span>
                  </div>
                  <div className="mb-2">
                    <IconClock  stroke="currentColor" strokeWidth="1.5" className="icon" />
                    <span>{e.horario}</span>
                  </div>
                  <div className="mb-2">
                    <IconUser  stroke="currentColor" strokeWidth="1.5" className="icon" />
                    <span>{e.profesor}</span>
                  </div>
                  {e.tel && (
                    <div className="mb-2">
                      <IconPhone  stroke="currentColor" strokeWidth="1.5" className="icon" />
                      <span>{e.tel}</span>
                    </div>
                  )}
                  {e.descripcionAdicional && (
                    <Badge bg="secondary" className="mt-2">
                      {e.descripcionAdicional}
                    </Badge>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Formation;

