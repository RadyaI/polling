import { useEffect, useState } from "react"
import styled from "styled-components"
import googleIcon from '../assets/google.svg'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth } from "../config/firebase"
import Cookie from "js-cookie"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"

export function Auth() {

    const router = useNavigate()
    const [option, setOption] = useState("Login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function loginEmail() {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            swal({
                icon: 'error',
                title: `${error.message}`,
                button: "Ok"
            })
        }
    }

    async function register() {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            swal({
                icon: 'error',
                title: `${error.message}`,
                button: "Ok"
            })
        }
    }

    async function googleLogin() {
        try {
            const provider = new GoogleAuthProvider()
            const user = await signInWithPopup(auth, provider)

            const storeUser = {
                userId: user.user.uid,
                name: user.user.displayName,
                email: user.user.email,
                photoUrl: user.user.photoURL
            }

            Cookie.set("userData", JSON.stringify(storeUser))
        } catch (error) {
            console.log({ error: error.message })
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router("/polling")
            }
        })
    }, [])

    return (
        <>
            <Container>
                <Circle1></Circle1>
                <Card>
                    <div className="option"><span onClick={() => setOption('Login')} className={`${option === 'Login' ? 'selected' : ''}`}>Login</span> | <span className={`${option === 'Register' ? 'selected' : ''}`} onClick={() => setOption('Register')}>Register</span></div>
                    <div className="form">
                        {option === 'Register' && (<div className="input-control">
                            <label>Name: </label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Your name..." />
                        </div>)}
                        <div className="input-control">
                            <label>Email: </label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="example@gmail.com" />
                        </div>
                        <div className="input-control">
                            <label>Password: </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Your password..." />
                        </div>
                    </div>
                    <div className="button">
                        {option === "Login" && (<button onClick={() => loginEmail()}>{option}</button>)}
                        {option === "Register" && (<button onClick={() => register()}>{option}</button>)}
                        <button onClick={() => googleLogin()}><img src={googleIcon} alt="google" /></button>
                    </div>
                </Card>
            </Container>
        </>
    )
}

const Container = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Card = styled.div`
    z-index: 99;
    width: 500px;
    height: 80dvh;
    padding: 15px;
    border-radius: 15px;
    border: 1px solid var(--text);
    background-color: var(--secondary);

    .option{
        padding: 5px;
        text-align: center;
        color: var(--text);
        font-size: 18px;
    }

    .option span{
        cursor: pointer;
        margin: 0 15px;
    }

    .form{
        width: 90%;
        height: 68%;
        margin: 0 auto;
        margin-top: 20px;
    }

    .input-control{
        display: flex;
        flex-direction: column;
        margin-top: 25px;
    }
    
    .input-control:nth-child(1){
        margin-top: 50px;
    }

    .input-control label{
        font-size: 17px;
        color: var(--text);
    }

    .input-control .input{
        border: none;
        outline: none;
        width: 90%;
        padding: 15px 13px;
        border-radius: 7px;
        font-size: 17px;
        margin-top: 10px;
        background-color: var(--primary);
        color: var(--text);
    }

    .input-control .input:focus{
        border: 1px solid var(--text);
    }

    .button{
        display: flex;
        justify-content: center;
        gap: 50px;
    }

    .button button{
        border: none;
        cursor: pointer;
        padding: 10px 40px;
        font-size: 20px;
        border-radius: 7px;
        color: var(--text);
        background-color: var(--primary);
    }

    .button button:nth-child(2) img{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .selected{
        border-bottom: 1px solid var(--text);
    }

    @media only screen and (max-width: 700px){
        width: 85%;
    }
`

const Circle1 = styled.div`
    position: fixed;
    z-index: 1;
    bottom: -30px;
    right: 280px;
    width: 250px;
    height: 250px;
    background-color: var(--text);
    border-radius: 50%;
    filter: blur(100px);
`