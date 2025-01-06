
import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export function useNews() {
 

  const {currentNews, setOffset,offset, limit, isFetching} = useContext(NewsContext)
  const loadMore = () => setOffset((prevOffset) => prevOffset + limit);
  const loadLess = () => setOffset((prevOffset) => prevOffset - limit);

  

  return {
    currentNews,
    isFetching,
    loadMore,
    loadLess,
    offset
  };
}

