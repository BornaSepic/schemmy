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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const ComponentEditor = (props) => {
    function debounce(method, delay, properties) {
        clearTimeout(method._tId);

        const [property, value] = properties;

        method._tId= setTimeout(function(){
            method(property, value);
        }, delay);
    }

    const handleEditorClose = (component) => {
        props.onEditorClose();
    };

    const propertyUpdateHandler = (property, value) => {
        console.log(property, value)
        const component = {...props.component};
        component.settings[property] = value;

        props.onEdit(component)
    };

    const optionsPropertyUpdateHandler = (property, index, value) => {
        const component = {...props.component};

        component.settings.options[index][property] = value;

        props.onEdit(component);
    };

    const optionsPropertyAdditionHandler = () => {
        const component = {...props.component};
        component.settings.options = [...component.settings.options, {value: "", key: ""}];

        props.onEdit(component)
    };

    const optionsPropertyRemovalHandler = () => {
        const component = {...props.component};

        if (component.settings.options.length > 1) {
            component.settings.options = [...component.settings.options.slice(0, -1)]
            props.onEdit(component)
        }
    };

    const settingBuilder = (setting, componentType) => {
        if  (componentType === "checkbox" && setting === "default") {
            return (
                <Styled.ComponentListItem key={setting}>
                    <FormControlLabel
                        style={{margin: 0}}
                        control={
                            <Checkbox
                                label={"Default"}
                                checked={!!props.component.settings[setting]}
                                onChange={(e) => debounce(propertyUpdateHandler, 500, [setting, e.target.checked])}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label={setting}
                        labelPlacement="start"
                    />
                </Styled.ComponentListItem>
            );
        }

        switch (setting) {
            case "accept":
                return (
                    <Styled.ComponentListItem key={setting}>
                        <TextField fullWidth={true}
                                   label={setting} defaultValue={props.component.settings[setting]}
                                   variant="outlined"
                                   onChange={(e) => debounce(propertyUpdateHandler, 500, [setting, e.target.value.split(",")])}/>
                    </Styled.ComponentListItem>
                );
            case "min" || "max" || "step":
                return (
                    <Styled.ComponentListItem key={setting}>
                        <TextField fullWidth={true}
                                   label={setting} defaultValue={props.component.settings[setting]}
                                   variant="outlined"
                                   type={"number"}
                                   onChange={(e) => debounce(propertyUpdateHandler, 500, [setting, Math.floor(e.target.value)])}
                        />
                    </Styled.ComponentListItem>
                );
            case "options":
                return (
                    <List key={setting}>
                        <Styled.SubListTitle component={"h6"} variant={"h6"}>
                            Options:
                        </Styled.SubListTitle>
                        {props.component.settings.options.map((option, index) => (
                            <Styled.SubListComponentListItem key={setting + "_" + index}>
                                <TextField fullWidth={true}
                                           defaultValue={option.label}
                                           label={"Label"}
                                           onChange={(e) => debounce(optionsPropertyUpdateHandler, 500, ["key", index, e.target.value])}
                                />
                                <TextField fullWidth={true}
                                           defaultValue={option.value}
                                           label={"Value"}
                                           onChange={(e) => debounce(optionsPropertyUpdateHandler, 500, ["value", index, e.target.value])}
                                />
                            </Styled.SubListComponentListItem>
                        ))}
                        <Styled.SubListActionsContainer fullWidth={true} variant="text" color="primary"
                                                        aria-label="text primary button group">
                            <IconButton onClick={() => debounce(optionsPropertyRemovalHandler(), 500)}>
                                <RemoveCircleIcon/>
                            </IconButton>
                            <IconButton onClick={() => debounce(optionsPropertyAdditionHandler(), 500)}>
                                <AddCircleIcon/>
                            </IconButton>
                        </Styled.SubListActionsContainer>
                    </List>
                );
            default:
                return (
                    <Styled.ComponentListItem key={setting}>
                        <TextField fullWidth={true}
                                   label={setting} defaultValue={props.component.settings[setting]}
                                   variant="outlined"
                                   onChange={(e) => debounce(propertyUpdateHandler, 500, [setting, e.target.value])}/>
                    </Styled.ComponentListItem>
                )
        }
    }

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
                {Object.keys(props.component.settings).map(setting => {
                    return settingBuilder(setting, props.component.type);
                })}
            </List>
            <Divider/>
            <DialogActions>
                <Button variant="text" color="primary" onClick={handleEditorClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
