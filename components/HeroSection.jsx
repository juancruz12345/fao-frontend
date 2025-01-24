import React from "react"
import "./HeroSection.css"
import { Container } from "react-bootstrap"
export function HeroSection() {
  return (
   <div className="hero-banner">
     <div className="hero-overlay">
     <Container className="hero-content">
          <div className="hero-text">
           
            <h1>Bienvenidos a la Federación de Ajedrez Olavarría</h1>
            <p>Descubre el fascinante mundo del ajedrez</p>
          </div>
        </Container>
    </div>
   </div>
  )
}
/**<h1>Bienvenidos a la Federación de Ajedrez Olavarría</h1>
        <p>Descubre el fascinante mundo del ajedrez</p> */
