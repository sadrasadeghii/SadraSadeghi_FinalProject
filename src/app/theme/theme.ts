import { createTheme } from '@mui/material/styles'
let themeMode: boolean = false;
// const handleChangeTheme = (themeStatus: boolean) => { themeMode = themeStatus }
const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: ['Bvazir', 'Arial'].join(',')
    },
    palette: {
        mode: themeMode ? 'dark' : 'light'
    }
})
export default theme;
export { themeMode };