import { Modal } from "react-bootstrap"
import { ChessBoard } from "./ChessBoard"

export function ModalBoard({pgn, showBoard, setShowBoard}){



    return(
        <Modal fullscreen show={showBoard} onHide={()=>{setShowBoard(false)}}>
            <Modal.Header closeButton>
               
            </Modal.Header>
            <Modal.Body>
            <ChessBoard pgnUrl={pgn}></ChessBoard>
            </Modal.Body>
        </Modal>
    )
}