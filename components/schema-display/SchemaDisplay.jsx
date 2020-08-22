import * as Styled from "./SchemaDisplay.css.js";
import {useEffect, useState} from "react";

export const SchemaDisplay = (props) => {
    const [settingsComponents, setSettingsComponents] = useState([]);

    useEffect(() => {
        const formattedSettingsComponents = props.settings.map(setting => {
          return {type: setting.type, ...setting.settings};
        });

        setSettingsComponents(formattedSettingsComponents)
    }, [props.settings]);

    return (
        <Styled.SchemaDisplayContainer>
            <Styled.SchemaDisplay
                multiline={true}
                variant={"outlined"}
                rows={30}

                readOnly={true}
                value={JSON.stringify({
                    name: props.schemaName,
                    settings: settingsComponents,
                    blocks: props.blocks
                }, null, 4)}
            />
        </Styled.SchemaDisplayContainer>
    );
};