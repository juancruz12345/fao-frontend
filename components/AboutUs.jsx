
import { Container, Row, Col, Card } from 'react-bootstrap';
import { IconChessKnight, IconTrophy, IconUsers, IconHistory } from './Icons.jsx';
import './AboutUs.css';

export function AboutUs() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Sobre la Federación de Ajedrez de Olavarría</h1>
      
      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <IconHistory width={32} height={32} stroke='grey' />
                <h2 className="mb-0">Nuestra Historia</h2>
              </div>
              <Card.Text>
                Fundada en 1965, la Federación de Ajedrez de Olavarría ha sido el pilar del ajedrez en nuestra comunidad durante más de cinco décadas. Desde nuestros humildes comienzos en un pequeño club local, hemos crecido hasta convertirnos en una institución respetada que fomenta el amor por el ajedrez en toda la región.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <IconChessKnight width={32} height={32} stroke='grey'/>
                <h2 className="mb-0">Nuestra Misión</h2>
              </div>
              <Card.Text>
                Nuestra misión es promover y desarrollar el ajedrez en Olavarría y sus alrededores. Nos esforzamos por hacer que el ajedrez sea accesible para personas de todas las edades y habilidades, fomentando el crecimiento intelectual y social a través de este maravilloso juego.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <IconTrophy width={32} height={32} stroke='grey' />
                <h2 className="mb-0">Nuestros Logros</h2>
              </div>
              <ul className="achievement-list">
                <li>Organización de más de 500 torneos locales y regionales</li>
                <li>Formación de 3 Grandes Maestros y 7 Maestros Internacionales</li>
                <li>Establecimiento de programas de ajedrez en 20 escuelas locales</li>
                <li>Sede del Campeonato Nacional de Ajedrez en 2010 y 2018</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <IconUsers width={32} height={32} stroke='grey' />
                <h2 className="mb-0">Nuestra Comunidad</h2>
              </div>
              <Card.Text>
                La Federación de Ajedrez de Olavarría es más que una organización; es una comunidad vibrante de amantes del ajedrez. Con más de 500 miembros activos, desde principiantes entusiastas hasta jugadores de élite, nuestra federación es un crisol de pasión por el ajedrez. Organizamos eventos regulares, desde torneos competitivos hasta sesiones casuales de juego, creando un ambiente acogedor para todos los aficionados al ajedrez.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <h3>¡Únete a nosotros y sé parte de nuestra historia de ajedrez!</h3>
        <p className="contact-info">
          Contáctanos: info@ajedrezolavarria.com | Tel: (123) 456-7890
        </p>
      </div>
    </Container>
  );
}

