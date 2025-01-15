

import { useParams} from "react-router-dom";
import { Accordion, Card, Badge, Container, Row, Col, Table } from "react-bootstrap";
import { IconMapPin, IconCalendar, IconChessKnight } from '../components/Icons.jsx';
import './TournamentDetail.css';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading.jsx";

export default function TournamentDetail() {
  ///const { players } = usePlayers()
  ////const playerMap = new Map(players.map(player => [player.id, player.name]))
  ///const getPlayerName = (playerId) => playerMap.get(playerId) || "Unknown Player"
 /// const location = useLocation()
  
  //const { tournaments } = location.state || {}
  // const tournament = tournaments.find(p => p.id === parseInt(id))
  
  const { id } = useParams()
  const [standings, setStandings] = useState({})
  
  
  const fetchBroadcast = async (id) => {
    try {
      console.log('Fetching details')
      // Fetch del broadcast
      const response = await fetch(`https://lichess.org/api/broadcast/${id}`);
      if (!response.ok) throw new Error("Error al obtener el broadcast");
  
      const broadcast = await response.json();
  
      if (!broadcast.rounds || broadcast.rounds.length === 0) {
        throw new Error("El broadcast no tiene rondas disponibles.");
      }
  
      // Crear un array de promesas para las rondas
      const roundPromises = broadcast.rounds.map((round) => {
        const url = `https://lichess.org/api/broadcast/${broadcast?.tour?.slug}/${round?.slug}/${round?.id}`;
        return fetch(url).then((res) => {
          if (!res.ok) throw new Error("Error al obtener la ronda");
          return res.json(); // Parsear cada ronda a JSON
        });
      });
  
      // Ejecutar todas las promesas en paralelo
      const allRounds = await Promise.all(roundPromises);
  
      // Extraer todos los juegos de las rondas
      const allGames = allRounds.flatMap((round) => round.games);
  
      // Retornar el resultado como un objeto
      return { broadcast, rounds: allRounds, games: allGames };
    } catch (error) {
      throw new Error("Error fetching broadcast and games: " + error.message);
    }
  };
  
const traerHistorialPlayer = async (broadcasts) => {
  const playerName = 'Zito, Alberto';

  for (const tournament of broadcasts) {
    // Fetch del torneo
    const r = await fetch(`https://lichess.org/api/broadcast/${tournament.tour.id}`);
    const broadcast = await r.json();
   

    // Crear un array de promesas para fetch de cada ronda
    const roundPromises = broadcast.rounds.map(async (round) => {
      
     
      const roundResponse = await fetch(`https://lichess.org/api/broadcast/${tournament.tour.slug}/${round.slug}/${round.id}`);
      const roundData = await roundResponse.json()
      
      // Filtrar partidas por el jugador
      const playerGames = roundData.games.filter(
        (game) =>
        {
          if(game.players){
            game?.players[0].name === playerName || game?.players[1].name === playerName
          }
        }
      )

      if (playerGames.length > 0) {
        console.log(`Partidas para ${playerName} en la ronda ${round.name}:`, playerGames)
      }
    })

    // Ejecutar todas las promesas de las rondas en paralelo
    await Promise.all(roundPromises)
  }
}

const calculateStandings = (games) => {
  const standings = {};

  games.forEach((game) => {
    
      const [player1, player2] = game.players;

   
    if (player1.name === "LIBRE" || player2.name === "LIBRE") {
      if (player1.name === "LIBRE" && player2.name !== "LIBRE") {
        
        if (!standings[player2.name]) standings[player2.name] = 0
        standings[player2.name] += 1
      } else if (player2.name === "LIBRE" && player1.name !== "LIBRE") {
       
        if (!standings[player1.name]) standings[player1.name] = 0
        standings[player1.name] += 1
      }
      return
    }

   
    if (!standings[player1.name]) standings[player1.name] = 0
    if (!standings[player2.name]) standings[player2.name] = 0

    
    if (game.status === "1-0") {
      standings[player1.name] += 1
    } else if (game.status === "0-1") {
      standings[player2.name] += 1
    } else if (game.status === "½-½") {
      standings[player1.name] += 0.5
      standings[player2.name] += 0.5
    }
    
  

  })

  
  const standingsArray = Object.entries(standings).map(([name, points]) => ({
    name,
    points,
  }))

  
  standingsArray.sort((a, b) => b.points - a.points)

  return standingsArray
}




const { data, isLoading, error } = useQuery({
  queryKey: ["tournamentDetail", id],
  queryFn: () => fetchBroadcast(id), // Retorna el resultado de fetchBroadcast
  staleTime: 1000 * 60 * 20, // 20 minutos
  cacheTime: 1000 * 60 * 30, // 30 minutos
  refetchOnWindowFocus: false, // No refetch al enfocar la ventana
});
  console.log(data)
 
  useEffect(() => {
    if(data!==undefined){
      console.log(data?.games[0]?.players?.length)
      if (data?.games?.length > 0 && data?.games[0]?.players?.length>0) {
        let standingsVar = calculateStandings(data?.games)
        setStandings(standingsVar)
        
      }
    }
  }, [data?.games]);


    useEffect(()=>{
  
    },[id])

    if (isLoading) return <Loading msg={'Cargando torneo'}></Loading>
    if (error) return <div>Error: {error.message}</div>

  return (
   <div>



    <div>{
      data !== undefined
      ? <Container className="tournament-detail-container">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card className="tournament-detail-card mb-4">
            <Card.Header>
              <h2 className="mb-0">{data.broadcast?.tour?.name}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Text><IconMapPin className="me-2" /><strong>Lugar: {data?.broadcast.tour.info?.location}</strong> </Card.Text>
              <Card.Text><IconCalendar className="me-2" /><strong>Fecha de inicio: {(new Date(data?.broadcast?.tour?.dates[0]).toLocaleDateString())}</strong> </Card.Text>
            </Card.Body>
          </Card>

          
           <Accordion className="rounds-accordion mb-4">
            {data?.rounds?.length>0 && data.rounds?.map((round, index) => (
              <Accordion.Item className='rounds-item' key={round?.round?.id} eventKey={index.toString()}>
                <Accordion.Header className='rounds-header'>
                  <h5 className="mb-0"><IconChessKnight className="me-2" />{round?.round?.name}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  {round?.games?.length>0 && round?.games?.map((game) => (
                    <Card key={game.id} className="match-card mb-2">
                     
                    <Card.Body>
                       {
                        game?.players!==undefined && (
                          <div className="players-container">
                          <span className="player-name">{game?.players[0]?.name}</span>
                          <Badge bg='secondary' className="result-badge">{game?.status}</Badge>
                          <span className="player-name">{game?.players[1]?.name}</span>
                        </div>
                        )
                       }
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
                  {standings.length>0 && standings?.map((player) => (
                    <tr key={player.name}>
                      <td>{player.name}</td>
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
    : <Loading msg={'Cargando torneo'}></Loading>

      }
    </div>





   </div>
  );
}

