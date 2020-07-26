import React from "react";
import * as Styled from "./ComponentEditor.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export const ComponentEditor = (props) => {
    const handleEditorClose = (component) => {
        props.onEditorClose();
    };

    const propertyUpdateHandler = (property, value) => {
        props.component.data[property] = value;
    };

    return (
        <Dialog
            maxWidth="xs"
            fullWidth={true}
            onClose={handleEditorClose}
            aria-labelledby="simple-dialog-title" open={true}
        >
            <DialogTitle id="simple-dialog-title">Edit your component</DialogTitle>
            <Divider/>
            <List>
                {props.component.settings.map(setting => {
                    return setting !== "options" ? (
                        <Styled.ComponentListItem key={setting}>
                            <TextField fullWidth={true}
                                       label={setting} defaultValue={props.component.data[setting]} variant="outlined"
                                       onChange={(e) => propertyUpdateHandler(setting, e.target.value)}/>
                        </Styled.ComponentListItem>
                    ) : (
                        <List key={setting}>
                            <Styled.SubListTitle component={"h6"} variant={"h6"}>
                                Options:
                            </Styled.SubListTitle>
                            <Styled.SubListComponentListItem key={setting}>
                                <TextField fullWidth={true}
                                           label={"Value"}/>
                                <TextField fullWidth={true}
                                           label={"Label"}/>
                            </Styled.SubListComponentListItem>
                            <Styled.SubListActionsContainer fullWidth={true} variant="text" color="primary"
                                                            aria-label="text primary button group">
                                <IconButton>
                                    <RemoveCircleIcon/>
                                </IconButton>
                                <IconButton>
                                    <AddCircleIcon/>
                                </IconButton>
                            </Styled.SubListActionsContainer>
                        </List>
                    )
                })}
            </List>
            <Divider/>
            <DialogActions>
                <Button variant="text" color="primary" onClick={handleEditorClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
