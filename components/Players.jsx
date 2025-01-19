
import { usePlayers } from "../context/PlayerContext";
import { Table, Container, Button } from 'react-bootstrap';
import './Players.css';
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"
import { IconChevronRight,IconSortArrows } from "./Icons";
import { useEffect, useState } from "react";



export default function Players() {

  const { players } = usePlayers()
  const [playersArray, setPlayersArray] = useState([...players].sort((a, b) => a.name.localeCompare(b.name)))

  const orderByName = () => {
    const byName = [...players].sort((a, b) => a.name.localeCompare(b.name))
    setPlayersArray(byName)
  }

  const orderByCategory = () => {
    const byCategory = [...players].sort((a, b) => {
      if (!a.category) return 1 
      if (!b.category) return -1
      return a.category.localeCompare(b.category) 
    })
    setPlayersArray(byCategory)
  }
  const orderByClub= () => {
    const byClub = [...players].sort((a, b) => {
      if (!a.club) return 1 
      if (!b.club) return -1
      return a.club.localeCompare(b.club) 
    })
    setPlayersArray(byClub)
  }

  const orderByRating = () => {
    const byRating = [...players].sort((a, b) => b.rating - a.rating)
    setPlayersArray(byRating)
  }

  const orderByElo = () => {
    const byElo = [...players].sort((a, b) => b.elo - a.elo)
    setPlayersArray(byElo)
  }


  const navigate = useNavigate()
  const goToPlayerHistory = (id) => {
    navigate(`/jugador/${id}`, { state: { players } })
  }

  const {theme} = useTheme()

  useEffect(()=>{
    
  },[playersArray])
  

  return (
      <Container className="mt-4" id="players-container">
      <h1 className="text-center mb-4">Jugadores</h1>
      <div>
      <span className="filter-span">Ordenar por:</span>
       <div className="row-filters">
       
        <Button className="btn-filter" variant={theme==='dark' ? 'outline-light' : 'outline-dark'} onClick={orderByName}>Nombre </Button>
        <Button className="btn-filter" variant={theme==='dark' ? 'outline-light' : 'outline-dark'} onClick={orderByCategory}>Categoría </Button>
        <Button className="btn-filter" variant={theme==='dark' ? 'outline-light' : 'outline-dark'}  onClick={orderByClub}>Club </Button>
        <Button className="btn-filter" variant={theme==='dark' ? 'outline-light' : 'outline-dark'}  onClick={orderByRating}>Rating </Button>
        <Button className="btn-filter" variant={theme==='dark' ? 'outline-light' : 'outline-dark'}  onClick={orderByElo}>Elo </Button>
       </div>
      </div>
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
          {Array.isArray(playersArray) && playersArray && playersArray?.map((player) => (
            <tr key={player?.id}>
              <td>{player?.name}</td>
              <td>{player?.category}</td>
              <td>{player?.club}</td>
              <td>{player?.rating}</td>
              <td>{player?.elo}</td>
              <td><Link className="link" to={`https://ratings.fide.com/profile/${player.id_fide}`}>{player?.id_fide}</Link></td>
              <td ><Button className="btn-history" variant={theme} onClick={()=>{goToPlayerHistory(player?.id)}}>Ir al historial<IconChevronRight></IconChevronRight></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
   
  )
}

