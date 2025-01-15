import { Card} from "react-bootstrap";
import { IconTrophy } from "../components/Icons.jsx"

export function Tournament({tournament}){


  
    
    return(

      <Card className="tournament-card h-100 shadow-sm">
      <Card.Header className="tournament-card-header">
        <Card.Title><IconTrophy className='icon-trophy'></IconTrophy>{tournament?.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Lugar:</strong> {tournament?.info?.location}
          <strong>Formato:</strong> {tournament?.info?.format}
          <strong>Cant. Rondas:</strong> {tournament?.rounds?.length}
    
        </Card.Text>
       
        
   
      
      </Card.Body>
      {/*
              <Card className="tournament-card h-100 shadow-sm">
              <Card.Header className="tournament-card-header">
                <Card.Title><IconTrophy></IconTrophy>{tournament.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Lugar:</strong> {tournament.location}
                </Card.Text>
                <Card.Text>
                  <strong>Fecha de inicio:</strong> {new Date(tournament.start_date).toLocaleDateString()}
                </Card.Text>
              
              </Card.Body>
            </Card>
            */}
            <Card.Footer>
            <strong>Fecha de inicio:</strong> {new Date(tournament?.dates[0]).toLocaleDateString()}
            </Card.Footer>
    </Card>
       
          
            
        
    )
}