import './StartPage.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiResponse, TokenData } from '../../interfaces/interfaces'

export default function StartPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const createUser = async () => {
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'
        let response = await fetch(url, settings)
        let data: ApiResponse = await response.json()
        if (data.success) {
            setMessage('Account has been created, please log in!')
        } else {
            setMessage('There is already an identical username existing')
        }
    }
    const handleLogin = async () => {
        const settings = {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: username,
                    password: password,
                })
        }
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login'
        let response = await fetch(url, settings)
        let data: TokenData = await response.json()
        if (data.success) {
            setMessage('Welcome' + ' ' + username + '!')
            navigate('/myaccount', { state: username })

        } else {
            setMessage('Something went wrong, please try again')
        }
        let tokenItem = data.token;
        sessionStorage.setItem("tokenID", tokenItem)
    }
    const goToGame = () => {
        navigate('/playgame')
    }
    return (
            <main className='start__wrapper'>
                <header className='start__header'><h1>Quiztopia</h1></header>
                <section className='section_1'>
                    <input type="text" placeholder='Username' value={username} onChange={event => setUsername(event.target.value)} />
                    <input type="text" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                    <br></br><h4>{message}</h4>
                </section>
                <section className='section_2'>
                    <button onClick={handleLogin}>Login</button><button onClick={createUser}>Create</button>
                </section>
                <footer>
                    <button onClick={goToGame}>Play</button>
                </footer>
            </main>
    )
}