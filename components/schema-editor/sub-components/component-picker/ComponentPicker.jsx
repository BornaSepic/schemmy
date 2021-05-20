import * as Styled from "./ComponentPicker.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, {useState} from "react";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {TabPanel} from "../../../tab-panel/TabPanel";

export const ComponentPicker = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const componentsData = {
        simple: [
            {
                type: "text",
                label: "Text",
                settings: {
                    "id": "",
                    "label": "",
                    "info": "",
                    "placeholder": "",
                    "default": ""
                }
            },
            {
                type: "textarea",
                label: "Textarea",
                settings: {
                    "id": "",
                    "label": "",
                    "info": "",
                    "placeholder": "",
                    "default": "",
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
                    "options": [
                        {
                            label: "",
                            value: ""
                        }
                    ],
                    "default": ""
                }
            },
            {
                type: "select",
                label: "Select",
                settings: {
                    "id": "",
                    "label": "",
                    "info": "",
                    "options": [
                        {
                            label: "",
                            value: ""
                        }
                    ],
                    "default": ""
                }
            },
            {
                type: "checkbox",
                label: "Checkbox",
                settings: {
                    "id": "",
                    "label": "",
                    "info": "",
                    "default": false
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
            },
        ],
        advanced: [
            ,
            {
                type: "color",
                label: "Color picker",
                settings: {
                    "id": "",
                    "label": "",
                    "info": "",
                    "default": ""
                }
            },
            {
                type: "font_picker",
                label: "Font picker",
                settings: {
                    "id": "",
                    "label": "",
                    "info": "",
                    "default": ""
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
                type: "link_list",
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
                    "info": "",
                    "placeholder": "",
                    "default": "",
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
            }
        ]
    };


    const handlePickerClose = () => {
        props.setOpened(false);
    };

    const handleComponentSelection = (component) => {
        handlePickerClose();
        props.onComponentSelect(component);
    };

    function a11yProps(index) {
        return {
            id: `shopify-settings-tab-${index}`,
            'aria-controls': `shopify-settings-tab-${index}`,
        };
    }

    return (
        <Styled.ComponentPickerContainer>
            <Dialog onClose={handlePickerClose} aria-labelledby="simple-dialog-title" open={props.opened}>
                <DialogTitle id="simple-dialog-title">Select your component</DialogTitle>
                <Divider/>
                <Styled.SettingsTabs style={{justifyContent: "space-around"}} value={tabValue} onChange={(event, newTab) => setTabValue(newTab)} aria-label="Shopify settings picker tabs">
                    <Tab label="Basic settings" {...a11yProps(0)} />
                    <Tab label="Advanced settings" {...a11yProps(1)} />
                </Styled.SettingsTabs>
                <TabPanel value={tabValue} index={0}>
                    <Styled.ComponentPickerList>
                        {componentsData.simple.map(component => {
                            return (
                                <ListItem button onClick={() => handleComponentSelection(component)} key={component.type}>
                                    <ListItemText primary={component.label}/>
                                </ListItem>
                            )
                        })}
                    </Styled.ComponentPickerList>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Styled.ComponentPickerList>
                        {componentsData.advanced.map(component => {
                            return (
                                <ListItem button onClick={() => handleComponentSelection(component)} key={component.type}>
                                    <ListItemText primary={component.label}/>
                                </ListItem>
                            )
                        })}
                    </Styled.ComponentPickerList>
                </TabPanel>

                <Divider/>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={handlePickerClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </Styled.ComponentPickerContainer>
    );
};
