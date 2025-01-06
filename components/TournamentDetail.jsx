
import React from 'react';
import { useParams, useLocation } from "react-router-dom";
import { Accordion, Card, Badge, Container, Row, Col, Table } from "react-bootstrap";
import { usePlayers } from "../context/PlayerContext";
import { useQuery } from "@tanstack/react-query";
import { IconTrophy, IconMapPin, IconCalendar, IconChessKnight } from '../components/Icons.jsx';
import './TournamentDetail.css';

export function TournamentDetail() {
  const { players } = usePlayers()
  const playerMap = new Map(players.map(player => [player.id, player.name]))
  const getPlayerName = (playerId) => playerMap.get(playerId) || "Unknown Player"
  const { id } = useParams()
  const location = useLocation()
   
  const { tournaments } = location.state || {}
  const tournament = tournaments.find(p => p.id === parseInt(id))
  
  const { data: standings = [] } = useQuery({
    queryKey: ["standings", id],
    queryFn: async () => {
      console.log("Fetching standings from API...");
      const response = await fetch(`https://fao-backend.onrender.com/tournament/${id}/standings`, {
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

  return (
    <Container className="tournament-detail-container">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card className="tournament-detail-card mb-4">
            <Card.Header>
              <h2 className="mb-0"><IconTrophy className='icon-trophy' />{tournament.name}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Text><IconMapPin className="me-2" /><strong>Lugar:</strong> {tournament.location}</Card.Text>
              <Card.Text><IconCalendar className="me-2" /><strong>Fecha de inicio:</strong> {new Date(tournament.start_date).toLocaleDateString()}</Card.Text>
            </Card.Body>
          </Card>

          <Accordion className="rounds-accordion mb-4">
            {tournament.rounds.map((round, index) => (
              <Accordion.Item className='rounds-item' key={index} eventKey={index.toString()}>
                <Accordion.Header className='rounds-header'>
                  <h5 className="mb-0"><IconChessKnight className="me-2" />Ronda {round.number}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  {round.matches.map((match, matchIndex) => (
                    <Card key={matchIndex} className="match-card mb-2">
                      <Card.Body>
                        <div className="players-container">
                          <span className="player-name">{getPlayerName(match.player1_id)}</span>
                          <Badge bg='secondary' className="result-badge">{match.result}</Badge>
                          <span className="player-name">{getPlayerName(match.player2_id)}</span>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
        <Col xs={12} lg={4}>
          <Card className="standings-card">
            <Card.Header>
              <h3 className="mb-0">Clasificación</h3>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive className="standings-table">
                <thead>
                  <tr>
                    <th>Jugador</th>
                    <th>Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {standings?.map((player) => (
                    <tr key={player.player_id}>
                      <td>{player.player_name}</td>
                      <td>{player.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

