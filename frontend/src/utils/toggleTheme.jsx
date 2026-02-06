export const toggleTheme = () => {
    const theme = localStorage.theme

    switch (theme) {
        case 'dark':
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
            break;

        default:
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
            break;
    }
}