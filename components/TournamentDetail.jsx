import { useParams } from "react-router-dom"
import { Accordion, Card, Badge, Container, Row, Col, Table, Alert, Spinner } from "react-bootstrap"
import { IconMapPin, IconCalendar, IconChessKnight } from "../components/Icons.jsx"
import "./TournamentDetail.css"
import { useEffect } from "react"
import { Loading } from "./Loading.jsx"
import { useLocation } from "react-router-dom"
import { usePlayers } from "../context/PlayerContext.jsx"
import { useQuery } from "@tanstack/react-query"

export default function TournamentDetail() {
  const { id } = useParams()
  const { players } = usePlayers()
  const filteredPlayers = players?.filter(e=>e?.name!=='LIBRE')
  const playerMap = new Map(filteredPlayers.map((player) => [player.id, player.name]))
  const getPlayerName = (playerId) => playerMap.get(playerId) || "-"
  const location = useLocation()

  const { tournaments } = location.state || {}
  const tournament = tournaments.find((p) => p.id === Number.parseInt(id))

  const {
    data: standings = [], isLoading,isError,} = useQuery({
    queryKey: ["standings", id],
    queryFn: async () => {
      console.log("Fetching tournament matches from API...")
      const response = await fetch(`https://fao-backend.onrender.com/tournament/${id}/standings`)

      if (!response.ok) {
        throw new Error("Error al cargar la página")
      }

      const data = await response.json()
      return data
    },
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  })

  const filteredStandings = standings?.filter(e=>e?.player_name!=='LIBRE')

  useEffect(() => {
   console.log(standings)
  }, [id, standings])


  if (isError) return <Alert>Error: {isError}</Alert>

  return (
    <div>
      <div>
        {tournament !== undefined ? (
          <Container className="tournament-detail-container">
            <Row className="justify-content-center">
              <Col xs={12} lg={8}>
                <Card className="tournament-detail-card mb-4">
                  <Card.Header>
                    <h2 className="mb-0">{tournament?.name}</h2>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <IconMapPin className="me-2" />
                      <strong>Lugar: {tournament?.location}</strong>{" "}
                    </Card.Text>
                    <Card.Text>
                      <IconCalendar className="me-2" />
                      <strong>Fecha de inicio: {tournament?.start_date}</strong>{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Accordion className="rounds-accordion mb-4">
                  {tournament?.rounds?.length > 0 &&
                    tournament.rounds?.map((round, index) => (
                      <Accordion.Item className="rounds-item" key={round?.number} eventKey={index.toString()}>
                        <Accordion.Header className="rounds-header">
                          <h5 className="mb-0">
                            <IconChessKnight className="me-2" />
                            Ronda {round?.number}
                          </h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          {round?.matches?.length > 0 &&
                            round?.matches?.map((match, i) => (
                              <Card key={i} className="match-card mb-2">
                                <Card.Body>
                                  <div className="players-container">
                                    <span className="player-name">{getPlayerName(match?.player1_id)}</span>
                                    <Badge bg="secondary" className="result-badge">
                                      {match?.result}
                                    </Badge>
                                    <span className="player-name">{getPlayerName(match?.player2_id)}</span>
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
                {
                  isLoading ? <div className="div-spinner"><Spinner></Spinner><p>Cargando clasificación</p></div>
                  : <Card className="standings-card">
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
                        {filteredStandings?.length > 0 &&
                          filteredStandings?.map((player, i) => (
                            <tr key={i}>
                              <td>{player.player_name}</td>
                              <td>{player.points}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                }
              </Col>
            </Row>
          </Container>
        ) : (
          <Loading msg={"Cargando torneo"}></Loading>
        )}
      </div>
    </div>
  )
}


/////FOR LICHESS API///////
  /*const fetchBroadcast = async (id) => {
    try {
      console.log('Fetching details')
      // Fetch del broadcast
      const response = await fetch(`https://lichess.org/api/broadcast/${id}`);
      if (!response.ok) throw new Error("Error al obtener el broadcast")
  
      const broadcast = await response.json()
  
      if (!broadcast.rounds || broadcast.rounds.length === 0) {
        throw new Error("El broadcast no tiene rondas disponibles.")
      }
  
      // Crear un array de promesas para las rondas
      const roundPromises = broadcast.rounds.map(async(round) => {
        const url = `https://lichess.org/api/broadcast/${broadcast?.tour?.slug}/${round?.slug}/${round?.id}`
        return fetch(url).then((res) => {
          if (!res.ok) throw new Error("Error al obtener la ronda")
          return res.json(); // Parsear cada ronda a JSON
        })
      })
  
      const allRounds = await Promise.all(roundPromises)
  
      const allGames = allRounds.flatMap((round) => round.games)

      return { broadcast, rounds: allRounds, games: allGames }
    } catch (error) {
      throw new Error("Error fetching broadcast and games: " + error.message)
    }
  };*/
  


/*const calculateStandings = (games) => {
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
}*/




/*const { data, isLoading, error } = useQuery({
  queryKey: ["tournamentDetail", id],
  queryFn: () => fetchBroadcast(id), // Retorna el resultado de fetchBroadcast
  staleTime: 1000 * 60 * 20, // 20 minutos
  cacheTime: 1000 * 60 * 30, // 30 minutos
  refetchOnWindowFocus: false, // No refetch al enfocar la ventana
});
  console.log(data)*/
 /*
  useEffect(() => {
    if(data!==undefined){
      
      if (data?.games?.length > 0 && data?.games[0]?.players?.length>0) {
        let standingsVar = calculateStandings(data?.games)
        setStandings(standingsVar)
        
      }
    }


  }, [])*/