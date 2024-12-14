import { createContext } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

export const GaleryContext = createContext()


function useFetchImgs() {
    return useQuery({
     
      queryKey: ["images"], // Clave única de la consulta
      queryFn: async () => {
        console.log("Fetching images from API...");
        const response = await fetch("https://fao-backend.onrender.com/images", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        if (!response.ok) {
          throw new Error("Error al cargar las imagenes")
        }
        return response.json()
      },
      staleTime: 1000 * 60 * 5, // Los datos son válidos durante 5 minutos
      cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
      refetchOnWindowFocus: false
    })
  }

export function GaleryProvider({children}){

   
    
  /* const { data: imgs = [], isLoading, error } = useFetchImgs()

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
  }*/

    const imgs = [
        {id:1, title:'pepe campeon', description:'Torneo de primera categoria', url:'./abierto.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:2, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:3, title:'pepe campeon', description:'Torneo de primera categoria', url:'./multimedia.normal.8bd773ebe5a70c35.U2NyZWVuc2hvdF8yMDI0MDQyMy0wNDIzMzFfV2hhdHNfbm9ybWFsLndlYnA=.jpg.webp', created_at: "2024-11-28T10:00:00Z"},
        {id:4, title:'pepe campeon', description:'Torneo de primera categoria', url:'./torneo_juvenil.jpg',created_at: "2024-11-28T10:00:00Z"},
        {id:5, title:'pepe campeon', description:'Torneo de primera categoria', url:'./abierto.jpg',created_at: "2024-11-28T10:00:00Z"},
        {id:6, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:7, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:8, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:9, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:10, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:11, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:12, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:13, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:14, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"},
        {id:15, title:'pepe campeon', description:'Torneo de primera categoria', url:'./depo ajedrez.jpg', created_at: "2024-11-28T10:00:00Z"}
      ]
      
    return(
        <GaleryContext.Provider value={{imgs}}>
            {children}
        </GaleryContext.Provider>
    )
}