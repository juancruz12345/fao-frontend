import { createContext, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Container, Spinner } from "react-bootstrap";
import { Loading } from "../components/Loading";

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
      <Loading msg={'Cargando noticias'} />
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
        <NewsContext.Provider value={{ currentNews, setOffset,offset, limit }}>
          {children}
        </NewsContext.Provider>
      )

}




    


