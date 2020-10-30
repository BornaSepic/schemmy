import styled from "styled-components";

export const FlattenerContainer = styled('section')`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
    > div {
        max-width: 580px;
        width: 100%;
        min-height: 500px;
        & + div {
            margin-left: 45px;
        }
    }
    
    .CodeMirror {
        cursor: pointer;
        min-height: 500px;
    }
`;

export const FlattenerTitle = styled('h3')`
    color: white;
    margin-bottom: 12px;
    letter-spacing: .5px;
`;