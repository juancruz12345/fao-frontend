
import React from 'react';
import { Image, Modal } from 'react-bootstrap';
import { IconCalendar } from './Icons';
import './ModalComponent.css';

export function ModalComponent({ show, setShow, img }) {
  const handleClose = () => setShow(false);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Modal show={show} onHide={handleClose} centered fullscreen className="fullscreen-image-modal">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>{img?.title || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center p-0">
        <div className="image-container">
          <Image 
            src={img?.url} 
            alt={img?.title || 'Image preview'} 
            className="modal-image"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="img-meta">
          <IconCalendar />
          <span>{img?.created_at ? formatDate(img.created_at) : ''}</span>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

