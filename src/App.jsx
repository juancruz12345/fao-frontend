import { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Loading } from '../components/Loading';

const Home = lazy(() => import('../components/Home'));
const Calendar = lazy(() => import('../components/Calendar'));
const Tournaments = lazy(() => import('../components/Tournaments'));
const Galery = lazy(() => import('../components/Galery'));
const Formation = lazy(() => import('../components/Formation'));
const Players = lazy(() => import('../components/Players'));
const NewsDetails = lazy(() => import('../components/NewsDetails'));
const History = lazy(() => import('../components/History'));
const TournamentDetail = lazy(() => import('../components/TournamentDetail'));
const PlayerHistory = lazy(() => import('../components/PlayerHistory'));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading></Loading>}>
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<History />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/torneos" element={<Tournaments />} />
          <Route path="/torneo/:id" element={<TournamentDetail />} />
          <Route path="/noticias/:id" element={<NewsDetails />} />
          <Route path="/galeria" element={<Galery />} />
          <Route path="/formacion" element={<Formation />} />
          <Route path="/jugadores" element={<Players />} />
          <Route path="/jugador/:id" element={<PlayerHistory />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
