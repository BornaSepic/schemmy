import * as Styled from "./SchemaActions.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Clipboard from "react-clipboard.js";

export const SchemaActions = (props) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
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

    function updateSuccess() {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 1500)
    }

    return (
        <Styled.SchemaDisplayActions>
            <Styled.SchemaImportContainer>
                <TextField fullWidth={true}
                           onChange={(e) => handleSchemaImport(e.target.value)}
                           placeholder={"Paste your schema JSON"}
                           value={""}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <CodeIcon/>
                                   </InputAdornment>
                               ),
                           }}
                />
            </Styled.SchemaImportContainer>
            {success ? <span>Your schema has been copied!</span> : null}
            <Clipboard data-clipboard-text={props.schema} onSuccess={() => updateSuccess()}>
                <IconButton>
                    <FileCopyIcon/>
                </IconButton>
            </Clipboard>
        </Styled.SchemaDisplayActions>
    )
};