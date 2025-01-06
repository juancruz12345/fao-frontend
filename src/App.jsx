

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { Header } from '../components/Header';
import { Calendar } from '../components/Calendar';
import { Tournaments } from '../components/Tournaments';
import {Galery} from '../components/Galery';
import {Formation} from '../components/Formation';
import {Players} from '../components/Players';
import {NewsDetails} from '../components/NewsDetails';
import { History } from '../components/History';
import { TournamentDetail } from '../components/TournamentDetail';
import { PlayerHistory } from '../components/PlayerHistory';
import { Footer } from '../components/Footer';


function App() {
 

  return (
  
 
      <div>
  <Header></Header>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/historia' element={<History/>}></Route>
    <Route path='/calendario' element={<Calendar/>}></Route>
    <Route path='/torneos' element={<Tournaments/>}></Route>
    <Route path='/torneo/:id' element={<TournamentDetail/>}></Route>
    <Route path='/noticias/:id' element={<NewsDetails/>}></Route>
    <Route path='/galeria' element={<Galery/>}></Route>
    <Route path='/formacion' element={<Formation/>}></Route>
    <Route path='/jugadores' element={<Players/>}></Route>
    <Route path='/jugador/:id' element={<PlayerHistory/>}></Route>
    


  </Routes>
  <Footer></Footer>
</div>
     

 
  )
}

export default App
