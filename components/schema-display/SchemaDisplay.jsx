import * as Styled from "./SchemaDisplay.css.js";
import React, {useEffect, useRef, useState} from "react";
import dynamic from 'next/dynamic'
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";

import CodeIcon from '@material-ui/icons/Code';
import {SchemaActions} from "../schema-actions/SchemaActions";

const CodeMirror = dynamic(() => {
    import('codemirror/mode/javascript/javascript');
    return import('react-codemirror')
}, { ssr: false });

export const SchemaDisplay = (props) => {
    const schemaDisplay = useRef(null);
    const [settingsComponents, setSettingsComponents] = useState([]);
    const [generalSettings, setGeneralSettings] = useState({});

    useEffect(() => {
        const formattedSettingsComponents = props.settings.map(setting => {
          return {type: setting.type, ...setting.settings};
        });

        setSettingsComponents(formattedSettingsComponents)
    }, [props.settings]);

    useEffect(() => {
        const updatedGeneralSettings = {};

        Object.keys((props.generalSettings)).forEach(key => {
            if (!!props.generalSettings[key]){
                updatedGeneralSettings[key] = props.generalSettings[key];
            }
        });

        setGeneralSettings(updatedGeneralSettings);
    }, [props.generalSettings]);

    useEffect(() => {
        if (CodeMirror && !schemaDisplay.current.retry) {
            const codeMirrorInstance = schemaDisplay.current.getCodeMirror();
            codeMirrorInstance.setValue(JSON.stringify({
                name: props.schemaName,
                settings: settingsComponents,
                blocks: props.blocks
            }, null, 4));

            codeMirrorInstance.setSize("100%", "580px")
        } else {
            schemaDisplay.current.retry()
        }
    }, [props]);
    return (
        <Styled.SchemaDisplayContainer>
            {CodeMirror && <CodeMirror
                ref={schemaDisplay}
                defaultValue ={JSON.stringify({
                    ...generalSettings,
                    settings: settingsComponents,
                    blocks: props.blocks
                }, null, 4)}
                options={{
                    readOnly: true,
                    mode: "javascript",
                    size: "100%",
                    theme: "idea"
                }}
                preserveScrollPosition={true}
            />}
            <Divider />
            <SchemaActions handleSchemaImport={(schema) => props.handleSchemaImport(schema)} />
        </Styled.SchemaDisplayContainer>
    );
};