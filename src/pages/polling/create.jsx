import styled from "styled-components"
import Navbar from "../../components/navbar"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { PlusCircleOutlined } from '@ant-design/icons'

export function CreatePoll() {

    const router = useNavigate();

    const [title, setTitle] = useState("");
    const [options, setOptions] = useState([{ value: "First Option" }]);

    const handleAddOption = () => {
        setOptions([...options, { value: "" }]);
    };

    const handleOptionChange = (index, newValue) => {
        const updatedOptions = options.map((opt, i) =>
            i === index ? { ...opt, value: newValue } : opt
        );
        setOptions(updatedOptions);
    };

    return (
        <>
            <Navbar></Navbar>
            <Navigate>
                <span onClick={() => router("/polling")}>polling</span> {'/'} <span>create</span>
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
        </>
    )
}

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