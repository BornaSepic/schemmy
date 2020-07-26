import styled from "styled-components";
import {ListItem} from "@material-ui/core";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";


export const ComponentListItem = styled(ListItem)`
  padding: 35px; 
  
  label {
    text-transform: capitalize;
  }
`;

export const SubListTitle = styled(Typography)`
    padding: 0 16px;
`;

export const SubListComponentListItem = styled(ListItem)`
    label {
        text-transform: capitalize;
    }
    
    > div + div {
        margin-left: 16px;
    }
`;

export const SubListActionsContainer = styled(ButtonGroup)`
    display: flex;
    justify-content: flex-end;
    padding-right: 16px;
`;