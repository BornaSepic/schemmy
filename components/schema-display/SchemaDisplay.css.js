import styled from "styled-components";
import {Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
`;

export const SchemaDisplay = styled(TextField)`
    width: 100%;
`;

