
import { Image, Modal } from 'react-bootstrap';
import { IconCalendar, IconClock } from './Icons';

export function ModalComponent({ show, setShow, img }) {
  
  const handleClose = () => setShow(false)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
}
    



  return (
    <Modal show={show} onHide={handleClose} centered size="lg" >
      <Modal.Header closeButton closeVariant='white'>
      {img?.title || ''}
      </Modal.Header>
      <Modal.Body className="text-center p-0">
        <div className="image-container">
          <Image 
            src={img?.url} 
            alt={img?.title || 'Image preview'} 
            fluid 
            className="modal-image"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
      <div className="img-meta">
                      
                                <IconCalendar />
                                {formatDate(img.created_at)}
                       
                           
                        </div>
      </Modal.Footer>
    </Modal>
  )
}

