import { useSelector } from 'react-redux'


export const useTheme = ()=>{
    const themeState = useSelector((state)=>state.counter.theme)

    const lightTheme = {
        background: 'var(--cream)',
        background2: 'var(--greanandcreambrighter1)',
        button: 'var(--greenandcream6)',
        heading: 'var(--greenandcream6)',
        heading2: 'var(--darkGrey)',
        golden: 'var(--golden)',
        card: 'var(--bluegrey)',
        white: 'var(--white)',
        color1: 'var(--green2)',
        color2: 'var(--green4)',
        color3: 'var(--green6)',
        color4: 'var(--green9)',
        unknown: 'var(--teal9)'
    }

    const darkTheme = {
        background: 'var(--greenandcream5)',
        background2: 'var(--greanandcreambrighter2)',
        button: 'var(--greanandcreambrighter0)',
        heading: 'var(--greanandcreambrighter0)',
        heading2: 'var(--darkGrey)',
        golden: 'var(--golden)',
        card: 'var(--bluegrey)',
        white: 'var(--white)',
        color1: 'var(--green8)',
        color2: 'var(--green6)',
        color3: 'var(--green4)',
        color4: 'var(--green2)',
        unknown: 'var(--teal9)'
    }

    const theme = themeState === 'light' ? lightTheme : darkTheme

    return theme
} 