import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CheckCircleOutlined } from "@ant-design/icons"; // Icon buat tombol
import { toast, ToastContainer } from 'react-toastify'
import swal from "sweetalert";
import { onAuthStateChanged } from "firebase/auth";
import { checkIpAlreadyVote, getIp } from '../utils/ip'

export function pollingPage() {
    const { id } = useParams();
    const router = useNavigate()
    const [pollingData, setPollingData] = useState({
        pollName: "Loading...",
        author: "Loading...",
        answer: [{ value: "Loading..." }],
    });
    const [isOwner, setIsOwner] = useState(false)

    async function getPolling() {
        try {
            const get = await getDoc(doc(db, "polling", id));
            if (get.exists()) {
                setPollingData({ ...get.data(), id: get.id });
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

    async function closePolling() {
        try {

            const alert = await swal({
                icon: 'warning',
                title: 'Close polling?',
                buttons: ["No", "Yes"]
            })

            if (alert) {
                const docRef = doc(db, "polling", id)
                await updateDoc(docRef, { status: "Closed", updatedAt: Timestamp.now().toMillis() })
                toast.success("Polling Closed")
                setTimeout(() => {
                    router("/polling")
                }, 900);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    async function vote(value) {
        try {
            toast.info("Loading...")
            if (await checkIpAlreadyVote(id)) {
                toast.error("You already voted!");
                return;
            }

            const alert = await swal({
                icon: "warning",
                title: "Are you sure? Once you vote, you won't be able to undo it.",
                buttons: ["No", "Yes"]
            });

            if (alert) {
                const docRef = collection(db, "userAnswer")
                await addDoc(docRef, {
                    pollingId: id,
                    ip: await getIp(),
                    votedAt: Timestamp.now().toMillis(),
                    value
                })

                toast.success("Voted successfully")
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        getPolling();
    }, []);

    useEffect(() => {
        const subs = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.uid === pollingData.userId) {
                    setIsOwner(true)
                }
            }
        })

        return () => subs()
    }, [pollingData])

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
                            <div className="card" onClick={() => vote(i.value)} key={index}>
                                <div className="circle"></div>
                                <p>{i.value}</p>
                            </div>
                        )}
                    </Answer>
                    {isOwner && pollingData.status === "Published" && (<button onClick={() => closePolling()}>Close polling</button>)}
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

    button{
        border: none;
        padding: 10px 20px;
        margin-top: 20px;
        border-radius: 7px;
        font-weight: bold;
        font-size: 17px;
        background-color: red;
        color: var(--text);
        cursor: pointer;
    }
    
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