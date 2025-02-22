import { CloseOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import styled from "styled-components"

export function ViewAnswer({ modal, answer }) {

    return (
        <>
            <Modal className="animate__animated animate__bounceInDown">
                <Close>
                    <CloseOutlined className="icon" onClick={() => modal(false)} />
                </Close>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ip</th>
                            <th>Option</th>
                            <th>voted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answer.map((i, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{i.ip}</td>
                                <td>{i.value}</td>
                                <td>{new Date(i.votedAt).toLocaleString("id-ID", {
                                    hour12: false,
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    minute: "2-digit",
                                    hour: "2-digit"
                                })}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Modal>
        </>
    )
}

const Modal = styled.div`
    width: 50%;
    height: 50%;
    padding: 30px;
    position: fixed;
    border-radius: 10px;
    z-index: 999;
    background-color: var(--text);
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border: 1px solid var(--secondary);
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    }

    table th {
        background-color: var(--primary);
        color: var(--text);
        padding: 10px 5px;
    }
    
    table th:first-child {
        border-radius: 5px 0 0 5px;
    }
    
    table th:last-child {
        border-radius: 0 5px 5px 0;
    }

    table td{
        padding: 10px 5px;
        text-align: center;
    }

    @media only screen and (max-width: 700px){
        width: 80%;
    }
`

const Close = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    
    .icon{
        font-size: 30px;
        cursor: pointer;
    }
`