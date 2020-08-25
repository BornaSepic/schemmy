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
                "min": 0,
                "max": 0,
                "step": 0,
                "unit": "",
                "label": "",
                "default": "",
            }

        },
        {
            type: "color",
            label: "Color picker",
            settings: {
                "id": "",
                "label": "",
                "default": "",
                "info": ""
            }
        },
        {
            type: "font_picker",
            label: "Font picker",
            settings: {
                "id": "",
                "label": "",
                "default": "",
                "info": ""
            }
        },
        {
            type: "collection",
            label: "Collection",
            settings: {
                "id": "",
                "label": "",
                "info": ""
            }
        },
        {
            type: "product",
            label: "Product",
            settings: {
                "id": "",
                "label": "",
                "info": ""
            }
        },
        {
            type: "page",
            label: "Page",
            settings: {
                "id": "",
                "label": "",
                "info": ""
            }
        },
        {
            type: "list_list",
            label: "Link list",
            settings: {
                "id": "",
                "label": "",
                "info": ""
            }
        },
        {
            type: "url",
            label: "URL",
            settings: {
                "id": "",
                "label": ""
            }
        },
        {
            type: "video_url",
            label: "Video",
            settings: {
                "id": "",
                "label": "",
                "accept": ["youtube", "vimeo"],
                "default": "",
                "info": "",
                "placeholder": ""
            }
        },
        {
            type: "richtext",
            label: "Rich text",
            settings: {
                "id": "",
                "label": "",
                "default": ""
            }
        },
        {
            type: "html",
            label: "HTML",
            settings: {
                "id": "",
                "label": "",
                "default": ""
            }
        },
        {
            type: "article",
            label: "Article",
            settings: {
                "id": "",
                "label": ""
            }
        },
        {
            type: "header",
            label: "Header",
            settings: {
                "content": "",
                "info": ""
            }
        },
        {
            type: "paragraph",
            label: "Paragraph",
            settings: {
                "content": ""
            }
        }
    ];


    const handlePickerClose = () => {
        props.setOpened(false);
    };

    const handleComponentSelection = (component) => {
        handlePickerClose();
        props.onComponentSelect(component);
    };

    return (
        <Styled.ComponentPickerContainer>

            <Dialog onClose={handlePickerClose} aria-labelledby="simple-dialog-title" open={props.opened}>
                <DialogTitle id="simple-dialog-title">Select your component</DialogTitle>
                <Divider/>
                <Styled.ComponentPickerList>
                    {componentsData.map(component => {
                        return (
                            <ListItem button onClick={() => handleComponentSelection(component)} key={component.type}>
                                <ListItemText primary={component.label}/>
                            </ListItem>
                        )
                    })}
                </Styled.ComponentPickerList>
                <Divider/>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={handlePickerClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </Styled.ComponentPickerContainer>
    );
};