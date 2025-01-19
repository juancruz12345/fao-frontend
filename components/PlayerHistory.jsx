import { useParams, useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Card, Badge, Table, Form, Button, Container, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { IconSearch, IconX, IconDownload, IconUser, IconLink } from '../components/Icons.jsx'
import { Loading } from "./Loading.jsx"
import { TournamentProvider } from "../context/TournamentContext.jsx"
import './PlayerHistory.css'
import { ToastComponent } from "./ToastComponent.jsx"

export function PlayerHistoryContent() {
  const { id } = useParams()
  const location = useLocation()
  const { players } = location.state || {}
  const player = players.find(p => p.id === parseInt(id))
  const playerName = player.name
  const [searchName, setSearchName] = useState('')
  const [searchTournament, setSearchTournament] = useState('')
  const [searchingMatch, setSearchingMatch] = useState([])
  const [show, setShow] = useState(false)
  
  

  const { data: playerHistory = [], isLoading, isError } = useQuery({
    queryKey: ["player_history", id],
    queryFn: async () => {
      console.log('Fetching historial')
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
    if(filteredMatches.length>0){
      setSearchingMatch(filteredMatches)
      
    }
    else{
      
      setShow(true)
    }
    console.log(filteredMatches)
   
  }

  const resetSearch = () => {
    setSearchName('')
    setSearchTournament('')
    setSearchingMatch([])
  }



  useEffect(()=>{
  calcularHistorial()

  },[id])
   

  const [totalVictories, setTotalVictories] = useState(0)
  const [totalDraws, setTotalDraws] = useState(0)
  const [totalLoses, setTotalLoses] = useState(0)

   function calcularHistorial(){
  
        if(playerHistory?.matches?.length>0){
          for(const game of playerHistory.matches){

            if(game?.result === '1-0' && game?.player1_name===playerName){
              setTotalVictories(prev=>prev+1)
            }
            else if(game?.result === '0-1' && game?.player2_name===playerName){
              setTotalVictories(prev=>prev+1)
            }
            else if((game?.player1_name===playerName && game?.player2_name==='LIBRE') || (game?.player2_name===playerName && game?.player1_name==='LIBRE')){
              setTotalVictories(prev=>prev+1)
            }
            else if(game?.result === '1-0' && game?.player2_name===playerName){
              setTotalLoses(prev=>prev+1)
            }
            else if(game?.result === '0-1' && game?.player1_name===playerName){
              setTotalLoses(prev=>prev+1)
            }
            else if(game?.result === '1/2-1/2'){
              setTotalDraws(prev=>prev+1)
            }
           
           
          }
        
        }
      
   }


  
  if (isError) return <div className="text-center text-danger">Error al cargar el historial del jugador</div>


 

  return (
    <div>
      <Container className="py-5" id="player-history-container">
       

       <h1 className="mb-4">{playerName}</h1>
      
     {
      isLoading ? <Loading msg={'Cargando historial de jugador'}></Loading>

      :
      <div>
         {Array.isArray(playerHistory?.matches) && playerHistory?.matches?.length > 0 ? (
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
                    <td>{totalVictories}</td>
                    <td>{totalDraws}</td>
                    <td>{totalLoses}</td>
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
            {(searchingMatch.length > 0 ? searchingMatch : playerHistory?.matches)?.map((match) => (
              <Col key={match.match_id}>
                <Card className="h-100">
                  <Card.Header>
                    <Card.Title className="h5 mb-0">
                      <strong>Torneo:</strong> {match?.tournament_name}
                    </Card.Title>
                    <Card.Subtitle className="mt-1">
                      <strong>Ronda </strong>{match?.round_number}
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <div className="match-result">
                      <div className="player-name">
                      
                        <span>{match?.player1_name}</span>
                      </div>
                      <Badge bg="secondary">{match?.result}</Badge>
                      <div className="player-name">
                        <span>{match?.player2_name}</span>
                      
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="match-links">
                      {match?.link && (
                        <a href={match.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">
                          Ver partida <IconLink />
                        </a>
                      )}
                       {match?.pgn && (
                        <a 
                          href={match?.pgn} 
                          download 
                          className="btn btn-outline-primary btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(match.pgn, '_blank');
                          }}
                        >
                          Descargar PGN <IconDownload size={16} />
                        </a>
                      )}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <h2>No hay historial</h2>
      )}
      </div>
     }
      

    </Container>
    <ToastComponent show={show} setShow={setShow} msg={'No se encuentro ninguna partida.'}></ToastComponent>
    </div>
  )
}

export default function PlayerHistory(){
  return(
    <TournamentProvider>
      <PlayerHistoryContent></PlayerHistoryContent>
    </TournamentProvider>
  )
}


/**
 * 
 * 
 * 

    const [isLoading, setIsLoading] = useState(false)
    ///const [matches, setMatches] = useState([])
  
    const traerHistorialPlayer = async (broadcasts) => {
      const results = []; // Array para almacenar los resultados
      setIsLoading(true)
    
      try {
        for (const tournament of broadcasts) {
          const r = await fetch(`https://lichess.org/api/broadcast/${tournament.tour.id}`);
          const broadcast = await r.json();
    
          // Iterar sobre las rondas del torneo
          const roundPromises = broadcast.rounds.map(async (round) => {
            const roundResponse = await fetch(
              `https://lichess.org/api/broadcast/${tournament.tour.slug}/${round.slug}/${round.id}`
            );
            const roundData = await roundResponse.json();
    
            // Filtrar las partidas del jugador
            const playerGames = roundData.games.filter(
              (game) =>
                game.players &&
                (game.players[0].name === playerName || game.players[1].name === playerName)
            );
    
            if (playerGames.length > 0) {
              // Agregar las partidas y el elemento `tour` al array de resultados
              results.push({
                roundName: round.name,
                tour: roundData.tour, // Incluye el elemento `tour`
                games: playerGames,
              });
            }
          });
    
          await Promise.all(roundPromises); // Esperar todas las rondas
        }
    
        return results; // Devolver los resultados estructurados
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Lanza el error para manejo en React Query
      }
      finally{
        setIsLoading(false)
      }
    };
    

    const { data } = useQuery({
      queryKey: ["playerHistory", id, broadcasts],
      queryFn: () => traerHistorialPlayer(broadcasts, id), // Retorna el resultado de fetchBroadcast
      staleTime: 1000 * 60 * 20, // 20 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      enabled: !!id, // Solo ejecuta la consulta si el id es válido
      refetchOnWindowFocus: false, // No refetch al enfocar la ventana
    });
 */