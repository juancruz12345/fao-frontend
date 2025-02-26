
import "./HeroSection.css"
import { Container } from "react-bootstrap"

export function HeroSection() {
  return (
    <div className="hero-banner">
      <div className="hero-overlay">
        <Container className="hero-content">
          <div className="hero-text">
            <h1>Bienvenido a la Federación de Ajedrez Olavarría</h1>
          
          </div>
        </Container>
      </div>
    </div>
  )
}

