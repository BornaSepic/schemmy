import * as Styled from "./SchemaDisplay.css.js";
import React, {useEffect, useRef, useState} from "react";
import dynamic from 'next/dynamic'
import Divider from "@material-ui/core/Divider";
import {SchemaActions} from "../schema-actions/SchemaActions";
import Clipboard from 'react-clipboard.js';
const CodeMirror = dynamic(() => {
    import('codemirror/mode/javascript/javascript');
    return import('react-codemirror')
}, { ssr: false });

export const SchemaDisplay = (props) => {
    const schemaDisplay = useRef(null);
    const [settingsComponents, setSettingsComponents] = useState([]);
    const [blocksComponents, setBlocksComponents] = useState([]);
    const [generalSettings, setGeneralSettings] = useState({});

    function removeEmptyProperties(key, value) {
        if (key === "options") {
            return value.filter(val => val.key !== "")
        }

        if (value === "") {
            return undefined;
        }

        return value;
    }

    useEffect(() => {
        const formattedSettingsComponents = props.settings.map(setting => {
          return {type: setting.type, ...setting.settings};
        });

        setSettingsComponents(formattedSettingsComponents)
    }, [props.settings]);

    useEffect(() => {
        const formattedBlocksComponents = [...props.blocks].map(block => {
            const formattedBlock = {...block};
            formattedBlock.settings = formattedBlock.settings.map(setting => {
                return {type: setting.type, ...setting.settings};
            });

            return formattedBlock;
        });

        setBlocksComponents(formattedBlocksComponents);
    }, [props.blocks]);

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
                ...generalSettings,
                settings: settingsComponents,
                blocks: blocksComponents
            }, null, 2));

            codeMirrorInstance.setSize("100%", "580px")
        } else {
            schemaDisplay.current.retry()
        }
    }, [props]);
    return (
        <Styled.SchemaDisplayContainer>
            {CodeMirror && <CodeMirror
                id={"#schema"}
                ref={schemaDisplay}
                defaultValue ={JSON.stringify({
                    ...generalSettings,
                    settings: settingsComponents,
                    blocks: blocksComponents
                }, removeEmptyProperties, 4)}
                options={{
                    readOnly: true,
                    mode: "javascript",
                    size: "100%",
                    theme: "idea"
                }}
                preserveScrollPosition={true}
            />}
            <Divider />
            <SchemaActions schema={JSON.stringify({
                ...generalSettings,
                settings: settingsComponents,
                blocks: blocksComponents
            }, removeEmptyProperties, 4)} handleSchemaImport={(schema) => props.handleSchemaImport(schema)} />
        </Styled.SchemaDisplayContainer>
    );
};

