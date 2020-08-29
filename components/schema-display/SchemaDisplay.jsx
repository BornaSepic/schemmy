import * as Styled from "./SchemaDisplay.css.js";
import {useEffect, useRef, useState} from "react";
import dynamic from 'next/dynamic'

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
        })
        console.log(props.generalSettings)

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
        </Styled.SchemaDisplayContainer>
    );
};