import { useNavigate } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"
import { Loader } from "./loader"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import swal from "sweetalert"

export default function Navbar() {

    const router = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    function goTo(params) {
        setIsLoading(true)
        setTimeout(() => {
            router(params)
            setIsLoading(false)
        }, 500);
    }

    async function logOut() {
        try {
            const alert = await swal({
                title: "logout?",
                dangerMode: true,
                buttons: ["No", "Yes"]
            })

            if (alert) {
                auth.signOut()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        })

        return () => subscribe()
    }, [])

    return (
        <>
            {isLoading && (<Loader></Loader>)}
            <Content>
                <div className="title" onClick={() => goTo("/")}>Online Polling</div>
                <div className="menu">
                    <div className="menu-list" onClick={() => goTo('/polling/create')}>Create Poll</div>
                    {!isLogin && (<div className="menu-list"><button onClick={() => goTo('/auth')}>Login</button></div>)}
                    {isLogin && (<div className="menu-list"><button onClick={() => logOut()}>Logout</button></div>)}
                </div>
            </Content>
        </>
    )
}

createGlobalStyle`
    :root{
        --primary: #111828;
        --secondary: #202938;
        --optional: #6366f1;
        --text: #F0EDCF;
    }
`

const Content = styled.div`
    z-index: 999999999;
    width: 100%;
    height: 80px;
    /* background-color: var(--secondary); */
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    .title{
        margin-left: 50px;
        color: var(--text);
        font-size: 30px;
        font-weight: bold;
    }
    
    .menu{
        margin-right: 20px;
        width: 300px;
        height: 50px;
        display: flex;
        align-items: center;
        gap: 40px;
    }

    .menu .menu-list{
        color: var(--text);
        cursor: pointer;
    }

    .menu .menu-list button{
        background-color: var(--optional);
        color: var(--text);
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        border: none;
        padding: 10px 25px;
    }

    @media only screen and (max-width: 700px){
        .title{
            font-size: 25px;
            margin-left: 20px;
        }
    }
`