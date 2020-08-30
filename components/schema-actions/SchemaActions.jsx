import * as Styled from "./SchemaActions.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export const SchemaActions = (props) => {
    const [error, setError] = useState(false);

    const handleSchemaImport = (schema) => {
        setError(false);
        let parsedSchema = undefined;

        try {
            parsedSchema = JSON.parse(schema);
            props.handleSchemaImport(parsedSchema);
        } catch (e) {
            parsedSchema = undefined;
            setError(true);
            alert('yo what you tryin to do??')
        }
    };

    return (
        <Styled.SchemaDisplayActions>
            <TextField fullWidth={false}
                       onChange={(e) => handleSchemaImport(e.target.value)}
                       placeholder={"Import your schema"}
                       value={""}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <CodeIcon/>
                               </InputAdornment>
                           ),
                       }}
            />
            <ButtonGroup variant="text" color="primary"
                         aria-label="text primary button group">
                <IconButton
                    onClick={() => {
                    }}>
                    <FileCopyIcon/>
                </IconButton>
            </ButtonGroup>
        </Styled.SchemaDisplayActions>
    )
};