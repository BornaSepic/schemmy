import * as Styled from "./FlattenerContainer.css";
import React, {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";

const CodeMirror = dynamic(() => {
    import('codemirror/mode/javascript/javascript');
    return import('react-codemirror')
}, {ssr: false});

export const FlattenerContainer = () => {
    const blockIndexes = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    const [unformattedSchema, setUnformattedSchema] = useState("");
    const [flattenedSchema, setFlattenedSchema] = useState({});

    const schemaDisplay = useRef(null);


    const flattenSchema = (schemaJSON) => {
        if (schemaJSON.blocks && schemaJSON.blocks.length) {
            schemaJSON.blocks.forEach((block, index) => {
                blockIndexes.forEach((blockIndex) => {

                    if (block.name) {
                        const headerBlock = {
                            "type": "header",
                            "content": `${block.name} - ${blockIndex}`
                        };

                        schemaJSON.settings = [...schemaJSON.settings, headerBlock];
                    }

                    const blockSettings = JSON.parse(JSON.stringify(block.settings));
                    const formattedBlockSettings = blockSettings.map(setting => {
                        setting.id = `${block.type ? `${block.type}-` : ''}${setting.id || setting.type}-${blockIndex}`;
                        return setting;
                    });
                    schemaJSON.settings = [...schemaJSON.settings, ...formattedBlockSettings]
                });
            });
        }
        schemaJSON.blocks = [];
        setFlattenedSchema(schemaJSON);
    };

    const handleSchemaUpdate = (value) => {
        setUnformattedSchema(value);
        let schemaJSON = null;
        try {
            schemaJSON = JSON.parse(value);
        } catch (e) {
            return;
        }

        if (schemaJSON) {
            flattenSchema(schemaJSON);
        }
    };

    useEffect(() => {
        if (CodeMirror && !schemaDisplay.current.retry) {
            const codeMirrorInstance = schemaDisplay.current.getCodeMirror();
            codeMirrorInstance.setValue(JSON.stringify(flattenedSchema, null, 2));

            codeMirrorInstance.setSize("100%", "580px")
        } else {
            schemaDisplay.current.retry()
        }
    }, [flattenedSchema]);

    return (
        <>
            <Styled.FlattenerContainer>
                <div>
                    <Styled.FlattenerTitle>Enter your section schema:</Styled.FlattenerTitle>
                    {CodeMirror && <CodeMirror
                        id={"#schema"}
                        defaultValue={unformattedSchema}
                        options={{
                            readOnly: false,
                            mode: "javascript",
                            size: "100%",
                            theme: "idea",
                            preserveScrollPosition: true
                        }}
                        preserveScrollPosition={true}
                        onChange={(value) => handleSchemaUpdate(value)}
                    />}
                </div>
                <div>
                    <Styled.FlattenerTitle>Get your flattened schema:</Styled.FlattenerTitle>

                    {CodeMirror && <CodeMirror
                        ref={schemaDisplay}
                        id={"#flatSchema"}
                        defaultValue={JSON.stringify(flattenedSchema, null, 2)}
                        options={{
                            readOnly: true,
                            mode: "javascript",
                            size: "100%",
                            theme: "idea",
                            preserveScrollPosition: true
                        }}
                        preserveScrollPosition={true}
                    />}
                </div>
            </Styled.FlattenerContainer>
        </>
    )
};