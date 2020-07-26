import * as Styled from "./SchemaEditor.css";
import {ComponentPicker} from "./sub-components/component-picker/ComponentPicker";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {ComponentEditor} from "./sub-components/component-editor/ComponentEditor";

export const SchemaEditor = () => {
    const [settingsComponents, setSettingsComponents] = useState([]);
    const [blocksComponents, setBlocksComponents] = useState([]);
    const [editedComponent, setEditedComponent] = useState(undefined);

    const nameChangeHandler = () => {
        console.log('test')
    };

    const componentSelectionHandler = (component) => {
        const updatedSettingsComponents = [...settingsComponents, component];
        setSettingsComponents(updatedSettingsComponents);
    };

    const componentRemovalHandler = (indexToRemove) => {
        const updatedSettingsComponents = [...settingsComponents].filter((component, index) => {
            return index !== indexToRemove;
        });
        setSettingsComponents(updatedSettingsComponents);
    };

    const componentEditHandler = (indexToEdit) => {
        setEditedComponent(settingsComponents[indexToEdit]);
    };

    const editorCloseHandler = () => {
        setEditedComponent(undefined);
    };

    return (
        <Styled.SchemaEditorContainer>
            <Styled.ElevatedContainer elevation={2}>
                {/*<TextField label="Name" variant="outlined" onChange={nameChangeHandler}/>*/}

                <Typography variant={"h5"}>
                    Settings
                </Typography>
                <List>
                    {settingsComponents.map((component, index) => {
                        return (
                            <Styled.ComponentListItem key={component.type + "_" + index}>
                                <ListItemText primary={component.data["label"] ? component.data["label"] + " | " + component.label : component.label}/>
                                <ListItemSecondaryAction>
                                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                        <IconButton onClick={() => componentEditHandler(index)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => componentRemovalHandler(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ButtonGroup>
                                </ListItemSecondaryAction>
                            </Styled.ComponentListItem>
                        )
                    })}
                </List>
                <ComponentPicker onComponentSelect={componentSelectionHandler}/>
                {editedComponent ? <ComponentEditor component={editedComponent} onEditorClose={editorCloseHandler} /> : null}
            </Styled.ElevatedContainer>
        </Styled.SchemaEditorContainer>
    )
};