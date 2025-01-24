
import { Navbar, Container, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconSun,IconMoon, IconFacebook, IconInstagram } from "./Icons";
import { useTheme } from "../context/ThemeContext";
import './NavSecondary.css'


export function NavSecondary(){

    const { theme, toggleTheme } = useTheme()
    const html = document.querySelector('html')
    html.setAttribute("data-bs-theme", theme)

    return(

     
          <div className="div-secondary-header">
            <Navbar
        expand="lg"
        className='secondary-navbar'
      >
        <Container fluid>
        
         <Navbar.Brand className="brand-secondary">
            <Nav.Link as={Link} to="/" className="brand-link-secondary">
              <img
                loading="lazy"
                alt="Logo Federación de Ajedrez Olavarría"
                src="/logo.jpg"
                width="80"
                height="80"
                className="d-inline-block align-top rounded-circle"
              />
              <span>Federación de Ajedrez Olavarría</span>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
          
      
        <Navbar.Collapse id="second-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} className="secondary-nav-link" to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/historia">Historia</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/calendario">Calendario</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/torneos">Torneos</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/galeria">Galería</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/formacion">Formación</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/jugadores">Jugadores</Nav.Link>
              <Nav.Link as={Link} className="secondary-nav-link" to="/basededatos">Base de datos</Nav.Link>
           
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <div className="theme-div" onClick={toggleTheme}>
                          {theme === "dark" ? (
                            <IconSun className="icon-theme-secondary" />
                          ) : (
                            <IconMoon className="icon-theme-secondary" />
                          )}
                        </div>
            
                        
                        <div className="links-social-secondary">
                                        <Nav.Link href="https://web.facebook.com/share/g/18Ea7a8fMF/" className="icon-social-secondary">
                                            <IconFacebook width={24} height={24}/>
                                        </Nav.Link>
                                        <Nav.Link href="https://www.instagram.com/faoajedrez/" className="icon-social-secondary">
                                            <IconInstagram width={24} height={24} />
                                        </Nav.Link>
                                    </div>
                      </Navbar.Collapse>

      
       
        </Container>
      </Navbar>
          </div>
      
    )
}