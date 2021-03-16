import styled, {css} from 'styled-components'

interface TypeContainerProps {
    type: 'deposit' | 'withdraw'
}

export const Container = styled.form`
    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.5rem;
        background: var(--shape);
        border: 1px solid #464c57;
        margin-bottom: 1rem;

        font-weight: 400;
        color: var(--text-title);
    }

    button[type="submit"] {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        border-radius: 0.5rem;
        border: 0;
        color: #FFF;
        font-weight: 600;

        transition: 0.2s;

        &:hover{
            filter: brightness(0.8);
        }
    }

    button[type="button"]{
    
    }
`

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: 0;
    outline: 0;
    background-color: transparent;
`

export const TransactionTypeContainer = styled.div<TypeContainerProps>`
    margin-bottom: 1rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;

    button{
        display: flex;
        align-items: center;
        justify-content: center;

        height: 4rem;
        border-radius: 0.5rem;
        border: 1px solid #464c57;
        background: var(--shape);
        color: #FFF;

        img{
            margin-right: 0.5rem;
            height: 20px;
            width: 20px;
        }

        transition: 0.2s;

        &:hover{
            filter: brightness(0.9);
        }

        &#withdraw {
            ${
                (props)=> props.type === 'withdraw' 
                
                && css `background-color: #debfc4` 
            }
        }

        

        &#deposit {
            ${
                (props)=> props.type === 'deposit' 
                && css `background-color: #95bfa9` 
            }
        }
    }
`