import countries from "@/utils/countryList";

// code => name
export const country = (code) => {
    return countries[code]
}

// name => code
export const countryCode = (name) => {
    return Object.entries(countries).find(key => key[1] === name)[0]
}

// code => flag
export const flag = (code) => {
    // https://flagcdn.com/${code}.svg //:SVG
    // https://flagcdn.com/16x12/${code}.webp //: waving
    // https://flagcdn.com/h20/${code}.webp //: h fixed
    // https://flagcdn.com/w20/${code}.webp //: w fixed

    if (code === undefined) return false
    return `https://flagcdn.com/${code}.svg`
}