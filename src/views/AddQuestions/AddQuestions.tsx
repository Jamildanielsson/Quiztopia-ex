import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ApiResponse, Coordinates } from '../../interfaces/interfaces';
import './AddQuestions.scss'
import Map from '../../components/Map/Map';

export default function AddQuestions() {
  const location = useLocation()
  const position: Coordinates = location.state.position;
  const token = sessionStorage.getItem('tokenID')
  const navigate = useNavigate()
  const quizname: string | null = sessionStorage.getItem("quizname")
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [lat, setLat] = useState<number>(position.latitude)
  const [lng, setLng] = useState<number>(position.longitude)
  const [message, setMessage] = useState<string>('')

  const createQuestion = async () => {
    if (question && answer) {
      const url = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question`
      const settings = {
        method: 'POST',
        body: JSON.stringify({
          name: quizname,
          question: question,
          answer: answer,
          location: {
            longitude: lng,
            latitude: lat
          }
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, settings);
      const data: ApiResponse = await response.json();
      if (data.success) {
        setMessage('Question and coordinates was added')
        setQuestion('')
        setAnswer('')
      } else {
        setMessage('Could not add question, try again')
      }
    } else {
      setMessage('Please add a question and answer before submitting.')
    }
  }
  return (
    <main className='addquestions__wrapper'>
      <header className='addquestions__header'>
        <button className='addquestions__button' onClick={() => { navigate('/myaccount/createquiz') }}>Return</button>
        <h1>{quizname}</h1></header>
      <Map setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
      <section className='addquestions__section'>
        <p>{message}</p>
        <span>1. Click on map to add a location</span>
        <span>2. Fill out question and answer</span>
        <span>3. Submit your data to API</span>
        <input className='addquestions__section-input' type="text" placeholder='Question' value={question} onChange={(event) => setQuestion(event.target.value)} />
        <input className='addquestions__section-input' type="text" placeholder='Answer' value={answer} onChange={(event) => setAnswer(event.target.value)} />
        <button onClick={createQuestion} className='addquestions__section-button'>Add Question</button>
      </section>
    </main>
  )
}