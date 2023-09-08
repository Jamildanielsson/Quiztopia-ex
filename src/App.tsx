import './App.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import StartPage from './views/StartPage/StartPage'
import AccountStart from './views/AccountStart/AccountStart'
import CreateQuiz from './views/CreateQuiz/CreateQuiz'
import AddQuestions from './views/AddQuestions/AddQuestions'
import PlayGame from './views/PlayGame/PlayGame'
import SpecificGame from './views/SpecificGame/SpecificGame'

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/myaccount/',
    element: <AccountStart />,
  },
  {
    path: '/myaccount/createquiz',
    element: <CreateQuiz />
  },
  {
    path: '/myaccount/createquiz/addquestions',
    element: <AddQuestions />
  },
  {
    path: '/playgame',
    element: <PlayGame />
  },
  {
    path: '/playgame/specificgame',
    element: <SpecificGame />
  }])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
