

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { AboutUs } from '../components/AboutUs';
import { Header } from '../components/Header';
import { Calendar } from '../components/Calendar';
import {Events} from '../components/Events';
import {Galery} from '../components/Galery';
import {Formation} from '../components/Formation';
import {Players} from '../components/Players';
import {NewsDetails} from '../components/NewsDetails';
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

//const queryClient = new QueryClient();
/*
// Configura el persistor para Local Storage
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage, // Cambiar a `sessionStorage` si prefieres usar sesión
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60, // Mantén el caché durante 1 hora
});
*/

function App() {
 

  return (
  
 
      <div>
  <Header></Header>
  <Routes>
  <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<AboutUs/>}></Route>
    <Route path='/calendario' element={<Calendar/>}></Route>
    <Route path='/eventos' element={<Events/>}></Route>
    <Route path='/noticias/:id' element={<NewsDetails/>}></Route>
    <Route path='/galeria' element={<Galery/>}></Route>
    <Route path='/formacion' element={<Formation/>}></Route>
    <Route path='/jugadores' element={<Players/>}></Route>



  </Routes>
</div>
     

 
  )
}

export default App
