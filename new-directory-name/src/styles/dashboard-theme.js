// themes/theme.js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#00c6ff',
        },
        secondary: {
            main: '#0072ff',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    overrides: {
        MuiCard: {
            root: {
                borderRadius: 15,
            },
        },
    },
});

export default theme;
