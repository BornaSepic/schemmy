import * as Styled from "./ComponentPicker.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, {useState} from "react";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";

export const ComponentPicker = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const componentsData = [
        {
            type: "text",
            label: "Text",
            settings: {
                "id": "",
                "label": "",
                "default": "",
                "info": "",
                "placeholder": "",
            }
        },
        {
            type: "textarea",
            label: "Textarea",
            settings: {
                "id": "",
                "label": "",
                "default": "",
                "info": "",
                "placeholder": ""
            }
        },
        {
            type: "image_picker",
            label: "Image Picker",
            settings: {
                "id": "",
                "label": ""
            }
        },
        {
            type: "radio",
            label: "Radio",
            settings: {
                "id": "",
                "label": "",
                "info": "",
                "default": "",
                "options": [
                    {
                        key: "",
                        value: ""
                    }
                ],
            }
        },
        {
            type: "select",
            label: "Select",
            settings: {
                "id": "",
                "label": "",
                "info": "",
                "default": "",
                "options": [
                    {
                        key: "",
                        value: ""
                    }
                ],
            }
        },
        {
            type: "checkbox",
            label: "Checkbox",
            settings: {
                "id": "",
                "label": "",
                "default": "",
                "info": ""
            }
        },
        {
            type: "range",
            label: "Range",
            settings: {
                "id": "",
                "min": "",
                "max": "",
                "step": "",
                "unit": "",
                "label": "",
                "default": "",
            }

        }
    ];

    const handlePickerOpen = () => {
        setIsOpen(true);
    };

    const handlePickerClose = (component) => {
        setIsOpen(false);
    };

    const handleComponentSelection = (component) => {
        handlePickerClose();
        props.onComponentSelect(component);
    };

    return (
        <Styled.ComponentPickerContainer>
            <Button variant="contained" color="primary" onClick={handlePickerOpen}>
                + Add a settings element
            </Button>
            <Dialog onClose={handlePickerClose} aria-labelledby="simple-dialog-title" open={isOpen}>
                <DialogTitle id="simple-dialog-title">Select your component</DialogTitle>
                <Divider/>
                <List>
                    {componentsData.map(component => {
                        return (
                            <ListItem button onClick={() => handleComponentSelection(component)} key={component.type}>
                                <ListItemText primary={component.label} />
                            </ListItem>
                        )
                    })}
                </List>
                <Divider/>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={handlePickerClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </Styled.ComponentPickerContainer>
    );
};