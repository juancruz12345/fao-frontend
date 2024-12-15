import { Navbar, Container, Nav, Form } from "react-bootstrap"
import { IconFacebook, IconInstagram, IconMoon, IconSun } from "./Icons"
import './Header.css'
import { useTheme } from "../context/ThemeContext"
import { Link } from "react-router-dom"

export function Header() {


    const {theme, setTheme} = useTheme()
    const html = document.querySelector('html')
    html.setAttribute("data-bs-theme", theme)
    const initialValue = window.localStorage.getItem('theme-value') || 0

    const handleChange = (e) => {
        
        if(e.currentTarget.value==0){
            window.localStorage.setItem('theme-value', 0)
           setTheme('dark')
        }
        else if(e.currentTarget.value==1){
            window.localStorage.setItem('theme-value', 1)
            setTheme('light')
        }
       
    }

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
                    
                  <IconMoon className="icon-theme"></IconMoon>
                   
                   <Form.Range value={initialValue} onChange={handleChange}  max={1} min={0} id="form-range"/>
               
                   <IconSun className="icon-theme"></IconSun>
                  </div>
                      



                        <div className="links-header">
                            <Nav.Link href="https://www.facebook.com/p/FAO-Federaci%C3%B3n-de-Ajedrez-de-Olavarria--100068047218244/?_rdr" className="icon-social">
                                <IconFacebook width={24} height={24}/>
                            </Nav.Link>
                            <Nav.Link href="https://www.instagram.com/faoajedrez/" className="icon-social">
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
                            <Nav.Link as={Link} to="/about">Sobre nosotros</Nav.Link>
                            <Nav.Link as={Link} to="/calendario">Calendario</Nav.Link>
                            <Nav.Link as={Link} to="/eventos">Eventos / Torneos pasados</Nav.Link>
                            <Nav.Link as={Link} to="/galeria">Galería de fotos</Nav.Link>
                            <Nav.Link as={Link} to="/historia">Historia</Nav.Link>
                            <Nav.Link as={Link} to="/formacion">Formación</Nav.Link>
                            <Nav.Link as={Link} to="/jugadores">Jugadores</Nav.Link>
                            <Nav.Link as={Link} to="/base-de-datos">Base de datos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}


