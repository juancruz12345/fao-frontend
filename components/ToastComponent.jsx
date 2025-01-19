
import { Toast } from "react-bootstrap"

export function ToastComponent({show,setShow,msg}){

    

    return(
       
        <div className="toast-div">
           <Toast delay={3000} autohide show={show} onClose={()=>{setShow(false)}} >
        <Toast.Header></Toast.Header>
        <Toast.Body>{msg}</Toast.Body>
        </Toast>
        </div>
      
    )
}