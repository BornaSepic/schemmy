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
import {BlockEditor} from "./sub-components/block-editor/BlockEditor";

import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

export const SchemaEditor = (props) => {
    const [componentPickerOpened, setComponentPickerOpened] = useState(false);
    const [editedComponent, setEditedComponent] = useState(undefined);

    const [editedBlock, setEditedBlock] = useState(undefined);

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

    const componentRemovalHandler = (indexToRemove, blockIndexToEdit) => {
        if (isNaN(blockIndexToEdit)) {
            const updatedSettingsComponents = [...props.settings].filter((component, index) => {
                return index !== indexToRemove;
            });
            props.settingsUpdate(updatedSettingsComponents);
        } else {
            const updatedBlocks = [...props.blocks];

            updatedBlocks[blockIndexToEdit].settings = updatedBlocks[blockIndexToEdit].settings.filter((setting, index) => index !== indexToRemove);
            props.blocksUpdate(updatedBlocks);
        }
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
        setEditedBlock(props.blocks[index])
    };

    const blockEditorCloseHandler = () => {
        setEditedBlockIndex(undefined);
        setEditedBlock(undefined);
    };

    const blockEditorUpdateHandler = (updatedBlock) => {
        setEditedBlock(updatedBlock);
        const blocks = [...props.blocks];
        blocks[editedBlockIndex] = updatedBlock;

        props.blocksUpdate(blocks);
    };

    const blockRemovalHandler = (blockIndexToRemove) => {
        const updatedBlocks = props.blocks.filter((block, index) => index !== blockIndexToRemove);
        props.blocksUpdate(updatedBlocks);
    };

    const blockSettingsAddHandler = (index) => {
        setEditedBlockIndex(index);
        setComponentPickerOpened(true);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onSettingsDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const settings = [...props.settings];

        const reorderedSettings = reorder(
            settings,
            result.source.index,
            result.destination.index
        );

        props.settingsUpdate(reorderedSettings)
    };

    const onBlockSettingsDragEnd = (result, blockIndex) => {
        if (!result.destination) {
            return;
        }

        const blockToUpdate = {...props.blocks[blockIndex]};

        const reorderedBlockSettings = reorder(
            blockToUpdate.settings,
            result.source.index,
            result.destination.index
        );

        blockToUpdate.settings = reorderedBlockSettings;

        const blocks = [...props.blocks];
        blocks[blockIndex] = blockToUpdate;

        props.blocksUpdate(blocks);
    }

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
                <DragDropContext onDragEnd={onSettingsDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <List ref={provided.innerRef}>
                                {props.settings.map((component, index) => {
                                    return (
                                        <Draggable key={component.type + "_setting" + "_" + index}
                                                   draggableId={component.type + "_setting" + "_" + index}
                                                   index={index}>
                                            {(provided, snapshot) => (
                                                <Styled.ComponentListItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <ListItemText
                                                        primary={component.settings["label"] ? component.settings["label"] + " | " + component.label : component.label}/>
                                                    <ButtonGroup variant="text" color="primary"
                                                                 aria-label="text primary button group">
                                                        <IconButton onClick={() => componentEditHandler(index)}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={() => componentRemovalHandler(index)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </ButtonGroup>
                                                </Styled.ComponentListItem>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
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
                            <Styled.BlockContainer key={`block_${blockIndex}`}>
                                <Styled.BlockListItem>
                                    <ListItemText
                                        primary={block.name && block.type ? block.name + " | " + block.type : block.name ? block.name : (block.type ? block.type : `Block ${blockIndex}`)}/>
                                    <ListItemSecondaryAction>
                                        <ButtonGroup variant="text" color="primary"
                                                     aria-label="text primary button group">
                                            <IconButton onClick={() => blockSettingsAddHandler(blockIndex)}>
                                                <AddIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => blockEditHandler(blockIndex)}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => blockRemovalHandler(blockIndex)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ButtonGroup>
                                    </ListItemSecondaryAction>
                                </Styled.BlockListItem>
                                <DragDropContext onDragEnd={(result) => onBlockSettingsDragEnd(result, blockIndex)}>
                                    <Droppable droppableId="droppable_block_settings">
                                        {(provided, snapshot) => (
                                            <Styled.BlockSettingsContainer ref={provided.innerRef}>
                                                {block.settings.map((component, componentIndex) => (
                                                    <Draggable
                                                        key={component.type + "_" + blockIndex + "_" + componentIndex}
                                                        draggableId={component.type + "_" + blockIndex + "_" + componentIndex}
                                                        index={componentIndex}>
                                                        {(provided, snapshot) => (
                                                            <Styled.ComponentListItem
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                key={component.type + "_" + blockIndex + "_" + componentIndex}>
                                                                <ListItemText
                                                                    primary={component.settings["label"] ? component.settings["label"] + " | " + component.label : component.label}/>
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
                                                            </Styled.ComponentListItem>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Styled.BlockSettingsContainer>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Styled.BlockContainer>
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
            {editedBlock ? <BlockEditor component={editedBlock} onEditorClose={blockEditorCloseHandler}
                                        onEdit={blockEditorUpdateHandler}/> : null}
        </Styled.SchemaEditorContainer>
    )
};