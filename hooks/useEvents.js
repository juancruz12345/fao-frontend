
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export function useEvents(){

  const { events } = useContext(EventContext)
  events.forEach(element => {
    console.log(typeof element.date)
  });
  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date - b.date)
      .slice(0, 3);
  };

  const upcomingEvents = getUpcomingEvents()
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }

  return{events, upcomingEvents, formatDate}

}