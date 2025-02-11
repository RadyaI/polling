import styled from "styled-components"
import Navbar from "../../components/navbar"

export function PollingList() {
    return (
        <>
            <Container>
                <Navbar></Navbar>
                <Statistik>
                    <Draft></Draft>
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

    @media only screen and (max-width: 700px){
        width: 100%;
    }
`

const Responders = styled.div`
    width: 45%;
    height: 100%;
    border-radius: 15px;
    background-color: var(--optional);

    @media only screen and (max-width: 700px){
        width: 100%;
        margin-top: 20px;
    }
`