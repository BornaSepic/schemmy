import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function App() {
    return (
        <Grid container display="flex" alignItems="center">
            <Grid item xs={6}>
                <Paper>
                    <Box display="flex" alignItems="center">
                        <TextField id="standard-basic" label="Standard"/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper></Paper>
            </Grid>
        </Grid>
    );
}
