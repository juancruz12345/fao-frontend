
import { usePlayers } from "../context/PlayerContext";
import { Table, Container, Button } from 'react-bootstrap';
import './Players.css';
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"
import { IconChevronRight } from "./Icons";
import { PlayerProvider } from "../context/PlayerContext";

export default function Players() {
  const { players } = usePlayers();
  
  const orderByRating = players.sort((a, b) => b.rating - a.rating)

  const navigate = useNavigate()
  const goToPlayerHistory = (id) => {
    navigate(`/jugador/${id}`, { state: { players } })
  }

  const {theme} = useTheme()

  return (
    <PlayerProvider>
      <Container className="mt-4">
      <h1 className="text-center mb-4">Jugadores</h1>
      <Table striped bordered hover responsive className="players-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Club</th>
            <th>Rating</th>
            <th>Elo</th>
            <th>ID Fide</th>
            <th>Historial</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderByRating) && orderByRating && orderByRating.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.category}</td>
              <td>{player.club}</td>
              <td>{player.rating}</td>
              <td>{player.elo}</td>
              <td><Link className="link" to={`https://ratings.fide.com/profile/${player.id_fide}`}>{player.id_fide}</Link></td>
              <td><Button variant={theme} onClick={()=>{goToPlayerHistory(player.id)}}>Ir al historial<IconChevronRight></IconChevronRight></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </PlayerProvider>
  );
}

