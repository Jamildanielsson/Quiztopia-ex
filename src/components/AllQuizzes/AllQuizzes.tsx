import './AllQuizzes.scss'
import { useEffect } from "react"
import { QuizzesData, AllQuizProps } from "../../interfaces/interfaces"

export default function AllQuizzes(props: AllQuizProps) {
    const setQuizData = props.setQuizData
    const fetchAllQuizzes = async () => {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
        const settings = { method: 'GET' }
        const response = await fetch(url, settings)
        const data: QuizzesData = await response.json()
        setQuizData(data)
    }
    useEffect(() => {
        fetchAllQuizzes()
    }, [])
  return (
    <>
    </>    
  )
}