import { createContext, useState, useEffect, useContext } from "react";

import React from 'react';


export const ThemeContext = createContext()

export function ThemeProvider({children}){

   
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    console.log('toggle')
  };
    
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}> 
            {children}
        </ThemeContext.Provider>

    )
}

export function useTheme() {
    return useContext(ThemeContext)
  }