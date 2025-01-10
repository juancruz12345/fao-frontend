
import { Modal, Button, Table, Card } from 'react-bootstrap';
import './InfoModal.css';
import './Players.css';

export function InfoModal({ show, setShow, element }) {




    const handleDownloadEstatuto = () => {
          
        const pdfUrl = './ESTATUTO - FEDERACION DE AJEDREZ DE OLAVARRIA.pdf'
        const link = document.createElement("a")
        link.href = pdfUrl
        link.download = "estatutoFAO.pdf"
        link.click()
        }
    const handleDownloadReglamento = () => {
          
        const pdfUrl = './REGLAMENTO GENERAL - FEDERACIÓN DE AJEDREZ DE OLAVARRIA.pdf'
        const link = document.createElement("a")
        link.href = pdfUrl
        link.download = "reglamentoFAO.pdf"
        link.click()
            }
   


  return (
    <Modal 
      show={show} 
      onHide={() => setShow(false)} 
      centered 
      dialogClassName="custom-modal-content"
      contentClassName="custom-modal-content"
      
    >
      <Modal.Header closeButton className="custom-modal-header"></Modal.Header>
      <Modal.Body className="custom-modal-body">
        {element?.title === 'Dirigencia' && (
          <ul className="list-unstyled">
            {element?.dirigentes.map((e, i) => (
              <li key={i} className="entity-card">
                <h4>{e.cargo}</h4>
                <p>{e.nombre}</p>
                <p>DNI: {e.dni}</p>
              </li>
            ))}
          </ul>
        )}

        {
            element?.title === 'Estatuto FAO' && (
           <div className='download-div'>
            <p>Descarga el PDF del estatuto de la FAO</p>
             <Button onClick={handleDownloadEstatuto}>
                Descargar PDF
            </Button>
           </div>
            )
           
        }
        {
            element?.title === 'Reglamento FAO' && (
           <div className='download-div'>
            <p>Descarga el PDF del reglamento de la FAO</p>
             <Button onClick={handleDownloadReglamento}>
                Descargar PDF
            </Button>
           </div>
            )
           
        }

        {element?.title === 'Entidades afiliadas' && (
          <ul className="list-unstyled">
            {element?.entidades.map((e, i) => (
              <li key={i} className="entity-card">
                <img src={e.img} loading='lazy' width={80} height={80}></img>
                <h3>{e.nombre}</h3>
                <p>Dirección: {e.direccion}</p>
                {e?.redes.length > 0 && (
                  <div>
                    <p className="mb-1">Redes:</p>
                    <ul className="list-unstyled">
                      {e?.redes.map((red, j) => (
                        <li key={j}>
                          <a href={red} target="_blank" rel="noopener noreferrer">
                            {red}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {
            element?.title === 'Sede FAO' && (
               <div>
                <img loading='lazy' width={400} height={200} src={'./club_social.jpg'}></img>
                <br></br>
                 <h4>Club Social Olavarría. 1° Piso</h4>
                <br></br>
                <p>Direccion: General Paz 2734</p>
               </div>
            )
        }
{
  element?.title === 'Listado de clubes' && (
    <div>
      {
        element?.clubes?.map((club, i) => (
          <Card key={i} className='card-clubes'>
            <Card.Title><img loading='lazy' width={80} height={80} src={club.img}></img><h2>{club.nombre}</h2></Card.Title>
            <Card.Body>
              <h4>Jugadores</h4>
             <ul className="list-unstyled">
             { element?.players
                  ?.filter(player => player.club === club.nombre).length>0
                  ?
                // Filtra los jugadores cuyo club sea igual al club actual y luego los mapea
                element?.players
                  ?.filter(player => player.club === club.nombre)
                  .map((player, index) => (
                    <li key={index} className="entity-card">
                      <p>{player.name}</p> {/* Muestra el nombre u otra información del jugador */}
                    </li>
                  ))
                  :<>No hay jugadores registrados</>
              }
             </ul>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  )
}

        {
            element?.title === 'Rating' && (
               <div>
                 <Table striped bordered hover responsive className="players-table">
        <thead>
          <tr>
            <th>Nombre</th>
          
            <th>Rating</th>
          
           
          </tr>
        </thead>
        <tbody>
          {element?.players && element?.players.sort((a, b) => b.rating - a.rating).map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
          
              <td>{player.rating}</td>
              
              
            </tr>
          ))}
        </tbody>
      </Table>
               </div>
            )
        }
      </Modal.Body>
     
    </Modal>
  );
}

