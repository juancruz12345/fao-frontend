import { useParams, useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Card, Badge, Table, Form, Button, Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import { IconSearch, IconX } from '../components/Icons.jsx'

export function PlayerHistory() {
  const { id } = useParams()
  const location = useLocation()
  const { players } = location.state || {}
  const player = players.find(p => p.id === parseInt(id))
  const [searchName, setSearchName] = useState('')
  const [searchTournament, setSearchTournament] = useState('')
  const [searchingMatch, setSearchingMatch] = useState([])

  const { data: playerHistory = [], isLoading, isError } = useQuery({
    queryKey: ["player_history", id],
    queryFn: async () => {
      const response = await fetch(`https://fao-backend.onrender.com/player/${id}/matches`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      
      if (!response.ok) {
        throw new Error("Error al cargar la página")
      }
      return response.json()
    },
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  })

  const handleSearch = () => {
    if (!playerHistory.matches) return
    const filteredMatches = playerHistory.matches.filter((e) =>
      (searchName === '' || 
       e.player1_name.toLowerCase().includes(searchName.toLowerCase()) ||
       e.player2_name.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchTournament === '' || 
       e.tournament_name.toLowerCase().includes(searchTournament.toLowerCase()))
    )
    setSearchingMatch(filteredMatches)
  }

  const resetSearch = () => {
    setSearchName('')
    setSearchTournament('')
    setSearchingMatch([])
  }

  if (isLoading) return <div className="text-center">Cargando...</div>
  if (isError) return <div className="text-center text-danger">Error al cargar el historial del jugador</div>

  return (
    <Container className="py-5">
      <h1 className="mb-4">{player.name}</h1>
      
      {playerHistory?.matches?.length > 0 ? (
        <div>
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Estadísticas</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Victorias</th>
                    <th>Empates</th>
                    <th>Derrotas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{playerHistory.totalVictories}</td>
                    <td>{playerHistory.totalDraws}</td>
                    <td>{playerHistory.totalDefeats}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Row className="g-3">
                <Col xs={12} sm={6} md={4}>
                  <Form.Group>
                    <Form.Label>Buscar por jugador</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del jugador"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Form.Group>
                    <Form.Label>Buscar por torneo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del torneo"
                      value={searchTournament}
                      onChange={(e) => setSearchTournament(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4} className="d-flex align-items-end">
                  <div className="d-flex gap-2 flex-grow-1">
                    <Button variant="primary" onClick={handleSearch} className="flex-grow-1">
                      <IconSearch size={20} className="me-2" />
                      Buscar
                    </Button>
                    <Button variant="outline-secondary" onClick={resetSearch} className="flex-grow-1">
                     { <IconX size={20} className="me-2" /> }
                      Limpiar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row xs={1} md={2} lg={3} className="g-4">
            {(searchingMatch.length > 0 ? searchingMatch : playerHistory.matches).map((match) => (
              <Col key={match.match_id}>
                <Card className="h-100">
                  <Card.Header>
                    <Card.Title className="h5 mb-0">Torneo: {match.tournament_name}</Card.Title>
                    <Card.Subtitle className="mt-1 text-muted">
                      Ronda: {match.round_number}
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <div className="match-result">
                      <span className="player-name">{match.player1_name}</span>
                      <Badge bg="secondary" className="mx-2">{match.result}</Badge>
                      <span className="player-name">{match.player2_name}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <h2>No hay historial</h2>
      )}
    </Container>
  )
}

