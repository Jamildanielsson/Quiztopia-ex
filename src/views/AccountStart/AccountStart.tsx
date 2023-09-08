import './AccountStart.scss'
import AllQuizzes from '../../components/AllQuizzes/AllQuizzes'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiResponse, Quiz, QuizzesData } from '../../interfaces/interfaces'
import { useState } from 'react'

export default function AccountStart() {
    const [quizData, setQuizData] = useState<QuizzesData | null>(null)
    const [message, setMessage] = useState<string>('')
    const location = useLocation()
    const actualUser: string = location.state;
    const navigate = useNavigate()
    const goToCreate = () => {
        navigate('/myaccount/createquiz', { state: actualUser })
    }
    const quizComp = quizData?.quizzes.map((quiz) => {
        if (quiz.username === actualUser){
            return (
                <li className='listcomponent' key={quiz.quizId}>
                    <h2>Quizname: {quiz.quizId}</h2>
                    <span>by: {quiz.username}</span>
                    <br /><br />
                    <button onClick={() => deleteQuiz(quiz)} className='accountstart__button'>Delete quiz</button>
                </li>)
        } 

    })
    const token: string | null = sessionStorage.getItem("tokenID")

    const deleteQuiz = async (quiz: Quiz) => {
        const url = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quiz.quizId}`
        const settings = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, settings);
        const data: ApiResponse = await response.json()
        
        if (data.success && quizData) {
            const userQuizzes = quizData.quizzes.filter((q) => q.quizId != quiz.quizId)
            setQuizData({
                ...quizData,
                quizzes: userQuizzes
            })
            setMessage('Quiz was deleted')
        } else {
            setMessage('Quiz could not be deleted, please try again')
        }
    }
    const logOut = () => {
        navigate('/')
        sessionStorage.removeItem('tokenID')
        sessionStorage.removeItem('quizname')
    }    
    return (
        <>
            <main className='account__wrapper'>
                <header className='account__header'>
                    <button className='account__header-button' onClick={logOut}>Log out</button>
                    <h1>{actualUser}'s Quiz</h1>
                    <button className='account__header-button' onClick={() => { navigate('/playgame') }}>Play all</button>
                </header>
                <article className='account__article'>
                    {message}
                    <section className='account__article-section'>
                        {quizComp}
                    </section>
                </article>
                <footer>
                    <button onClick={goToCreate}>New quiz</button>
                </footer>
            </main>
            <AllQuizzes setQuizData={setQuizData} />
        </>
    )
}