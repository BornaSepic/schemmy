import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import * as Styled from "../../SchemaEditor.css";
import React from "react";

export const GeneralSettingsEditor = ({generalSettings, updateGeneralSetting}) => {
    return (
        <Styled.ElevatedContainer elevation={2}>
            <Typography variant={"h5"}>
                Schema settings
            </Typography>
            <List>
                <ListItem>
                    <TextField fullWidth={true} label="Name" variant="outlined" defaultValue={generalSettings.name}
                               onChange={(e => updateGeneralSetting(e.target.value, "name"))}/>
                </ListItem>
                <ListItem>
                    <TextField fullWidth={true} label="Class" variant="outlined" defaultValue={generalSettings.class}
                               onChange={(e => updateGeneralSetting(e.target.value, "class"))}/>
                </ListItem>
                <ListItem>
                    <TextField fullWidth={true} label="Tag" variant="outlined" defaultValue={generalSettings.tag}
                               onChange={(e => updateGeneralSetting(e.target.value, "tag"))}/>
                </ListItem>
                <ListItem>
                    <TextField fullWidth={true} label="Section" variant="outlined" defaultValue={generalSettings.tag}
                               onChange={(e => updateGeneralSetting(e.target.value, "section"))}/>
                </ListItem>
                <ListItem>
                    <TextField fullWidth={true} type={"number"} label="Max blocks" variant="outlined" defaultValue={generalSettings.max_blocks}
                               onChange={(e => updateGeneralSetting(parseInt(e.target.value), "max_blocks"))}/>
                </ListItem>
            </List>
        </Styled.ElevatedContainer>
    )
};