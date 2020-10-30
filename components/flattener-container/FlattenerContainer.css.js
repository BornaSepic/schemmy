import styled from "styled-components";

export const FlattenerContainer = styled('section')`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
    > * {
        max-width: 580px;
        max-height: 580px;
        width: 100%;
        position: sticky;
        top: 40px;
    }
    
    .CodeMirror {
        padding: 12px;
        min-height: 500px;
    }
`;

export const FlattenerTitle = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: .5px;
    min-height: 50px;
    padding: 0 12px 0 12px;
`;