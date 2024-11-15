import styled, { createGlobalStyle } from "styled-components"

import Navbar from "./components/navbar"
import { useEffect } from "react"

export default function Dashboard() {
    return (
        <>
            <Navbar></Navbar>
            <Header>
                <div className="title">Tentukan Pilihanmu</div>
                <div className="desc">
                    <p>Untuk menghentikan perdebatan yang panjang ini pilih yang menurutmu benar.</p>
                </div>
            </Header>
            <Content>
                <div className="poll">
                    <p>Martabak manis atau terang bulan?</p>
                    <div className="result">
                        <p>Hasilnya...</p>
                        <p></p>
                    </div>
                    {/* <div className="yesno">
                        <button>Martabak Manis</button>
                        <button>Terang Bulan</button>
                    </div> */}
                </div>
                <div className="poll">
                    <p>Martabak manis atau terang bulan?</p>
                    <div className="yesno">
                        <button>Martabak Manis</button>
                        <button>Terang Bulan</button>
                    </div>
                </div>
                <div className="poll">
                    <p>Martabak manis atau terang bulan?</p>
                    <div className="yesno">
                        <button>Martabak Manis</button>
                        <button>Terang Bulan</button>
                    </div>
                </div>
                <div className="poll">
                    <p>Martabak manis atau terang bulan?</p>
                    <div className="yesno">
                        <button>Martabak Manis</button>
                        <button>Terang Bulan</button>
                    </div>
                </div>
            </Content>
        </>
    )
}

createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Pre:wght@400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :root{
        --primary: #111828;
        --secondary: #202938;
        --optional: #6366f1;
        --text: #F0EDCF;
    }
`

const Content = styled.div`
    width: 60%;
    height: auto;
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px 0;
    font-family: "Inter";
    border: 1px solid white;


    .poll{
        border: 1px solid white;
        color: var(--text);
        width: 70%;
        height: 100%;
        margin: 0 auto;
        padding: 5px;
        margin-bottom: 70px;
    }

    .poll .result{
        border: 1px solid white;
        width: 95%;
        height: auto;
        padding: 20px 10px;
        margin-top: 10px;
    }

    .poll .result p:nth-child(1){
        font-weight: bold;
        text-align: center;
    }

    .poll p {
        font-size: 20px;
    }

    .yesno{
        display: flex;
        gap: 20px;
        align-items:center;
        margin-top: 20px;
    }

    button{
        font-size: 18px;
        border: 1px solid white;
        border-radius: 7px;
        color: var(--text);
        padding: 20px 40px;
        cursor: pointer;
        box-shadow: 3px 3px 1px 1px white;
    }

    button:hover{
        box-shadow: 2px 2px 1px 1px white;
        transform: translateY(1px);
    }

    @media only screen and (max-width: 700px){
        width: 90%;
        
        .poll{
            width: 90%;
        }

        button{
            padding: 10px 20px;
        }
    }
`

const Header = styled.div`
    color: var(--text);
    margin: 0 auto;
    margin-top: 20px;
    width: 50%;
    height: auto;
    padding: 20px 0;

    .title{
        font-size: 60px;
        text-align: center;
        font-family: "Edu AU VIC WA NT Pre";
    }

    .desc{
        text-align: center;
        font-family: "Inter";
        font-size: 20px;
        margin-top: 15px;
    }

    .desc p{
        word-spacing: 2px;
        line-height: 1.5;
    }

    @media only screen and (max-width: 700px){
        width: 90%;
    }

`