import React from "react";
import * as Styled from "./BlockEditor.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

export const BlockEditor = (props) => {
    const handleEditorClose = () => {
        props.onEditorClose();
    };

    const propertyUpdateHandler = (property, value) => {
        const component = {...props.component};
        component[property] = value;

        props.onEdit(component)
    };

    return (
        <Dialog
            maxWidth="xs"
            fullWidth={true}
            onClose={handleEditorClose}
            aria-labelledby="simple-dialog-title" open={true}
        >
            <DialogTitle id="simple-dialog-title">Edit your block</DialogTitle>
            <Divider/>
            <List>
                {Object.keys(props.component).map(setting => {
                     return setting !== "settings" ? (
                         <Styled.ComponentListItem key={setting}>
                             <TextField fullWidth={true}
                                        label={setting} defaultValue={props.component[setting]}
                                        variant="outlined"
                                        onChange={(e) => propertyUpdateHandler(setting, e.target.value)}/>
                         </Styled.ComponentListItem>
                     ) : null;
                })}
            </List>
            <Divider/>
            <DialogActions>
                <Button variant="text" color="primary" onClick={handleEditorClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
