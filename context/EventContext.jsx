import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Alert, Spinner } from 'react-bootstrap';
import {parseISO} from 'date-fns'
import { Loading } from '../components/Loading';

export const EventContext = createContext()


function useFetchEvents() {
  return useQuery({
   
    queryKey: ["events"], // Clave única de la consulta
    queryFn: async () => {
      console.log("Fetching events from API...");
      const response = await fetch("https://fao-backend.onrender.com/events", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("Error al cargar las imagenes")
      }
      const events = await response.json()
     
  // Transformar las fechas en objetos Date
      return events.map(event => ({
        ...event,
          date: parseISO(event.date), 
        }))
    },
    staleTime: 1000 * 60 * 20, 
    cacheTime: 1000 * 60 * 30, 
    refetchOnWindowFocus: false
  })
}


export function EventProvider({ children }) {
 

    const { data: events = [], isLoading, error } = useFetchEvents()
   
    if (isLoading) {
     return (
      <Loading msg={'Cargando eventos'} />
     );
   }
 
   if (error) {
     return (
       <Container className="py-5">
         <Alert variant="danger">
           Error: {error}
         </Alert>
       </Container>
     )
   }
  
   

  return (
    <EventContext.Provider value={{ events }}>
      {children}
    </EventContext.Provider>
  )
}



