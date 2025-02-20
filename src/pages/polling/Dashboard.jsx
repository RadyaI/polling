import styled from "styled-components"
import Navbar from "../../components/navbar"
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { PollingDataCount } from "../../components/pollingDataCount";
import { getIp } from "../../utils/ip";
import { PollingData } from "../../components/pollingData";

export function PollingList() {
    const router = useNavigate()
    const [loading, setLoading] = useState(false)
    const [pollingData, setPollingData] = useState([{ pollName: "Loading", updatedAt: new Date().toLocaleString() }]);

    function goTo(params) {
        setLoading(true)
        setTimeout(() => {
            router(params)
            setLoading(false)
        }, 500);
    }

    function DisplayDraftPolling() {
        return pollingData.map((i, index) => (
            <div className="card" key={index} onClick={() => goTo(`/polling/update/${i.id}`)}>
                <div className="text">
                    <div className="title">{i.pollName}</div>
                    <small>Last updated: {new Date(i.updatedAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}</small>
                </div>
                <EditOutlined className="icon" />
            </div>
        ));
    }

    async function getDraftPolling(userId) {
        try {
            const get = await getDocs(
                query(
                    collection(db, "polling"),
                    where("userId", "==", userId),
                    where("status", "==", "Draft"),
                    orderBy("updatedAt", "desc")
                )
            );

            const tempData = [];
            get.forEach((data) => {
                const pollingData = data.data();
                tempData.push({ ...pollingData, id: data.id });
            });
            setPollingData(tempData);
            const ip = await getIp()
            console.log(ip)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getDraftPolling(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Container>
            {loading && (<Loader></Loader>)}
            <Navbar />
            <Statistik>
                <Draft>
                    <p>Draft</p>
                    <div className="wrapper">
                        <DisplayDraftPolling />
                    </div>
                </Draft>
                <Responders>
                    <PollingDataCount></PollingDataCount>
                </Responders>
            </Statistik>
            <PollingData></PollingData>
        </Container>
    );
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
        margin-left: 5px;
        margin: 10px 0;
    }
    
    .wrapper{
        width: 100%;
        height: 70%;
        overflow-y: auto;
        overflow-x: hidden;
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

    .wrapper .card{
        background-color: var(--primary);
        border-radius: 7px;
        padding: 5px;
        width: 95%;
        height: 50px;
        color: var(--text);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        cursor: pointer;
    }


    .wrapper > .card:not(:first-child) {
        margin-top: 10px;
    }

    .wrapper .card .text .title{
        font-size: 18px;
        font-weight: bold;
        margin-left: 20px;
    }

    .wrapper .card .text .title .icon-title{
        color: var(--text);
    }

    .wrapper .card .text small{
        margin-left: 20px;
    }

    .wrapper .card .icon{
        margin-right: 20px;
        font-size: 20px;
    }
    
    @media only screen and (max-width: 700px){
        width: 100%;
        padding: 0;

        p{
            width: 90%;
            margin: 0 auto;
            margin-top: 10px;
        }
        
        .wrapper{
            width: 90%;
            margin: 0 auto;
            margin-top: 10px;
        }

        .wrapper .card{
            height: 65px;
            gap: 7px;
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
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 700px){
        width: 100%;
        margin-top: 20px;
        padding: 0;
    }
`