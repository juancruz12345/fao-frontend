import { Spinner } from "react-bootstrap";

export function Loading(){

    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
}