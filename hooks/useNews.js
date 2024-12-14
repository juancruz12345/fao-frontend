import { useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { useContext } from "react";
export function useNews(){

  const {news} = useContext(NewsContext)  
  

  const [currentPage, setCurrentPage] = useState(1)
  const newsPerPage = 3


    
    const indexOfLastNews = currentPage * newsPerPage
    const indexOfFirstNews = indexOfLastNews - newsPerPage
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews)
  
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return{currentPage, currentNews, news, newsPerPage, paginate}

}