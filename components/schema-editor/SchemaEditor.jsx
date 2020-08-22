import * as Styled from "./SchemaEditor.css";
import {ComponentPicker} from "./sub-components/component-picker/ComponentPicker";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {ComponentEditor} from "./sub-components/component-editor/ComponentEditor";
import Button from "@material-ui/core/Button";

export const SchemaEditor = (props) => {
    const [componentPickerOpened, setComponentPickerOpened] = useState(false);
    const [editedComponent, setEditedComponent] = useState(undefined);

    const [componentIndexToEdit, setComponentIndexToEdit] = useState(undefined);
    const [editedBlockIndex, setEditedBlockIndex] = useState(undefined);

    const nameChangeHandler = (name) => {
        props.schemaNameUpdate(name);
    };

    const handleComponentPickerOpen = () => {
        setComponentPickerOpened(true);
    };

    const componentSelectionHandler = (component) => {
        if (!isNaN(editedBlockIndex)) {
            const blocks = [...props.blocks];
            blocks[editedBlockIndex].settings = [...blocks[editedBlockIndex].settings, component];

            props.blocksUpdate(blocks);
            return;
        }

        const updatedSettingsComponents = [...props.settings, component];
        props.settingsUpdate(updatedSettingsComponents);
    };

    const componentRemovalHandler = (indexToRemove) => {
        const updatedSettingsComponents = [...props.settings].filter((component, index) => {
            return index !== indexToRemove;
        });
        props.settingsUpdate(updatedSettingsComponents);
    };

    const componentEditHandler = (newComponentIndexToEdit, newBlockIndexToEdit) => {
        if (isNaN(newBlockIndexToEdit)) {
            setComponentIndexToEdit(newComponentIndexToEdit);
            setEditedComponent(props.settings[newComponentIndexToEdit]);
        } else {
            setEditedBlockIndex(newBlockIndexToEdit);
            setComponentIndexToEdit(newComponentIndexToEdit);

            setEditedComponent(props.blocks[newBlockIndexToEdit].settings[newComponentIndexToEdit]);
        }
    };

    const editorCloseHandler = () => {
        setComponentIndexToEdit(undefined);
        setEditedBlockIndex(undefined);
        setEditedComponent(undefined);
    };

    const editorUpdateComponentHandler = (updatedComponent) => {
        setEditedComponent(updatedComponent);

        if (isNaN(editedBlockIndex)) {
            const settings = [...props.settings];
            settings[componentIndexToEdit] = updatedComponent;
            props.settingsUpdate(settings);
        } else {
            const blocks = [...props.blocks];
            blocks[editedBlockIndex].settings[componentIndexToEdit] = updatedComponent;
            props.blocksUpdate(blocks);
        }
    };

    const handleBlockAddition = () => {
        const newBlock = {
            type: "",
            name: "",
            settings: []
        };

        props.blocksUpdate([...props.blocks, newBlock]);
    };

    const blockEditHandler = (index) => {
        setEditedBlockIndex(index);
    };

    const blockRemovalHandler = () => {

    };

    const blockSettingsAddHandler = (index) => {
        setEditedBlockIndex(index);
        setComponentPickerOpened(true);
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
                <Button variant="contained" color="primary" onClick={handleComponentPickerOpen}>
                    + Add a settings element
                </Button>
            </Styled.ElevatedContainer>
            <Styled.ElevatedContainer elevation={2}>
                <Typography variant={"h5"}>
                    Blocks
                </Typography>
                <List>
                    {props.blocks.map((block, blockIndex) => {
                        return (
                            <>
                                <Styled.BlockListItem>
                                    <ListItemText
                                        primary={block.name ? block.name + " | " + block.type : `Block ${blockIndex}`}/>
                                    <ListItemSecondaryAction>
                                        <ButtonGroup variant="text" color="primary"
                                                     aria-label="text primary button group">
                                            <IconButton onClick={() => blockEditHandler(blockIndex)}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => blockRemovalHandler(blockIndex)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => blockSettingsAddHandler(blockIndex)}>
                                                <AddIcon/>
                                            </IconButton>
                                        </ButtonGroup>
                                    </ListItemSecondaryAction>
                                </Styled.BlockListItem>
                                <Styled.BlockSettingsContainer>
                                    {block.settings.map((component, componentIndex) => (
                                        <Styled.ComponentListItem
                                            key={component.type + "_" + blockIndex + "_" + componentIndex}>
                                            <ListItemText
                                                primary={component.settings["label"] ? component.settings["label"] + " | " + component.label : component.label}/>
                                            <ListItemSecondaryAction>
                                                <ButtonGroup variant="text" color="primary"
                                                             aria-label="text primary button group">
                                                    <IconButton
                                                        onClick={() => componentEditHandler(componentIndex, blockIndex)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => componentRemovalHandler(componentIndex, blockIndex)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </ButtonGroup>
                                            </ListItemSecondaryAction>
                                        </Styled.ComponentListItem>
                                    ))}
                                </Styled.BlockSettingsContainer>
                            </>
                        )
                    })}
                </List>
                <Button variant="contained" color="primary" onClick={handleBlockAddition}>
                    + Add a block element
                </Button>
            </Styled.ElevatedContainer>
            <ComponentPicker onComponentSelect={componentSelectionHandler} opened={componentPickerOpened}
                             setOpened={setComponentPickerOpened}/>
            {editedComponent ? <ComponentEditor component={editedComponent} onEditorClose={editorCloseHandler}
                                                onEdit={editorUpdateComponentHandler}/> : null}
        </Styled.SchemaEditorContainer>
    )
};