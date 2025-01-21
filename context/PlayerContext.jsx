import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Alert } from "react-bootstrap";
import { Loading } from "../components/Loading";
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
          <Loading msg={'Cargando jugadores'} />
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