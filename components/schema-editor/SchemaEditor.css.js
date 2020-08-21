import styled from "styled-components";
import {Paper} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

export const SchemaEditorContainer = styled('div')`
    max-width: 580px;
    width: 100%;
    
    Paper + Paper {
        margin-top: 40px;
    } 
`;

export const ElevatedContainer = styled(Paper)`
    & + & {
        margin-top: 20px;
    }
    
    padding: 35px;
`;

export const BlockListItem = styled(ListItem)`
    position: relative;
    background: #f4f6f8;
    
`;

export const ComponentListItem = styled(ListItem)`
    background-color: #f4f6f8;
`;

