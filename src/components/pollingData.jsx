import { useEffect, useState } from "react";
import styled from "styled-components";
import { DeleteFilled, EditOutlined, EyeOutlined, LinkOutlined } from "@ant-design/icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { Loader } from "./loader";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export function PollingData() {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const [pollingData, setPollingData] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const router = useNavigate()
    const goTo = (params) => {
        setIsLoading(true)
        setTimeout(() => {
            router(params)
            setIsLoading(false)
        }, 500);
    }

    async function getPolling(userId) {
        try {
            const get = await getDocs(query(
                collection(db, "polling"),
                where("userId", "==", userId),
                orderBy("updatedAt", "desc")
            ))

            const temp = []
            get.forEach((data) => {
                temp.push({ ...data.data(), id: data.id })
            })
            setPollingData(temp)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function deletePolling(pollingId) {
        try {
            const alert = await swal({
                icon: "warning",
                title: "Delete this polling?",
                buttons: ["No", "Yes"],
                dangerMode: true
            })

            if (alert) {
                const docRef = doc(db, "polling", pollingId)
                await deleteDoc(docRef)

                setPollingData((prevData) => prevData.filter((poll) => poll.id !== pollingId));

                swal({
                    icon: "success",
                    title: false,
                    button: false,
                    timer: 600
                })
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    function DisplayPolling() {
        try {
            let dataPoll = [...pollingData]

            if (search !== "") {
                dataPoll = dataPoll.filter((i) => i.pollName.toLowerCase().includes(search.toLowerCase()))
            }

            if (filter !== '') {
                dataPoll = dataPoll.filter((i) => i.status === filter)
            }

            const data = dataPoll.map((i, index) =>
                <Card key={index}>
                    <Title>{i.pollName} { i.status === "Published" && (<LinkOutlined onClick={() => copyLink(`https://onlinepoll.vercel.app/${i.id}`)} className="icon-title" />)}</Title>
                    <Timestamp>Last updated: {new Date(i.updatedAt).toLocaleString(("id-ID"), {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}</Timestamp>
                    <EditButton>
                        <Status className={i.status}>{i.status}</Status>
                        {i.status === "Draft" && (<EditOutlined className="icon" onClick={() => goTo(`/polling/update/${i.id}`)} />)}
                        {i.status !== "Draft" && (<EyeOutlined className="icon" />)}
                        <DeleteFilled className="icon" onClick={() => deletePolling(i.id)}></DeleteFilled>
                    </EditButton>
                </Card>
            )

            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    function copyLink(link) {
        try {
            navigator.clipboard.writeText(link)
            toast.success("Copy successfully!")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subs = onAuthStateChanged(auth, (user) => {
            if (user) {
                getPolling(user.uid)
            }
        })

        return () => subs()
    }, [])

    return (
        <>
            {isLoading && (<Loader />)}
            <ToastContainer
                position="bottom-right"
                theme="dark"
            />
            <Wrapper>
                <FilterBox>
                    <SearchInput
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari polling..."
                    />
                    <SelectFilter value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Semua</option>
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Closed">Closed</option>
                    </SelectFilter>
                </FilterBox>
                <Polling>
                    <DisplayPolling />
                </Polling>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    background: var(--secondary);
    margin: 50px auto;
    width: 85%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const FilterBox = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    background: var(--primary);
    color: var(--text);
    outline: none;
    border: none;
    font-size: 16px;

    &::placeholder {
        color: rgba(240, 237, 207, 0.7);
    }

    &:focus {
        border: 2px solid var(--optional);
    }

    @media only screen and (max-width: 700px){
        width: 50%;
    }
`;

const SelectFilter = styled.select`
    padding: 10px;
    border-radius: 8px;
    background: var(--primary);
    color: var(--text);
    font-size: 16px;
    cursor: pointer;

    @media only screen and (max-width: 700px){
        width: 40%;
    }
`;

const Polling = styled.div`
    margin-top: 20px;
`;

const Card = styled.div`
    background: var(--primary);
    padding: 15px;
    border-radius: 10px;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

    &:not(:first-child){
        margin-top: 20px;
    }
`;

const Title = styled.h3`
    margin: 0;
    font-size: 18px;

    .icon-title{
        cursor: pointer;
    }
`;

const Timestamp = styled.p`
    font-size: 14px;
    opacity: 0.7;
    margin: 0;
`;

const Status = styled.span`
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    width: fit-content;
    margin-right: 15px;

    @media only screen and (max-width: 700px){
        margin-right: 0px;
    }

    &.Draft {
        background: #ffcc00;
        color: #333;
    }

    &.Published {
        background: #4caf50;
        color: white;
    }

    &.Closed {
        background: #ff5733;
        color: white;
    }
`;

const EditButton = styled.button`
    background: transparent;
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: var(--text);
    font-size: 18px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    border: none;
    
    .icon{
        font-size: 25px;
        margin-right: 15px;
    }

    .icon:hover {
        cursor: pointer;
        color: var(--optional);
    }

    @media only screen and (max-width: 700px){
        position: relative;
        width: 80%;
        justify-content: flex-start;
        .icon{
            /* display: none; */
            margin-left: 20px;
        }
    }
`;
