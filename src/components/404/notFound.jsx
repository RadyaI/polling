import { useNavigate, useNavigation } from "react-router-dom"
import styled from "styled-components"

export function notFound() {
    const router = useNavigate()
    return (
        <>
            <Wrapper>
                <div className="card">
                    <p>404</p>
                    <p>Page Not Found</p>
                    <button onClick={() => router("/auth")}>Go Back</button>
                </div>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;
    color: var(--text);
    display: flex;
    justify-content: center;
    align-items: center;

    .card{
        width: 50%;
        height: 50%;
        text-align: center;
        margin: 3px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card p:nth-child(1){
        font-size: 60px;
    }
    
    .card p:nth-child(2){
        font-size: 40px;
    }

    .card button{
        cursor: pointer;
        border-radius: 7px;
        margin: 0 auto;
        margin-top: 30px;
        border: none;
        padding: 15px 25px;
        background-color: var(--text);
        font-size: 17px;
        font-weight: bold;
        color: var(--primary);
    }
`