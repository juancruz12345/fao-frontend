import { createContext, useContext } from "react";
import { Spinner, Alert, Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

export const TournamentContext = createContext()

export function TournamentProvider({children}){


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
           <TournamentContext.Provider value={{ tournaments }}>
             {children}
           </TournamentContext.Provider>
         )
}

export function useTournament() {
    return useContext(TournamentContext)
  }