import styled from "styled-components";
import {Paper} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

export const SchemaEditorContainer = styled('div')`
    max-width: 580px;
    width: 100%;
    
    Paper + Paper {
        margin-top: 40px;
    } 
    
    @media only screen and (min-width: 780px) {
        margin-right: 30px;    
    }
    
    @media only screen and (max-width: 780px) {
        margin-right: 0;
        margin-bottom: 30px;
        max-width: 100%;    
    }  
`;

export const BlockContainer = styled('div')`

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

export const BlockSettingsContainer = styled(List)`
    padding-top: 0 !important;
    margin-left: 26px !important;
`;

export const ComponentListItem = styled(ListItem)`
    background-color: #f4f6f8;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
`;

