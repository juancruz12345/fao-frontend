import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Alert, Spinner } from 'react-bootstrap';

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
          date: new Date(event.date), 
        }))
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false
  })
}


export function EventProvider({ children }) {
 const events = [
    { date: new Date(2024, 11, 15), title: 'Torneo de Invierno', time: '14:00', location: 'Club de Ajedrez Central' },
    { date: new Date(2024, 11, 22), title: 'Clase Magistral', time: '18:30', location: 'Sala de Conferencias' },
    { date: new Date(2024, 11, 5), title: 'Campeonato Junior', time: '21:00', location: 'Centro Deportivo Municipal' },
    { date: new Date(2025, 0, 5), title: 'Campeonato Senior', time: '20:00', location: 'Club de Ajedrez Central' },
    { date: new Date(2025, 0, 20), title: 'Abierto Club Social', time: '10:00', location: 'Club Social' },
  ]

    /*const { data: events = [], isLoading, error } = useFetchEvents()

    if (isLoading) {
     return (
       <Container className="text-center py-5">
         <Spinner animation="border" role="status">
           <span className="visually-hidden">Loading...</span>
         </Spinner>
       </Container>
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
  
   */

  return (
    <EventContext.Provider value={{ events }}>
      {children}
    </EventContext.Provider>
  )
}



