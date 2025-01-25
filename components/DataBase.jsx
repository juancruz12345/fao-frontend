import {Container, Row, Table, Alert, Col, Form, Button, Card } from "react-bootstrap"
import { useQuery } from "@tanstack/react-query"
import './DataBase.css'
import { usePlayers } from "../context/PlayerContext"
import { Loading } from "./Loading"
import { IconX, IconSearch, IconDownload, IconLink } from "./Icons"
import { useState } from "react"
import { ToastComponent } from "./ToastComponent"

export default function DataBase(){

  const {players} = usePlayers()
  const playerMap = new Map(players.map(player => [player.id, player.name]))
  const getPlayerName = (playerId) => playerMap.get(playerId) || "Unknown Player"
  const getPlayer = (playerId) => players.find((player) => player.id === playerId) || { rating: 'N/A' }
   const [searchName, setSearchName] = useState('')
    const [searchTournament, setSearchTournament] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [searchingMatch, setSearchingMatch] = useState([])
    const [show, setShow] = useState(false)
  
  const handleSearch = () => {
    if (!allMatchesDataBase?.length>0) return
    const filteredMatches = allMatchesDataBase.filter((e) =>
      (searchName === '' || 
       getPlayerName(e.player1_id).toLowerCase().includes(searchName.toLowerCase()) ||
       getPlayerName(e.player2_id).toLowerCase().includes(searchName.toLowerCase()) ) &&

      (searchTournament === '' || 
       e.tournament_name.toLowerCase().includes(searchTournament.toLowerCase())) &&

      (searchDate === '' || new Date(e?.tournament_start_date).toLocaleDateString().includes(searchDate) )
        
        
    )
    if(filteredMatches.length>0){
      setSearchingMatch(filteredMatches)
      
    }
    else{
      
      setShow(true)
    }
   
   
  }

  const resetSearch = () => {
    setSearchName('')
    setSearchTournament('')
    setSearchDate('')
    setSearchingMatch([])
  }
  
  
  const { data: allMatchesDataBase = [], isLoading, isError } = useQuery({
        queryKey: ["allMatchesDataBase"],
        queryFn: async () => {
          console.log('Fetching database')
          const response = await fetch(`https://fao-backend.onrender.com/matches`, {
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

      console.log(allMatchesDataBase)
    if(isLoading) return(<Loading msg={'Cargando base de datos'}></Loading>)
      if (isError) {
        return (
          <Container className="py-5">
            <Alert variant="danger">
              Error: {isError}
            </Alert>
          </Container>
        )
      }

    return(
      <div>
        <Container id="database-container">
        <h1 className="title">Base de datos</h1>
            <Row>
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
                <Col xs={12} sm={6} md={4}>
                  <Form.Group>
                    <Form.Label>Buscar por fecha</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Fecha del torneo"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
            
                  <Col xs={12} md={4} className="d-flex align-items-end">
                  <div className="d-flex gap-2 flex-grow-1">
                    <Button variant="primary" onClick={handleSearch} className="flex-grow-1">
                      <IconSearch size={20} className="me-2" />
                      Buscar
                    </Button>
                    <Button variant="outline-secondary" onClick={resetSearch} className="flex-grow-1" >
                     { <IconX size={20} className="me-2" /> }
                      Limpiar
                    </Button>
                  </div>
                </Col>
           
              </Row>
            </Card.Body>
          </Card>
          </Row>
          
            <Row>
            <Table striped bordered hover responsive className="database-table">
        <thead>
          <tr>
            <th>Jugador de blancas</th>
            <th>Rating</th>
            <th>Jugador de negras</th>
            <th>Rating</th>
            <th>Torneo</th>
            <th>Fecha</th>
            <th>Resultado</th>
            <th>Link</th>
            <th>PGN</th>
          </tr>
        </thead>
        <tbody>
  {(searchingMatch.length>0 ? searchingMatch : allMatchesDataBase).map((match) => (
    <tr key={match?.id}>
    <td>{getPlayerName(match?.player1_id)}</td>
    <td>{getPlayer(match?.player1_id)?.rating || 'N/A'}</td>
    <td>{getPlayerName(match?.player2_id)}</td>
    <td>{getPlayer(match.player2_id)?.rating || 'N/A'}</td>
    <td>{match?.tournament_name}</td>
    <td>{new Date(match?.tournament_start_date).toLocaleDateString()}</td>
    <td>{match?.result}</td>
    <td>{match?.link && (<a href={match?.link}>Link <IconLink></IconLink></a>)}</td>
    <td>{match?.pgn && (
                            <a 
                              href={match?.pgn} 
                              download 
                              className="btn btn-outline-primary btn-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(match.pgn, '_blank');
                              }}
                            >
                             Descargar <IconDownload></IconDownload>
                            </a>)}</td>
  
  </tr>
  ))}
</tbody>
      </Table>
            </Row>
        </Container>
  
     <ToastComponent show={show} setShow={setShow} msg={'No se encontró ninguna partida.'}></ToastComponent>
  </div>
    )
}

