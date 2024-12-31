
import { usePlayers } from "../context/PlayerContext";
import { Table, Container } from 'react-bootstrap';
import './Players.css';
import { Link } from "react-router-dom";

export function Players() {
  const { players } = usePlayers();

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Jugadores</h1>
      <Table striped bordered hover responsive className="players-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Rating</th>
            <th>Elo</th>
            <th>ID Fide</th>
          </tr>
        </thead>
        <tbody>
          {players && players.map((player) => (
            <tr key={player.id}>
              <td>{player.nombre}</td>
              <td>{player.categoria}</td>
              <td>{player.rating}</td>
              <td>{player.elo}</td>
              <td><Link className="link" to={`https://ratings.fide.com/profile/${player.idFide}`}>{player.idFide}</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

