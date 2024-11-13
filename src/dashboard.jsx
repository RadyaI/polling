import styled, { createGlobalStyle } from "styled-components"

import Navbar from "./components/navbar"

export default function Dashboard() {
    return (
        <>
            <Navbar></Navbar>
            {/* <Content></Content> */}
        </>
    )
}

createGlobalStyle`
    :root{
        --primary: #111828;
        --secondary: #202938;
        --optional: #6366f1;
        --text: #F0EDCF;
    }
`

const Content = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid var(--optional);
`