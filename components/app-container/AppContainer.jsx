import React, {useState} from "react";
import {SchemaEditor} from "../schema-editor/SchemaEditor";
import {SchemaDisplay} from "../schema-display/SchemaDisplay";

export const AppContainer = () => {
    const [schemaName, setSchemaName] = useState("");
    const [settingsComponents, setSettingsComponents] = useState([]);
    const [blocksComponents, setBlocksComponents] = useState([]);

    return (
        <>
            <SchemaEditor
                settings={settingsComponents}
                settingsUpdate={setSettingsComponents}
                blocks={blocksComponents}
                blocksUpdate={setBlocksComponents}
                schemaNameUpdate={setSchemaName}
            />
            <SchemaDisplay settings={settingsComponents} schemaName={schemaName}/>
        </>
    );
};