import { useState, useEffect, useRef } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { HeroSection } from "./HeroSection"
import { useTheme } from "../context/ThemeContext"
import { IconSun, IconMoon, IconFacebook, IconInstagram } from "./Icons"
import "./NavPrimary.css"

export function NavPrimary() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const html = document.querySelector("html")
  html.setAttribute("data-bs-theme", theme)
  const navbarToggleRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth > 991 &&
        navbarToggleRef.current &&
        navbarToggleRef.current.getAttribute("aria-expanded") === "true"
      ) {
        navbarToggleRef.current.click()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header>
      <div>
        <Navbar expand="lg" className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <Container fluid>
            <Navbar.Brand className="brand">
              <Link to="/" className="brand-link">
                <img
                  loading="lazy"
                  alt="Logo Federación de Ajedrez Olavarría"
                  src="/logo.jpg"
                  width="80"
                  height="80"
                  className="d-inline-block align-top rounded-circle"
                />
                <span>Federación de Ajedrez Olavarría</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" ref={navbarToggleRef} />
            <Navbar.Collapse id="basic-navbar-nav" className="navs-center">
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/historia">
                  Historia
                </Nav.Link>
                <Nav.Link as={Link} to="/calendario">
                  Calendario
                </Nav.Link>
                <Nav.Link as={Link} to="/torneos">
                  Torneos
                </Nav.Link>
                <Nav.Link as={Link} to="/galeria">
                  Galería
                </Nav.Link>
                <Nav.Link as={Link} to="/formacion">
                  Formación
                </Nav.Link>
                <Nav.Link as={Link} to="/jugadores">
                  Jugadores
                </Nav.Link>
                <Nav.Link as={Link} to="/basededatos">
                  Base de datos
                </Nav.Link>
              </Nav>
           
                <div className="theme-div" onClick={toggleTheme}>
                  {theme === "dark" ? <IconSun className="icon-theme" /> : <IconMoon className="icon-theme" />}
                </div>
                <div className="links-social">
                  <Nav.Link href="https://web.facebook.com/share/g/18Ea7a8fMF/" className="icon-social">
                    <IconFacebook width={24} height={24} />
                  </Nav.Link>
                  <Nav.Link href="https://www.instagram.com/faoajedrez/" className="icon-social">
                    <IconInstagram width={24} height={24} />
                  </Nav.Link>
                </div>
             
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <HeroSection />
      </div>
    </header>
  )
}

