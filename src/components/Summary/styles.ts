import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin-top: -6rem;

    div{
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.5rem;
        color: var(--text-title);

        &.green{
            background: var(--green);
        }
    }

    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    strong{
        display: block;
        margin-top: 1rem;
        font-size: 2rem;
        line-height: 3rem;
        font-weight: 500;
    }
`