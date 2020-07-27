import * as Styled from "./SchemaDisplay.css.js";
import TextField from "@material-ui/core/TextField";

export const SchemaDisplay = (props) => {
    return (
        <Styled.SchemaDisplayContainer>
            <Styled.SchemaDisplay
                multiline={true}
                variant={"outlined"}
                rows={30}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                value={JSON.stringify(props.settings, null, 4)}
            />
        </Styled.SchemaDisplayContainer>
    );
};