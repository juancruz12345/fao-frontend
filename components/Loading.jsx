import { Spinner } from "react-bootstrap";


export function Loading({msg}){

    return (
       <div className="loading">
         <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>{msg}</p>
       </div>
      );
}