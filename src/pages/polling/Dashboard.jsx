import styled from "styled-components"
import Navbar from "../../components/navbar"

export function PollingList() {
    return (
        <>
            <Container>
                <Navbar></Navbar>
                <Statistik>
                    <Draft>
                        <p>Draft</p>
                        <div className="wrapper">

                        </div>
                    </Draft>
                    <Responders></Responders>
                </Statistik>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const Statistik = styled.div`
    width: 90%;
    height: 250px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;

    @media only screen and (max-width: 700px){
        flex-direction: column;
        height: 400px;
    }
`
const Draft = styled.div`
    width: 45%;
    height: 100%;
    border-radius: 15px;
    background-color: var(--secondary);
    padding: 0 20px;
    padding-bottom: 10px;
    
    p{
        color: var(--text);
        font-size: 20px;
        font-weight: bold;
    }
    
    .wrapper{
        width: 100%;
        height: 70%;
        border: 1px solid white;
        overflow-y: auto;
    }

    .wrapper::-webkit-scrollbar {
        width: 10px;
    }

    .wrapper::-webkit-scrollbar-track {
        background: transparent;
    }

    .wrapper::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    .wrapper::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    
    @media only screen and (max-width: 700px){
        width: 100%;
        padding: 0;

        p{
            border: 1px solid white;
            width: 90%;
            margin: 0 auto;
            margin-top: 10px;
        }
        
        .wrapper{
            width: 90%;
            margin: 0 auto;
            margin-top: 10px;
        }
    }
    `

const Responders = styled.div`
    width: 45%;
    height: 100%;
    border-radius: 15px;
    background-color: var(--optional);
    padding: 0 20px;
    padding-bottom: 10px;

    @media only screen and (max-width: 700px){
        width: 100%;
        margin-top: 20px;
        padding: 0;
    }
`