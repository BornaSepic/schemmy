import styled from "styled-components";
import {Paper} from "@material-ui/core";

export const SchemaDisplayContainer = styled(Paper)`
    max-width: 580px;
    max-height: 580px;
    width: 100%;
    position: sticky;
    top: 40px;
    
    .CodeMirror, .ReactCodeMirror {
      height: 100%;
      max-height: 100%;
    }
    
    @media only screen and (max-width: 780px) {
        max-width: 100%;    
    }  
`;
