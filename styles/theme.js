import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: 'hsl(238, 100%, 78%)',
            main: 'hsl(186deg 21% 26%)',
            dark: 'hsl(223, 85%, 37%)',
            contrastText: 'hsl(0, 0%, 100%)',
        },
        secondary: {
            light: 'hsl(186deg 21% 50%)',
            main: 'hsl(186deg 21% 26%)',
            dark: 'hsl(186deg 21% 16%)',
            contrastText: 'hsl(0, 0%, 100%)',
        },
    },

});

export const styles = theme => ({
    button: {
        '&:hover': {
            backgroundColor: 'hsl(133deg 18% 59%)'
        }
    }
});

export default theme;