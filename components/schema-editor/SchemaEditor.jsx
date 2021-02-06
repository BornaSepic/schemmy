import * as Styled from "./SchemaEditor.css";
import {ComponentPicker} from "./sub-components/component-picker/ComponentPicker";
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
import FileCopyIcon from '@material-ui/icons/FileCopy';

import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {GeneralSettingsEditor} from "./sub-components/general-settings-editor/GeneralSettingsEditor";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../../styles/theme";

const SchemaEditor = (props) => {
    const [componentPickerOpened, setComponentPickerOpened] = useState(false);
    const [editedComponent, setEditedComponent] = useState(undefined);

    const [editedBlock, setEditedBlock] = useState(undefined);

    const [componentIndexToEdit, setComponentIndexToEdit] = useState(undefined);
    const [editedBlockIndex, setEditedBlockIndex] = useState(undefined);

    const generalSettingsChangeHandler = (value, key) => {
        const generalSettings = {...props.generalSettings};

        generalSettings[key] = value;
        props.updateGeneralSettings(generalSettings);
    };

    const handleComponentPickerOpen = () => {
        setComponentPickerOpened(true);
    };

    const componentSelectionHandler = (component) => {
        if (!isNaN(editedBlockIndex)) {
            const blocks = [...props.blocks];
            blocks[editedBlockIndex].settings = [...blocks[editedBlockIndex].settings, component];

            props.blocksUpdate(blocks);
            setEditedComponent(component);
            return;
        }

        const updatedSettingsComponents = [...props.settings, component];
        props.settingsUpdate(updatedSettingsComponents);

        setEditedComponent(component)
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

    const blockCopyHandler = (blockIndexToCopy) => {
        const blocks = [...props.blocks];
        const copiedBlock = {...blocks[blockIndexToCopy]};

        blocks.splice(blockIndexToCopy, 0, JSON.parse(JSON.stringify(copiedBlock)));

        props.blocksUpdate(blocks);
    };

    const componentCopyHandler = (componentIndexToCopy, blockIndexToCopy) => {
        if (isNaN(blockIndexToCopy)) {
            const settingsToUpdate = [...props.settings];
            const copiedComponent = JSON.parse(JSON.stringify(settingsToUpdate[componentIndexToCopy]));
            settingsToUpdate.splice(componentIndexToCopy, 0, copiedComponent);

            props.settingsUpdate(settingsToUpdate);
        } else {
            const blocks = [...props.blocks];
            const blockToCopyInto = blocks[blockIndexToCopy];
            const copiedComponent = JSON.parse(JSON.stringify(blockToCopyInto.settings[componentIndexToCopy]));
            blockToCopyInto.settings.splice(componentIndexToCopy, 0, copiedComponent);

            props.blocksUpdate(blocks)
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

    const onSettingsDragEnd = (source, destination) => {
        const settings = [...props.settings];

        const reorderedSettings = reorder(
            settings,
            source.index,
            destination.index
        );
        console.log(reorderedSettings)
        props.settingsUpdate(reorderedSettings)
    };

    const onBlockSettingsDragEnd = (source, destination, blockIndex) => {
        if (!destination) {
            return;
        }

        const blockToUpdate = {...props.blocks[blockIndex]};

        blockToUpdate.settings = reorder(
            blockToUpdate.settings,
            source.index,
            destination.index
        );

        const blocks = [...props.blocks];
        blocks[blockIndex] = blockToUpdate;

        props.blocksUpdate(blocks);
    };

    const handleSettingComponentDrop = (source, destination) => {
        if (destination.droppableId === "drop_settings") {
            // DROPPED SETTING INTO SETTINGS
            onSettingsDragEnd(source, destination);
        } else {
            const draggedSetting = JSON.parse(JSON.stringify(props.settings[source.index]));
            // REMOVE THE DRAGGED SETTING FROM SETTINGS
            const updatedSettings = [...props.settings];
            updatedSettings.splice(source.index, 1);
            props.settingsUpdate(updatedSettings);

            // ADD IT TO THE APPROPRIATE BLOCK
            const blocks = [...props.blocks];
            const destinationBlock = blocks[parseInt(destination.droppableId.replace("drop_block_settings_", ""))];
            destinationBlock.settings.push(draggedSetting);
            destinationBlock.settings = reorder(destinationBlock.settings, (destinationBlock.settings.length - 1), destination.index);
            props.blocksUpdate(blocks);
        }
    }

    const handleBlockSettingComponentDrop = (source, destination) => {
        if (source.droppableId === destination.droppableId) {
            // DROPPED WITHIN THE SAME BLOCK
            const destinationBlockIndex = parseInt(destination.droppableId.replace("drop_block_settings_", ""));
            onBlockSettingsDragEnd(source, destination, destinationBlockIndex)
        } else if (destination.droppableId === "drop_settings") {
            // DROPPED TO SETTINGS
            const blocks = [...props.blocks];
            const sourceBlock = blocks[parseInt(source.droppableId.replace("drop_block_settings_", ""))];

            const draggedBlockSetting = JSON.parse(JSON.stringify(sourceBlock.settings[source.index]));
            const updatedSettings = [...props.settings];
            updatedSettings.push(draggedBlockSetting);
            const orderedSettings = reorder(updatedSettings, (updatedSettings.length - 1), destination.index)

            sourceBlock.settings.splice(source.index, 1);

            props.settingsUpdate(orderedSettings);
            props.blocksUpdate(blocks);
        } else {
            // DROPPED TO ANOTHER BLOCK
            const blocks = [...props.blocks];
            const sourceBlock = blocks[parseInt(source.droppableId.replace("drop_block_settings_", ""))];
            const destinationBlock = blocks[parseInt(destination.droppableId.replace("drop_block_settings_", ""))];

            const draggedBlockSetting = JSON.parse(JSON.stringify(sourceBlock.settings[source.index]));
            sourceBlock.settings.splice(source.index, 1);
            destinationBlock.settings.push(draggedBlockSetting);

            destinationBlock.settings = reorder(destinationBlock.settings, (destinationBlock.settings.length - 1), destination.index);
            props.blocksUpdate(blocks);
        }
    };

    const handleComponentDrop = (result) => {
      const {source, destination} = result;
      if (destination) {
          if (source.droppableId === "drop_settings") {
              handleSettingComponentDrop(source, destination);
          } else {
              handleBlockSettingComponentDrop(source, destination);
          }
      }
    };

    return (
        <Styled.SchemaEditorContainer>
            <GeneralSettingsEditor generalSettings={props.generalSettings}
                                   updateGeneralSetting={generalSettingsChangeHandler}/>
            <DragDropContext onDragEnd={(result) => handleComponentDrop(result)}>

                <Styled.ElevatedContainer elevation={2}>
                    <Typography variant={"h5"}>
                        Settings
                    </Typography>
                        <Droppable droppableId="drop_settings">
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
                                                            primary={component.settings["label"] || component.settings["content"] ? component.settings["label"] || component.settings["content"] + " | " + component.label : component.label}/>
                                                        <ButtonGroup variant="text" color="primary"
                                                                     aria-label="text primary button group">
                                                            <IconButton onClick={() => componentEditHandler(index)}>
                                                                <EditIcon/>
                                                            </IconButton>
                                                            <IconButton onClick={() => componentCopyHandler(index)}>
                                                                <FileCopyIcon/>
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
                    <Button className={props.classes.button} variant="contained" color="primary"
                            onClick={handleComponentPickerOpen}>
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
                                            primary={block.name ? block.name : (block.type ? block.type : `Block ${blockIndex}`)}/>
                                        <ListItemSecondaryAction>
                                            <ButtonGroup variant="text" color="primary"
                                                         aria-label="text primary button group">
                                                <IconButton onClick={() => blockSettingsAddHandler(blockIndex)}>
                                                    <AddIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => blockEditHandler(blockIndex)}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => blockCopyHandler(blockIndex)}>
                                                    <FileCopyIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => blockRemovalHandler(blockIndex)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ButtonGroup>
                                        </ListItemSecondaryAction>
                                    </Styled.BlockListItem>
                                    <Droppable droppableId={`drop_block_settings_${blockIndex}`}>
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
                                                                        onClick={() => componentCopyHandler(componentIndex, blockIndex)}>
                                                                        <FileCopyIcon/>
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
                                </Styled.BlockContainer>
                            )
                        })}
                    </List>
                    <Button className={props.classes.button} variant="contained" color="primary"
                            onClick={handleBlockAddition}>
                        + Add a block element
                    </Button>
                </Styled.ElevatedContainer>
            </DragDropContext>

            <ComponentPicker onComponentSelect={componentSelectionHandler} opened={componentPickerOpened}
                             setOpened={setComponentPickerOpened}/>
            {editedComponent ? <ComponentEditor component={editedComponent} onEditorClose={editorCloseHandler}
                                                onEdit={editorUpdateComponentHandler}/> : null}
            {editedBlock ? <BlockEditor component={editedBlock} onEditorClose={blockEditorCloseHandler}
                                        onEdit={blockEditorUpdateHandler}/> : null}
        </Styled.SchemaEditorContainer>
    )
};

export default withStyles(styles)(SchemaEditor);
