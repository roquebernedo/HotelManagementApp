export const getWeekValues = (start, end, data) => {
    if (!data) return {}
    const aux = {}
    const aux2 = { 1: [{2: "hola", 3: "hola2"}], 2: [{2: "chau", 3: "chau2"}]}
    console.log("entro aca")
    console.log(aux2[1.0])
    
    data.forEach(e => {
        const date = new Date(e.date),
            START = new Date(start),
            END = new Date(end)

        if (date >= START && date <= END) {
            aux[e.date]
                ? aux[e.date].push(e)
                : aux[e.date] = [e]
        }
    });

    return aux
}