export const booleanToText = (item, name) => {
    if (item) return `${name}`.toUpperCase()
    else return `no ${name}`.toUpperCase()
}