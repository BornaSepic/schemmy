import styled from "styled-components";

export const AppContentContainer = styled('section')`
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-around;
    
    @media only screen and (max-width: 780px) {
        flex-flow: column;
    }
`;