import { useState } from "react"
import styled from "styled-components"
import googleIcon from '../assets/google.svg'

export function Auth() {

    const [option, setOption] = useState("Login")

    return (
        <>
            <Container>
                <Card>
                    <div className="option"><span onClick={() => setOption('Login')} className={`${option === 'Login' ? 'selected' : ''}`}>Login</span> | <span className={`${option === 'Register' ? 'selected' : ''}`} onClick={() => setOption('Register')}>Register</span></div>
                    <div className="form">
                        {option === 'Register' && (<div className="input-control">
                            <label>Name: </label>
                            <input type="text" className="input" placeholder="Your name..." />
                        </div>)}
                        <div className="input-control">
                            <label>Email: </label>
                            <input type="text" className="input" placeholder="Your name..." />
                        </div>
                        <div className="input-control">
                            <label>Password: </label>
                            <input type="text" className="input" placeholder="Your name..." />
                        </div>
                    </div>
                    <div className="button">
                        <button>{option}</button>
                        <button><img src={googleIcon} alt="google" /></button>
                    </div>
                </Card>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Card = styled.div`
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