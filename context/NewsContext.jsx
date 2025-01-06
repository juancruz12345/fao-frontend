import { createContext, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Container, Spinner } from "react-bootstrap";

export const NewsContext = createContext()

function useFetchNews(offset, limit) {
  return useQuery({
    queryKey: ["news", offset, limit], // Clave única por offset
    queryFn: async () => {
      const response = await fetch(`https://fao-backend.onrender.com/news?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Error al cargar las noticias");
      }
      console.log('fetch news')
      return response.json();
    },
    keepPreviousData: true, // Mantener datos previos mientras carga nuevos
    staleTime: 1000 * 60 * 20, // Los datos son válidos durante 5 minutos
    cacheTime: 1000 * 60 * 30, // Mantén los datos en caché durante 10 minutos
    refetchOnWindowFocus: false
  });
}

export function NewsProvider({children}){

  const [offset, setOffset] = useState(0); 
  const limit = 10; 

  const { data: newsData = { data: [] }, isFetching, error } = useFetchNews(offset, limit);

  const currentNews = newsData.data || [];

   

   if (isFetching) {
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
    /*const currentNews = [
      {
        id: 1,
        title: "Gran Torneo de Verano 2025",
        content: "Este verano, la Federación de Ajedrez de Olavarría organiza el mayor torneo de la temporada. Jugadores de toda la región competirán por el título de campeón de verano.",
        created_at: "2024-11-28T10:00:00Z",
        image_url: ".././depo ajedrez.jpg"
      },
      {
        id: 2,
        title: "Nuevo Programa de Entrenamiento para Jóvenes",
        content: "Lanzamos un nuevo programa de entrenamiento diseñado específicamente para jóvenes ajedrecistas. El programa se centrará en estrategias avanzadas y preparación para torneos.",
        created_at: "2024-11-25T14:30:00Z",
        image_url: ".././torneo_juvenil.jpg"
      },
      {
        id: 3,
        title: "Resultados del Abierto Pueblo Nuevo",
        content: "El pasado fin de semana se llevó a cabo nuestro campeonato local anual. Felicitaciones a todos los participantes y especialmente a nuestros ganadores en las diferentes categorías.",
        created_at: "2024-11-15T09:15:00Z",
        image_url: ".././multimedia.normal.8bd773ebe5a70c35.U2NyZWVuc2hvdF8yMDI0MDQyMy0wNDIzMzFfV2hhdHNfbm9ybWFsLndlYnA=.jpg.webp?height=200&width=400"
      },
      {
        id: 4,
        title: "Resultados del Abierto Pueblo Nuevo",
        content: "El pasado fin de semana se llevó a cabo nuestro campeonato local anual. Felicitaciones a todos los participantes y especialmente a nuestros ganadores en las diferentes categorías.",
        created_at: "2024-11-15T09:15:00Z",
        image_url: ".././multimedia.normal.8bd773ebe5a70c35.U2NyZWVuc2hvdF8yMDI0MDQyMy0wNDIzMzFfV2hhdHNfbm9ybWFsLndlYnA=.jpg.webp?height=200&width=400"
      },
      {
        id: 5,
        title: "Resultados del Abierto Pueblo Nuevo",
        content: "El pasado fin de semana se llevó a cabo nuestro campeonato local anual. Felicitaciones a todos los participantes y especialmente a nuestros ganadores en las diferentes categorías.",
        created_at: "2024-11-15T09:15:00Z",
        image_url: ".././multimedia.normal.8bd773ebe5a70c35.U2NyZWVuc2hvdF8yMDI0MDQyMy0wNDIzMzFfV2hhdHNfbm9ybWFsLndlYnA=.jpg.webp?height=200&width=400"
      },
      {
        id: 6,
        title: "Resultados del Abierto Pueblo Nuevo",
        content: "El pasado fin de semana se llevó a cabo nuestro campeonato local anual. Felicitaciones a todos los participantes y especialmente a nuestros ganadores en las diferentes categorías.",
        created_at: "2024-11-15T09:15:00Z",
        image_url: ".././multimedia.normal.8bd773ebe5a70c35.U2NyZWVuc2hvdF8yMDI0MDQyMy0wNDIzMzFfV2hhdHNfbm9ybWFsLndlYnA=.jpg.webp?height=200&width=400"
      }
     
    ]*/

    return (
        <NewsContext.Provider value={{ currentNews, setOffset,offset, limit }}>
          {children}
        </NewsContext.Provider>
      )

}




    


