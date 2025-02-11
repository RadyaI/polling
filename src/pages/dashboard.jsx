import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Dashboard() {

    const router = useNavigate()
    const [isLoad, setIsLoad] = useState(false)

    const redirect = (path) => {
        setIsLoad(true)
        setTimeout(() => {
            router(path)
            setIsLoad(false)
        }, 500);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                redirect("/polling")
            }
        })
    }, [])

    return (
        <>
            {isLoad && (<Loader></Loader>)}
            <CircleBottom></CircleBottom>
            <Square>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
                <div className="subSquare"></div>
            </Square>
            <Container>
                <Content>
                    <div className="text">
                        <CircleTop>
                            <div className="star"></div>
                        </CircleTop>
                        Create your <Highlight>real-time</Highlight> polling <br />
                        and make decisions <Emphasize>faster!</Emphasize>
                    </div>
                    <button onClick={() => redirect("/polling")}>Get Started</button>
                </Content>
            </Container>
        </>
    );
}

createGlobalStyle`
    :root {
        --primary: #111828;
        --secondary: #202938;
        --optional: #6366f1;
        --text: #F0EDCF;
    }
`;

const circleTopAnimate = keyframes`
    0%{transform: rotate(0deg);}
    25%{transform: rotate(90deg);}
    50%{transform: rotate(180deg);}
    100%{transform: rotate(360deg);}

    /* from{transform: rotate(0deg);}
    to{transform: rotate(180deg);} */
`

const Square = styled.div`
    position: fixed;
    width: 250px;
    height: 200px;
    bottom: -20px;
    left: -20px;
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 700px){
        display: none;
    }

    .subSquare {
        width: 30%;
        height: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .subSquare:nth-child(1), 
    .subSquare:nth-child(2), 
    .subSquare:nth-child(3) {
        border-bottom: 1px solid white;
    }

    .subSquare:nth-child(7), 
    .subSquare:nth-child(8), 
    .subSquare:nth-child(9) {
        border-top: 1px solid white;
    }

    .subSquare:nth-child(1), 
    .subSquare:nth-child(4), 
    .subSquare:nth-child(7) {
        border-right: 1px solid white;
    }

    .subSquare:nth-child(3), 
    .subSquare:nth-child(6), 
    .subSquare:nth-child(9) {
        border-left: 1px solid white;
    }
`;


const CircleTop = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    width: 100px;
    height: 100px;

    @media only screen and (max-width:700px){
        display: none;
    }
    
    .star{
        animation: ${circleTopAnimate} 5s infinite;
        width: 50px;
        height: 20px;
        background-color: var(--text);
        border-radius: 10px 0 10px 0;
        filter: blur(5px);
    }
`

const CircleBottom = styled.div`
    position: fixed;
    bottom: -50px;
    right: -50px;
    background-color: var(--optional);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    filter: blur(100px);
`

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    overflow: hidden;
`

const Content = styled.div`
    position: relative;
    width: 85%;
    height: 70dvh;
    margin: 70px auto;
    text-align: center;
    color: var(--text);
    font-size: 4.5rem;
    font-weight: bold;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button{
        margin-top: 40px;
        border: none;
        cursor: pointer;
        padding: 10px 40px;
        font-size: 20px;
        border-radius: 7px;
        color: var(--text);
        background-color: var(--secondary);
        transition: transform 300ms;
    }

    button:hover{
        transform: translateY(3px);
    }

    @media only screen and (max-width: 700px){
        width: 90%;
        font-size: 3rem;
        font-weight: bold;
        line-height: 1.3;
    }
`;

const Highlight = styled.span`
    color: var(--optional);
    text-transform: uppercase;
    letter-spacing: 2px;

    position: relative;

    &::before{
        content: "";
        position: absolute;
        margin-top: 5px;
        border-bottom: 2px solid white;
        /* filter: blur(3px); */
        width: 100%;
        height: 100%;
    }

    @media only screen and (max-width: 700px){
        &::before{
            display: none;
        }
    }
`;

const Emphasize = styled.span`
    font-style: italic;
    font-weight: 700;
    color: var(--optional);

`;

