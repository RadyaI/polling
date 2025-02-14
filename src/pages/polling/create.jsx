import styled, { keyframes } from "styled-components"
import Navbar from "../../components/navbar"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { PlusCircleOutlined } from '@ant-design/icons'
import { auth, db } from "../../config/firebase"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { Loader } from "../../components/loader"

export function CreatePoll() {

    const router = useNavigate();

    const [title, setTitle] = useState("");
    const [options, setOptions] = useState([{ value: "First Option" }]);
    const [isLoading, setIsLoading] = useState(false)

    const handleAddOption = () => {
        setOptions([...options, { value: "" }]);
    };

    const handleOptionChange = (index, newValue) => {
        const updatedOptions = options.map((opt, i) =>
            i === index ? { ...opt, value: newValue } : opt
        );
        setOptions(updatedOptions);
    };

    function goTo(params) {
        setIsLoading(true)
        setTimeout(() => {
            router(params)
            setIsLoading(false)
        }, 500);
    }

    async function action(status) {
        try {

            if (title === "") {
                return swal({
                    icon: "error",
                    title: "Title is required!",
                    button: "Ok"
                })
            }

            const alert = await swal({
                icon: 'warning',
                title: `You want to ${status === "Draft" ? "save?" : "publish?"}`,
                buttons: ["No", "Yes"],
            })

            if (alert) {
                setIsLoading(true)
                const pollingData = {
                    userId: auth.currentUser.uid,
                    pollName: title,
                    answer: options,
                    status,
                    winner: null,
                    createdAt: Timestamp.now().toMillis(),
                    updatedAt: Timestamp.now().toMillis()
                }

                await addDoc(collection(db, "polling"), pollingData)

                swal({
                    icon: 'success',
                    // title: `${status === "Draft" ? "Saved" : "Published"}`,
                    title: false,
                    button: false,
                    timer: 1200
                })
                router("/polling")
            }
        } catch (error) {
            console.log(error.message)
        }
    }   

    return (
        <>
            <Navbar></Navbar>
            { isLoading && (<Loader></Loader>)}
            <Navigate>
                <span onClick={() => goTo("/polling")}>polling</span> {'/'} <span>create</span>
            </Navigate>
            <Wrapper>
                <div className="title">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-title"
                        placeholder="Polling title..."
                    />
                </div>
                <div className="option">
                    {options.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            className="input-option"
                            placeholder="Input option..."
                            value={data.value}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    ))}
                    <div className="addOption" onClick={handleAddOption}>
                        Add option <PlusCircleOutlined className="icon" />
                    </div>
                </div>
            </Wrapper>
            <Action>
                {!isLoading && (<button className="btn-draft" onClick={() => action("Draft")}>Save</button>)}
                {!isLoading && (<button className="btn-publish" onClick={() => action("Published")}>Publish</button>)}
                {isLoading && (<Loading></Loading>)}
            </Action>
        </>
    )
}

const muter = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const Loading = styled.div`
    width: 30px;
    height: 30px;
    border: 5px solid transparent;
    border-top-color: var(--text);
    border-radius: 50%;
    animation: ${muter} 500ms linear infinite;
`;


const Navigate = styled.div`
    width: 88%;
    padding: 20px;
    height: auto;
    margin: 0 auto;
    margin-top: 25px;
    color: grey;

    span{
        cursor: pointer;
    }
`
const Wrapper = styled.div`
    width: 88%;
    padding: 20px;
    margin: 0 auto;
    margin-top: 20px;

    .title{
        width: 100%;
        height: auto;
    }

    .title .input-title{
        border: none;
        outline: none;
        width: 30%;
        height: 50px;
        padding: 0 20px;
        font-size: 25px;
        background-color: transparent;
        color: var(--text);
        position: relative;
        border-bottom: 1px solid var(--text);
    }

    .option{
        margin-top: 50px;
    }

    .option .input-option{
        border: none;
        outline: none;
        width: 50%;
        height: 50px;
        padding: 0 20px;
        font-size: 20px;
        color: var(--text);
        background-color: var(--secondary);
        border-radius: 10px;
    }

    .option > .input-option:not(:first-child){
        margin-top: 20px;
    }

    .option .addOption{
        margin-top: 20px;
        width: 50%;
        padding: 5px;
        font-size: 20px;
        color: var(--text);
        cursor: pointer;
    }

    .option .addOption .icon{
        color: var(--text);
        margin-left: 10px;
    }

    @media only screen and (max-width: 700px){
        .title .input-title{
            width: 80%;
        }

        .option .input-option{
            width: 80%;
        }
    }
`

const Action = styled.div`
    width: 87%;
    padding: 20px;
    margin: 0 auto;
    
    button{
        border: none;
        padding: 10px 20px;
        border-radius: 7px;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;
    }

    .btn-draft{
        background-color: var(--text);
        color: var(--primary);
    }

    .btn-publish{
        margin-left: 20px;
        background-color: var(--optional);
        color: var(--text);
    }
    
`