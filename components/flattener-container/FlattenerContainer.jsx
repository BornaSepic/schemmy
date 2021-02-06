import * as Styled from "./FlattenerContainer.css";
import React, {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import {Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Clipboard from "react-clipboard.js";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const CodeMirror = dynamic(() => {
    import('codemirror/mode/javascript/javascript');
    return import('react-codemirror')
}, {ssr: false});

export const FlattenerContainer = () => {
    const blockIndexes = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    const [unformattedSchema, setUnformattedSchema] = useState("");
    const [flattenedSchema, setFlattenedSchema] = useState({});
    const [success, setSuccess] = useState(false);

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
                        if (setting.type !== "header") {
                            setting.id = `${block.type ? `${block.type}-` : ''}${setting.id || setting.type}-${blockIndex}`;
                            return setting;
                        } else {
                            return setting;
                        }

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

    function updateSuccess() {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 1500)
    }

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
                <Paper>
                    <Styled.FlattenerTitle>
                        <Typography variant={"h5"}>
                            Enter your section schema:
                        </Typography>
                    </Styled.FlattenerTitle>
                    <Divider/>

                    {CodeMirror && <CodeMirror
                        id={"#schema"}
                        defaultValue={unformattedSchema}
                        placeholder={"Your schema needs to be valid JSON"}
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
                </Paper>
                <Paper>
                    <Styled.FlattenerTitle>
                        <Typography variant={"h5"}>
                            Get your flattened schema:
                        </Typography>
                        <Clipboard component={"a"} data-clipboard-text={JSON.stringify(flattenedSchema, null, 2)} onSuccess={() => updateSuccess()}>
                            <IconButton >
                                <FileCopyIcon/>
                            </IconButton>
                        </Clipboard>
                    </Styled.FlattenerTitle>
                    <Divider/>

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
                </Paper>
            </Styled.FlattenerContainer>
        </>
    )
};


