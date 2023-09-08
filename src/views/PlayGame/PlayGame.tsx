import '../..//components/AllQuizzes/AllQuizzes.scss'
import AllQuizzes from '../../components/AllQuizzes/AllQuizzes'
import { useState } from 'react'
import { Coordinates, Quiz, QuizzesData } from '../../interfaces/interfaces'
import { useNavigate } from 'react-router-dom'
import { getPosition } from '../../components/getPosition/getPosition'

export default function PlayGame() {
  const [quizData, setQuizData] = useState<QuizzesData | null>(null)
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate()
  const goToSpecificGame = async (quiz: Quiz) => {
    const pos: Coordinates = await getPosition()
    if (pos) {
      navigate('/playgame/specificgame', { state: { quiz, position: pos } })
      setMessage('Loading map... please wait.')
    } else {
      setMessage('There seems to be a problem with this quiz')
    }
  }
  const quizComp = quizData?.quizzes.map((quiz: Quiz) => {
    const customKey = quiz.quizId + quiz.username + quiz.questions[0].location.latitude + quiz.questions[0].location.longitude;
    return (
      <li key={customKey} className='listcomponent'>
        <h3>Quizname: {quiz.quizId}</h3>
        <p className='allquizzes__span'>by: {quiz.username}</p>
        <button className='allquizzes__button' onClick={() => goToSpecificGame(quiz)}>Play quiz</button>
      </li>
    )
  })
  return (
    <>
      <main className='allquizzes__wrapper'>
        <header className='allquizzes__header'>
          <button className='allquizzes__button' onClick={() => { navigate('/') }}>Return</button>
          <h1>All Quizzes</h1></header>
        {message}
        <section className='allquizzes__section'>
          {quizComp}
        </section>
      </main>
      <AllQuizzes setQuizData={setQuizData} />
    </>
  )
}