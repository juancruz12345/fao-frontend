

import { useTournament } from "../context/TournamentContext";
import { Container, Row, Col } from "react-bootstrap";
import './Tournaments.css';
import { useNavigate } from "react-router-dom";
import { TournamentProvider } from "../context/TournamentContext";
import {Tournament} from '../components/Tournament.jsx'


export function TournamentsContent() {

  const { tournaments } = useTournament();

  const navigate = useNavigate();
  
  
 
  const goToTournamentDetail = (id) => {
    navigate(`/torneo/${id}`, { state: { tournaments } })
  }



  return (
    <Container fluid className="tournaments-container">
     
      <h1 className="text-center my-4">Torneos</h1>
     {
      tournaments!==undefined ?
      <Row xs={1} md={2} lg={3} className="g-4">
      {Array.isArray(tournaments) && tournaments?.map((tournament) => (
        <Col key={tournament?.id}>
         <div className="tournaments-div" onClick={()=>{goToTournamentDetail(tournament?.id)}}>
         <Tournament tournament={tournament}></Tournament>
         </div>
        </Col>
      ))}
     
    </Row>
    : <></>
     }
    </Container>
  );
}

export default function Tournaments(){
  return(
    <TournamentProvider>
      <TournamentsContent></TournamentsContent>
    </TournamentProvider>
  )
}

