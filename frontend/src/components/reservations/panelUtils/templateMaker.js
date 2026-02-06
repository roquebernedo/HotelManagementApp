export const templateMaker = (rooms = []) => {
    const template = {}
    rooms.map(c => c.enabled && (template[c.id] = []))
    return template
}