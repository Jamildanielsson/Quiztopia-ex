import './CreateQuiz.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPosition } from '../../components/getPosition/getPosition'
import { ApiResponse, Coordinates } from '../../interfaces/interfaces'

export default function CreateQuiz() {
  const token: string | null = sessionStorage.getItem("tokenID")
  const [message, setMessage] = useState<string>('')
  const [quizname, setQuizname] = useState<string>('')
  const [position, setPosition] = useState<Coordinates | null>(null)
  const location = useLocation()
  const actualUser = location.state;
  const navigate = useNavigate()

  useEffect(() => {
    if (position) {
      navigate('/myaccount/createquiz/addquestions', { state: { position } })
      sessionStorage.setItem("quizname", quizname)
    }
  }, [position])
  const goToCreateQuestions = async () => {
    try {
      const pos: Coordinates = await getPosition()
      setPosition(pos)
      const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
      const settings = {
        method: 'POST',
        body: JSON.stringify({
          name: quizname,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, settings);
      const data: ApiResponse = await response.json();
      if (data.success === true) {
      } else {
        setMessage('Something went wrong, please try again.')
      }
    } catch (error) {
      setMessage((error as Error).message)
    }
  }
  return (
    <>
    <main className='createquiz__wrapper'>
      <header className='createquiz__header'>
        <button className='createquiz__button-top' onClick={() => { navigate('/myaccount', { state: actualUser }) }}>Return</button>
        <h1>Create Quiz</h1><p>Choose a name for your quiz</p>
        {message}
      </header>
      <article className='createquiz__article'>
        <input className='createquiz__input' type="text" placeholder='Name your quiz..' value={quizname} onChange={(event) => setQuizname(event.target.value)} />
        <button onClick={goToCreateQuestions} className='createquiz__button'>Add Quiz</button>
      </article>
    </main>
    </>
  )
}