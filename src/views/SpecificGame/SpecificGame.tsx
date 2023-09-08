import './SpecificGame.scss'
import MapWithCoords from '../../components/MapWithCoords/MapWithCoords';
import { Coordinates, Question } from '../../interfaces/interfaces';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SpecificGame() {
  const navigate = useNavigate()
  const location = useLocation();
  const quizData = location.state.quiz;
  const position: Coordinates = location.state.position;
  const questionsComponent = quizData.questions.map((question: Question) => {
    return (
        <section key={question.question} className='specificgame__questionsection'>
          <h3>Question: </h3> <p>{question.question}</p>
          <h3>Answer:</h3><p>{question.answer}</p>
        </section>
    )
  })
  return (
    <>
      <main className='specificgame__wrapper'>
        <header className='specificgame__header'>
          <button className='specificgame__button' onClick={ () => { navigate('/playgame') }}>Return</button>
          <h1>Quiz</h1></header>
        <MapWithCoords quizData={quizData} position={position}/>
        {questionsComponent}
      </main>
      </>
  )
} 