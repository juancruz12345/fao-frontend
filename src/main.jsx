import './App.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NewsProvider } from '../context/NewsContext.jsx'
import { EventProvider } from '../context/EventContext.jsx'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlayerProvider } from '../context/PlayerContext.jsx'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(


    <QueryClientProvider client={queryClient}>
      <NewsProvider>
      <EventProvider>
      <PlayerProvider>
         <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
       </PlayerProvider>
      </EventProvider>
    </NewsProvider>
    </QueryClientProvider>
  
)
