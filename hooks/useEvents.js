
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export function useEvents(){

  const { events } = useContext(EventContext)
  
  const getUpcomingEvents = () => {
    const now = new Date();
    
    return events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date - b.date)
      .slice(0, 3);
  };

  const upcomingEvents = getUpcomingEvents()
  console.log(events)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }

  return{events, upcomingEvents, formatDate}

}