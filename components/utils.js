export const trimParen = (title) => {
    if (title.lastIndexOf('(') !== -1) {
        let sParenIdx = title.lastIndexOf('(')
        return title.slice(0, sParenIdx)
    } else {
        return title;
    }
}

export const wineColor = (color) => {
    switch (color) {
        case "red":
            return '#a61c00'
            break;
        case 'white':
            return '#f1c232'
            break;
        case 'rose':
            return '#ea9999'
            break;
        default:
            return '#999999'
    }
}