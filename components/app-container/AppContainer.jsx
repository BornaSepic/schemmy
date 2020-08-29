import React, {useState} from "react";
import {SchemaEditor} from "../schema-editor/SchemaEditor";
import {SchemaDisplay} from "../schema-display/SchemaDisplay";

export const AppContainer = () => {
    const [generalSettings, setGeneralSettings] = useState({
        name: "",
        class: "",
        section: "",
        tag: "",
        max_blocks: 0
    });

    const [schemaName, setSchemaName] = useState("");
    const [schemaClass, setSchemaClass] = useState("");
    const [settingsComponents, setSettingsComponents] = useState([]);
    const [blocksComponents, setBlocksComponents] = useState([]);
console.log(generalSettings)
    return (
        <>
            <SchemaEditor
                settings={settingsComponents}
                settingsUpdate={setSettingsComponents}
                blocks={blocksComponents}
                blocksUpdate={setBlocksComponents}
                generalSettings={generalSettings}
                updateGeneralSettings={setGeneralSettings}
            />
            <SchemaDisplay blocks={blocksComponents} settings={settingsComponents} generalSettings={generalSettings}/>
        </>
    );
};