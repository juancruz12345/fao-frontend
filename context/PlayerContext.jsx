import { createContext, useContext } from "react";

import React from 'react';

export const PlayerContext = createContext()

export function PlayerProvider({children}){

    const players = [
        {id:1, nombre:"pepe sanchez",club:"Ferro", categoria:"4ta", rating:null, elo:500,idFide:null },
        {id:2, nombre:"jose lopez",club:"Racing", categoria:"3ra", rating:null, elo:1300,idFide:1503014 },
        {id:3, nombre:"chiche gelblum",club:"Estudiantes", categoria:"3ra", rating:null, elo:1500,idFide:null },
        {id:4, nombre:"chiche gelblum",club:"Estudiantes", categoria:"3ra", rating:null, elo:1500,idFide:null },
        {id:5, nombre:"chiche gelblum",club:"Estudiantes", categoria:"3ra", rating:null, elo:1500,idFide:null },
        {id:6, nombre:"chiche gelblum",club:"Estudiantes", categoria:"3ra", rating:null, elo:1500,idFide:null },
        {id:7, nombre:"chiche gelblum",club:"Estudiantes", categoria:"3ra", rating:null, elo:1500,idFide:null },
        {id:8, nombre:"chiche gelblum",club:"Estudiantes", categoria:"3ra", rating:null, elo:1500,idFide:null }
    ]
   return (
           <PlayerContext.Provider value={{ players }}>
             {children}
           </PlayerContext.Provider>
         )
}

export function usePlayers() {
    return useContext(PlayerContext)
  }