import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
    }
    
    html,
    body {
        margin: 0;
        color: #555;
        font-family: sans-serif;

        font-size: 16px;
        line-height: 1.4;
        background-color: #e5e5e5;
        min-height: 100vh;
    }
    body > div {
        margin-top: 0;
    }
    
    header {
        grid-area: Header;
    }
    
    main {
        grid-area: Content;
        background: ;
        padding: 35px;
        overflow-x: hidden;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #222;
        line-height: 1.1;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    p {
        font-size: 0.9rem;
    }
    
    strong {
        color: #222;
    }
    
    li {
        margin-top: 0.25rem;
    }
    
    section {
        margin: 2rem auto;
        margin-bottom: 50px;
    }
`;
