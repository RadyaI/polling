import styled from "styled-components"

export function notFound() {
    return (
        <>
            <Wrapper>
                <div className="card">
                    <p>404</p>
                    <p>Page Not Found</p>
                </div>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;
    color: var(--text);
    display: flex;
    justify-content: center;
    align-items: center;

    .card{
        width: 50%;
        height: 50%;
        text-align: center;
        margin: 3px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card p:nth-child(1){
        font-size: 60px;
    }
    
    .card p:nth-child(2){
        font-size: 40px;
    }
`