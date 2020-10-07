import styled from "styled-components";
import {Paper} from "@material-ui/core";

export const SchemaDisplayActions = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    
    padding-left: 12px;
    
    svg path {
        fill: hsl(186deg 21% 26%);
    }
    
    button {
     display: flex;
     align-items: center;
     border: none;
     background: transparent;
     cursor: pointer;
    
     
     &:focus {
        outline: none;
     }
    }
`;

export const SchemaImportContainer = styled('div')`
    max-width: 240px;
    width: 100%;    
`;