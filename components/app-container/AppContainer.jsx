import React, {useState} from "react";
import {SchemaEditor} from "../schema-editor/SchemaEditor";
import {SchemaDisplay} from "../schema-display/SchemaDisplay";

export const AppContainer = () => {
    const [settingsComponents, setSettingsComponents] = useState([]);

    return (
        <>
            <SchemaEditor settings={settingsComponents} settingsUpdate={setSettingsComponents} />
            <SchemaDisplay settings={settingsComponents} />
        </>
    );
};