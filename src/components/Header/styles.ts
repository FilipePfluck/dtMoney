import styled from 'styled-components'

export const Container = styled.header`
    display: flex;

    background: var(--blue);

`

export const Content = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 2rem 1rem 10rem;

    button {
        font-size: 1rem;
        color: #FFF;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        height: 3rem;
        border-radius: 8px;
        transition: 0.2s;

        &:hover{
            filter: brightness(0.9);
        }
    }
`