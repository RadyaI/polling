import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CheckCircleOutlined } from "@ant-design/icons"; // Icon buat tombol
import { toast, ToastContainer } from 'react-toastify'

export function pollingPage() {
    const { id } = useParams();
    const router = useNavigate()
    const [pollingData, setPollingData] = useState({
        pollName: "Loading...",
        author: "Loading...",
        answer: [{value: "Loading..."}],
    });

    async function getPolling() {
        try {
            const get = await getDoc(doc(db, "polling", id));
            if (get.exists()) {
                setPollingData({ ...get.data(), id: get.id });
                console.log({ ...get.data(), id: get.id });
            } else {
                router("/notfound")
            }
        } catch (error) {
            console.log(error.message);
            toast.error(`Not found or ${error.message}`)
            setTimeout(() => {
                router("/t/notfound")
            }, 500);
        }
    }

    useEffect(() => {
        getPolling();
    }, []);

    return (
        <>
            <ToastContainer
                position="bottom-right"
                theme="dark"
            />
            <Container>
                <Wrapper>
                    <Title>
                        <p>{pollingData.pollName}</p>
                        <small>{`${pollingData.author === null ? "Anonim" : pollingData.author}`}</small>
                    </Title>
                    <Answer>
                        {pollingData.answer.map((i, index) =>
                            <div className="card" key={index}>
                                <div className="circle"></div>
                                <p>{i.value}</p>
                            </div>
                        )}
                    </Answer>
                </Wrapper>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    color: var(--text);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 50%;
    height: 90dvh;
    
    @media only screen and (max-width: 700px){
        width: 90%;
    }
`

const Title = styled.div`
    width: 80%;

    p{
        font-size: 30px;
        font-weight: bold;
    }
`
const Answer = styled.div`
    width: 100%;
    height: auto;
    margin-top: 10px;
    
    .card {
        width: 100%;
        background: var(--secondary);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 12px 0;
        cursor: pointer;
        margin-top: 20px;
        transition: background 0.3s ease-in-out;

        &:hover {
            background: var(--optional);

            .circle{
                border: 2px solid var(--text);
            }
        }
    }

    .card:not(:first-child){
        margin-top: 25px;
    }

    .circle {
        width: 24px;
        height: 24px;
        border: 2px solid var(--optional);
        border-radius: 50%;
        margin-left: 12px;
        transition: all 0.3s;
    }

    p {
        margin: 0;
        margin-left: 15px;
        font-size: 16px;
        font-weight: 500;
        color: var(--text);
    }
`;  