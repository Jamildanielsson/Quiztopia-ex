interface OtherPosition {
    lng: number,
    lat: number
}

interface ApiResponse {
    success: boolean,
    message?: string
    error?: string
}

interface TokenData {
    success: boolean,
    token: string,
    message?: string
}

interface AllQuizProps {
    setQuizData: (data: QuizzesData) => void,
}

interface QuizzesQuiz {
    questions: Questions[],
    quizId: string,
    userId: string,
    username: string
}
interface QuizzesData {
    success: boolean,
    quizzes: QuizzesQuiz[]
}

interface Props {
    lat: number;
    lng: number;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void
}

interface Quiz {
    questions: Question[],
    quizId: string,
    userId: string,
    username: string
}

interface QuestionData {
    question: string,
    answer: string,
    location: Coordinates
}

interface Question {
    answer: string,
    question: string,
    location: Coordinates
}

interface Questions {
    question: string,
    answer: string,
    location: Coordinates
}

interface MegaProps {
    quizData: {
        questions: [{
            question: string,
            answer: string,
            location: [{
                latitude: number,
                longitude: number
            }]
        }]
        quizId: string,
        userId: string,
        username: string
    }
    position: Coordinates
}

export interface Coordinates {
    longitude: number,
    latitude: number
}
