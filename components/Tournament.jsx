import { Card} from "react-bootstrap";
import { IconTrophy, IconCalendar, IconMapPin, IconChartBar, IconList, IconChessKnight } from "../components/Icons.jsx"

export function Tournament({tournament}){

  
  
    
    return(

      <Card className="tournament-card h-100 shadow-sm">
      <Card.Header className="tournament-card-header">
        <Card.Title><IconTrophy ></IconTrophy>{tournament?.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="tournament-card-text">
          <div><IconMapPin/> <strong>Locacion:</strong> {tournament?.location}</div>
          <div><IconChessKnight/> <strong>Formato:</strong> {tournament?.mode}</div>
          <div><IconList/> <strong>Cant. de Rondas:</strong> {tournament?.rounds?.length}</div>
    
        </Card.Text>
      
      </Card.Body>
     
            <Card.Footer>
            <IconCalendar></IconCalendar> <strong>Fecha de inicio:</strong> {tournament?.start_date}
            </Card.Footer>
    </Card>
       
        
            
        
   )
}