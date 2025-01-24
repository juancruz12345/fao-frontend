import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { IconChessKnight, IconBishop, IconKing, IconQueen, IconRook, IconPawn } from "./Icons";

export function Loading({msg}){

  const icons = [{id:1, icon:<IconPawn />}, {id:2, icon:<IconChessKnight />},
    {id:3, icon:<IconBishop size={30}/>}, {id:4, icon:<IconRook />}, {id:5, icon:<IconQueen height={30}/>}, {id:6, icon:<IconKing />}];
    const [currentIconIndex, setCurrentIconIndex] = useState(0)
    useEffect(() => {
      const interval = setInterval(() => {
      
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length)
      }, 500)
  
      return () => clearInterval(interval)
    }, [icons.length]);
  
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.6rem" }}>
        <p>{msg}</p>
        <span className="icon-loading">{icons[currentIconIndex].icon}</span>
      </div>
      );
}