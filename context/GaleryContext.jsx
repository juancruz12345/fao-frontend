import { createContext, useState, useContext, useMemo } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components/Loading";


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

export function useGalery(page=1, limit=20){


    const {imgs} = useContext(GaleryContext)
    if(!imgs){
      throw new Error('no context')
    }
    ///const [orderByDateImgs, setOrderByDate] = useState(imgs.sort((a, b) => new Date(b.created_at.slice(0,10)) - new Date(a.created_at.slice(0,10))))
    const [currentPage, setCurrentPage] = useState(page);

    const { paginatedImgs, totalPages } = useMemo(() => {
        const startIndex = (currentPage - 1) * limit
        const endIndex = startIndex + limit
        const paginatedImgs = imgs.slice(startIndex, endIndex)
        const totalPages = Math.ceil(imgs.length / limit)
        return { paginatedImgs, totalPages }
      }, [imgs, currentPage, limit])
    
      const goToPage = (newPage) => {
        setCurrentPage(newPage)
      }
    
      return { imgs: paginatedImgs, totalPages, currentPage, goToPage }
}

export function GaleryProvider({children}){

   
    
   const { data: imgs = [], isLoading, error } = useFetchImgs()
   imgs.reverse()

   if (isLoading) {
    return (
      <Loading msg={'Cargando imágenes'}></Loading>
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

      
    return(
        <GaleryContext.Provider value={{imgs}}>
            {children}
        </GaleryContext.Provider>
    )
}