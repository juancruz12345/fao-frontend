

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
import { History } from '../components/History';



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
    <Route path='/historia' element={<History/>}></Route>


  </Routes>
</div>
     

 
  )
}

export default App
