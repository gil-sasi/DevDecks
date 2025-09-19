import { createBrowserRouter } from 'react-router-dom'
import Home from '../views/Home'
import Quiz from '../views/Quiz'
import Leaderboard from '../views/Leaderboard'
import Admin from '../views/Admin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quiz/:deckId',
    element: <Quiz />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
])
