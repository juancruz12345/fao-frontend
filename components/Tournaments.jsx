

import { useTournament } from "../context/TournamentContext";
import { usePlayers } from "../context/PlayerContext";
import { Container, Row, Col } from "react-bootstrap";
import './Tournaments.css';
import { Tournament } from './Tournament';
import { useNavigate } from "react-router-dom";


export function Tournaments() {
  const { tournaments } = useTournament();
  

  const navigate = useNavigate();
  
  
  const goToTournamentDetail = (id) => {
    navigate(`/torneo/${id}`, { state: { tournaments } })
  }

  return (
    <Container fluid className="tournaments-container">
     
      <h1 className="text-center my-4">Torneos</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tournaments?.map((tournament) => (
          <Col key={tournament.id}>
           <div className="tournaments-div" onClick={()=>{goToTournamentDetail(tournament.id)}}>
           <Tournament tournament={tournament}></Tournament>
           </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

