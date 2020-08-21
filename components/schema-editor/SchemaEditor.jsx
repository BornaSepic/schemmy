import * as Styled from "./SchemaEditor.css";
import {ComponentPicker} from "./sub-components/component-picker/ComponentPicker";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {ComponentEditor} from "./sub-components/component-editor/ComponentEditor";
import Button from "@material-ui/core/Button";

export const SchemaEditor = (props) => {
    const [indexToEdit, setIndexToEdit] = useState(0);
    const [blocksComponents, setBlocksComponents] = useState([]);
    const [editedComponent, setEditedComponent] = useState(undefined);

    const nameChangeHandler = (name) => {
        props.schemaNameUpdate(name);
    };

    const componentSelectionHandler = (component) => {
        const updatedSettingsComponents = [...props.settings, component];
        props.settingsUpdate(updatedSettingsComponents);
    };

    const componentRemovalHandler = (indexToRemove) => {
        const updatedSettingsComponents = [...props.settings].filter((component, index) => {
            return index !== indexToRemove;
        });
        props.settingsUpdate(updatedSettingsComponents);
    };

    const componentEditHandler = (indexToEdit) => {
        setIndexToEdit(indexToEdit);
        setEditedComponent(props.settings[indexToEdit]);
    };

    const editorCloseHandler = () => {
        setEditedComponent(undefined);
    };

    const editorUpdateComponentHandler = (updatedComponent) => {
        setEditedComponent(updatedComponent);

        const settings = [...props.settings];
        settings[indexToEdit] = updatedComponent;
        props.settingsUpdate(settings);
    };

    const handleBlockAddition = () => {
      const newBlock = {
          type: "",
          name: "",
          settings: []
      };

      props.blocksUpdate([...props.blocks, newBlock]);
    };

    return (
        <Styled.SchemaEditorContainer>
            <Styled.ElevatedContainer elevation={2}>
                <TextField fullWidth={true} label="Name" variant="outlined"
                           onChange={(e => nameChangeHandler(e.target.value))}/>
            </Styled.ElevatedContainer>
            <Styled.ElevatedContainer elevation={2}>
                <Typography variant={"h5"}>
                    Settings
                </Typography>
                <List>
                    {props.settings.map((component, index) => {
                        return (
                            <Styled.ComponentListItem key={component.type + "_" + index}>
                                <ListItemText
                                    primary={component.settings["label"] ? component.settings["label"] + " | " + component.label : component.label}/>
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
                {editedComponent ? <ComponentEditor component={editedComponent} onEditorClose={editorCloseHandler}
                                                    onEdit={editorUpdateComponentHandler}/> : null}
            </Styled.ElevatedContainer>
            <Styled.ElevatedContainer elevation={2}>
                <Typography variant={"h5"}>
                    Blocks
                </Typography>
                <List>
                    {props.blocks.map((block, index) => {
                        return (
                            <Styled.BlockListItem>
                                <ListItemText
                                    primary={block.name ? block.name + " | " + block.type : `Block ${index}`}/>
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
                                <List>
                                    {block.settings.map((component) => (
                                        <Styled.ComponentListItem key={component.type + "_" + index}>
                                            <ListItemText
                                                primary={component.settings["label"] ? component.settings["label"] + " | " + component.label : component.label}/>
                                            <ListItemSecondaryAction>
                                                <ButtonGroup variant="text" color="primary"
                                                             aria-label="text primary button group">
                                                    <IconButton onClick={() => componentEditHandler(index)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={() => componentRemovalHandler(index)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </ButtonGroup>
                                            </ListItemSecondaryAction>
                                        </Styled.ComponentListItem>
                                    ))}
                                </List>
                            </Styled.BlockListItem>
                        )
                    })}
                </List>
                <Button variant="contained" color="primary" onClick={handleBlockAddition}>
                    + Add a block element
                </Button>
            </Styled.ElevatedContainer>
        </Styled.SchemaEditorContainer>
    )
};