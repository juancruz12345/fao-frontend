import { Card} from "react-bootstrap";
import { IconTrophy, IconCalendar, IconMapPin, IconList, IconChessKnight } from "../components/Icons.jsx"

export function Tournament({tournament}){

  
  
    
    return(

      <Card className="tournament-card h-100 shadow-sm">
      <Card.Header className="tournament-card-header">
        <Card.Title><IconTrophy ></IconTrophy>{tournament?.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="tournament-card-text">
          <span><IconMapPin/> <strong>Locacion:</strong> {tournament?.location}</span>
          <span><IconChessKnight/> <strong>Formato:</strong> {tournament?.mode}</span>
          <span><IconList/> <strong>Cant. de Rondas:</strong> {tournament?.rounds?.length}</span>
    
        </Card.Text>
      
      </Card.Body>
     
            <Card.Footer>
            <IconCalendar></IconCalendar> <strong>Fecha de inicio:</strong> {tournament?.start_date}
            </Card.Footer>
    </Card>
       
        
            
        
   )
}