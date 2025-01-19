import { createContext, useContext } from "react";
import { Alert, Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components/Loading";

export const TournamentContext = createContext()

export function TournamentProvider({children}){

  
 /* const { data: broadcasts = [], isLoading, isError } = useQuery({
    queryKey: ["broadcasts",],
    queryFn: async () => {
      console.log("Fetching tournaments from API...");
      const response = await fetch(`https://lichess.org/api/broadcast/by/FAOenvivo`)
      
      if (!response.ok) {
        throw new Error("Error al cargar la página")
      }
      
      const data = await response.json()
      const broadcasts = data.currentPageResults 
      console.log(broadcasts)
      return broadcasts
    },
    staleTime: 1000 * 60 * 20,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  })*/

    function useFetchTournaments() {
        return useQuery({
         
          queryKey: ["tournaments"], // Clave única de la consulta
          queryFn: async () => {
            console.log("Fetching tournaments from API...");
            const response = await fetch("https://fao-backend.onrender.com/tournaments/all", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            })
            if (!response.ok) {
              throw new Error("Error al cargar la pagina")
            }
            
            return response.json()
          },
          staleTime: 1000 * 60 * 20, // Los datos son válidos durante 5 minutos
          cacheTime: 1000 * 60 * 30, // Mantén los datos en caché durante 10 minutos
          refetchOnWindowFocus: false
        })
      }

      
   const { data: tournaments = [], isLoading, error } = useFetchTournaments()
  
   if (isLoading) {
    return (
      <Loading msg={'Cargando torneos'} />
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
           <TournamentContext.Provider value={{ tournaments, isLoading, error }}>
             {children}
           </TournamentContext.Provider>
         )
}

export function useTournament() {
    return useContext(TournamentContext)
  }