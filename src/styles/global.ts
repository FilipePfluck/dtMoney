import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root{
        --green: #33CC95;
        --red: #E52E4D;
        --blue: #5429CC;

        --blue-light: #6933FF;

        --text-title: #FFF;
        --text-body: #bec7e6;

        --background: #212429;
        --shape: #2D3138;
    }
    
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialised;
        color: var(--text-body);
    }

    html {
        @media (max-width: 1080px){
            font-size: 93.75%;
        }

        @media (max-width: 720px){
            font-size: 87.5%;
        }
    }

    button{
        cursor: pointer;
    }

    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }

    h1, h2, h3, h4, h5, h6, strong{
        color: var(--text-title);
        font-weight: 600;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    .react-modal-overlay{ 
        background: rgba(0,0,0,0.5);

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content{
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.5rem;
    }
`

export default GlobalStyle