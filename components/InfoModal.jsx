
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './InfoModal.css';

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
                <h3><strong>{e.cargo}</strong></h3>
                <h4>{e.nombre}</h4>
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
                 <h3>Club Social Olavarría. 1° Piso</h3>
                <br></br>
                <h4>Direccion: General Paz 2734</h4>
               </div>
            )
        }
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
       {/**
        *  <Button variant="secondary" onClick={() => setShow(false)}>
          Cerrar
        </Button>
        */}
      </Modal.Footer>
    </Modal>
  );
}

