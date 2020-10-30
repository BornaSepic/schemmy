import React, {useState} from "react";
import SchemaEditor from "../schema-editor/SchemaEditor";
import {SchemaDisplay} from "../schema-display/SchemaDisplay";
import * as Styled from "./EditorContainer.css";
export const EditorContainer = () => {
    const [generalSettings, setGeneralSettings] = useState({
        name: "",
        class: "",
        section: "",
        tag: "",
        max_blocks: 0
    });

    const formatSetting = (setting) => {
        return ({
            label: setting.type.split("_").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" "),
            type: setting.type,
            settings: {...setting}
        });
    }

    const handleSchemaImport = (schema) => {
        const {settings, blocks} = schema;

        const updatedGeneralSettings = {
            name: "",
            class: "",
            section: "",
            tag: "",
            max_blocks: 0,
            ...schema
        };

        const formattedSettings = settings ? settings.map(setting => formatSetting(setting)) : [];

        const formattedBlocks = blocks ? blocks.map(block => {
            block.settings = block.settings.map(setting => formatSetting(setting));
            return block;
        }) : [];

        setSettingsComponents(formattedSettings);
        setBlocksComponents(formattedBlocks);
        setGeneralSettings(updatedGeneralSettings)
    };

    const [settingsComponents, setSettingsComponents] = useState([]);
    const [blocksComponents, setBlocksComponents] = useState([]);
    return (
        <Styled.AppContentContainer>
            <SchemaEditor
                settings={settingsComponents}
                settingsUpdate={setSettingsComponents}
                blocks={blocksComponents}
                blocksUpdate={setBlocksComponents}
                generalSettings={generalSettings}
                updateGeneralSettings={setGeneralSettings}
            />
            <SchemaDisplay blocks={blocksComponents} settings={settingsComponents} generalSettings={generalSettings}
                           handleSchemaImport={handleSchemaImport}/>
        </Styled.AppContentContainer>
    );
};