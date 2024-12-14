import { useContext, useState, useMemo } from "react";
import { GaleryContext } from "../context/GaleryContext";

export function useGalery(page=1, limit=10){


    const {imgs} = useContext(GaleryContext)

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