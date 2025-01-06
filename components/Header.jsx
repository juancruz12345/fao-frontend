import { Navbar, Container, Nav } from "react-bootstrap"
import { IconFacebook, IconInstagram, IconMoon, IconSun } from "./Icons"
import './Header.css'
import { useTheme } from "../context/ThemeContext"
import { Link } from "react-router-dom"

export function Header() {


    const {theme, toggleTheme} = useTheme()
    const html = document.querySelector('html')
    html.setAttribute("data-bs-theme", theme)
    

    return (
        <header>
            <Navbar expand="lg" className="navbar">
                <Container fluid>
                    <Navbar.Brand className="brand">
                        <Nav.Link as={Link} to={'/'} className="brand-link">
                        <img
                            loading="lazy"
                            alt="Logo Federación de Ajedrez Olavarría"
                            src="/logo.jpg"
                            width="80"
                            height="80"
                            className="d-inline-block align-top rounded-circle"
                        />
                        <span className="d-none d-md-inline">Federación de Ajedrez Olavarría</span>
                        </Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                       
                       
                  <div className="theme-div">
                    
                {
                    theme==='dark'
                    ? 
                    <div onClick={toggleTheme}>
                        <IconSun className='icon-theme'></IconSun>
                    </div>

                    : 
                    <div onClick={toggleTheme}>
                        <IconMoon className='icon-theme'></IconMoon>
                    </div>
                }
                  </div>
                      



                        <div className="links-header">
                            <Nav.Link href="https://web.facebook.com/share/g/18Ea7a8fMF/" className="icon-social">
                                <IconFacebook width={24} height={24}/>
                            </Nav.Link>
                            <Nav.Link href="https://www.instagram.com/faoajedrez/" className="icon-social-instagram">
                                <IconInstagram width={24} height={24} />
                            </Nav.Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar expand="lg" className="second-navbar">
                <Container>
                    <Navbar.Toggle aria-controls="second-navbar-nav" />
                    <Navbar.Collapse id="second-navbar-nav" className="second-navbar-collapse">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/historia">Historia</Nav.Link>
                            <Nav.Link as={Link} to="/calendario">Calendario</Nav.Link>
                            <Nav.Link as={Link} to="/torneos">Torneos pasados</Nav.Link>
                            <Nav.Link as={Link} to="/galeria">Galería de fotos</Nav.Link>
                            <Nav.Link as={Link} to="/formacion">Formación</Nav.Link>
                            <Nav.Link as={Link} to="/jugadores">Jugadores</Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}


