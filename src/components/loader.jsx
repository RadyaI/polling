import styled, { keyframes } from "styled-components"

export function Loader(){
    return(
        <>
            <Load></Load>
        </>
    )
}

const animation = keyframes`
    0% {width: 0%;}
    50% {width: 50%}
    100% {width: 100%}
`

const Load = styled.div`
    position: absolute;
    background-color: pink;
    width: 100%;
    height: 2px;
    animation: ${animation} 500ms;
`