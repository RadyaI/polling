import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


export function PollingDataCount() {

    const [pollingData, setPollingData] = useState([])
    const [draftPolling, setDraftPolling] = useState(0)
    const [publishedPolling, setPublishedPolling] = useState(0)
    const [allPolling, setAllPolling] = useState(0)

    function count() {
        setDraftPolling(pollingData.filter((i) => i.status === "Draft").length)
        setPublishedPolling(pollingData.filter((i) => i.status === "Published").length)
        setAllPolling(pollingData.length)
    }

    function getPolling(userId) {
        try {
            onSnapshot(query(
                collection(db, "polling"),
                where("userId", "==", userId)
            ), (snapShot) => {
                const temp = []
                snapShot.forEach((data) => {
                    temp.push({ ...data.data(), id: data.id })
                })
                setPollingData(temp)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getPolling(user.uid)
            }
        })
    }, [])

    useEffect(() => {
        count()
    }, [pollingData])

    return (
        <>
            <Wrapper>
                <div className="card">
                    <div className="number">
                        <p>{draftPolling}</p>
                        <p>Draft polling</p>
                    </div>
                </div>
                <div className="card">
                    <div className="number">
                        <p>{publishedPolling}</p>
                        <p>Published polling</p>
                    </div>
                </div>
                <div className="card">
                    <div className="number">
                        <p>{allPolling}</p>
                        <p>Total polling</p>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    @media only screen and (max-width: 700px){

    }

    .card {
        width: 30%;
        height: 60%;
        background: var(--secondary);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease-in-out;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .card .number {
        width: 90%;
        height: 90%;
        background: var(--primary);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .card .number p {
        margin: 5px 0;
        color: var(--text);
    }

    .card .number p:nth-child(1) {
        font-size: 32px;
        font-weight: bold;
        color: var(--optional);
    }

    .card p {
        font-size: 16px;
        color: var(--text);
    }

    @media only screen and (max-width: 700px){
        .card{
            width: 28%;
            height: 65%;
        }   
    }
`;