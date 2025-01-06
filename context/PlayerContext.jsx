import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Spinner, Alert } from "react-bootstrap";

export const PlayerContext = createContext()

function useFetchPlayers() {
  return useQuery({
    queryKey: ["players"], // Clave única por offset
    queryFn: async () => {
      const response = await fetch(`https://fao-backend.onrender.com/players`);
      if (!response.ok) {
        throw new Error("Error al cargar las jugadores");
      }
      console.log('fetch players')
      return response.json();
    },
    
    staleTime: 1000 * 60 * 20, // Los datos son válidos durante 5 minutos
    cacheTime: 1000 * 60 * 30, // Mantén los datos en caché durante 10 minutos
    refetchOnWindowFocus: false
  });
}

export function PlayerProvider({children}){



        const { data: players = [], isLoading, error } = useFetchPlayers()
      
     
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


   return (
           <PlayerContext.Provider value={{ players }}>
             {children}
           </PlayerContext.Provider>
         )
}

export function usePlayers() {
    return useContext(PlayerContext)
  }