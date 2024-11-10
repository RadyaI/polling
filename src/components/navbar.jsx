import styled, { createGlobalStyle } from "styled-components"

export default function Navbar() {
    return (
        <>
            <Content>
                <div className="title">Online Polling</div>
                <div className="menu">
                    <div className="menu-list">Create Poll</div>
                    <div className="menu-list"><button>Login</button></div>
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
    width: 100%;
    height: 80px;
    background-color: var(--secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title{
        margin-left: 20px;
        color: var(--text);
        background-color: var(--secondary);
        font-size: 30px;
        font-weight: bold;
    }
    
    .menu{
        margin-right: 20px;
        background-color: var(--secondary);
        width: 300px;
        height: 50px;
        display: flex;
        align-items: center;
        gap: 40px;
    }

    .menu .menu-list{
        background-color: var(--secondary);
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
        }
    }
`