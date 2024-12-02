import { useContext } from 'react';
import { ThemeContext } from 'grommet';

const useThemeMode = () => {
    const themeContext = useContext(ThemeContext);
    const dark = themeContext.dark || false;  // Fallback to false if it's undefined
    return { dark };
};

export default useThemeMode;
