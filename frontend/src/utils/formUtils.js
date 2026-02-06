import { deformatDate, formatDate } from "./formatDate"

export const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)

// Load data for edition
export const loadData = (data) => {
    const aux = Object.entries(data)
    aux.forEach(e => {
        const input = document.getElementById(e[0]),
            value = e[1];
        if (input && value !== '-') input.value = value
    })
}

export const setOUT = (checkin, nights) => {
    //? IN + N = OUT
    const N = Number.parseInt(nights),
        date = new Date(formatDate(checkin)),
        newDate = date.setDate(date.getUTCDate() + N),
        finalDate = deformatDate(new Date(newDate).toLocaleDateString('en'))

    return finalDate
}

export const setNIGHTS = (checkin, checkout) => {
    //: IN - OUT = N
    const dateIn = new Date(formatDate(checkin)),
        dateOut = new Date(formatDate(checkout)),
        N = (dateOut - dateIn) / 1000 / 60 / 60 / 24

    return N
}

export const setIN = (checkout, nights) => {
    //* OUT - N = IN
    const N = Number.parseInt(nights),
        date = new Date(formatDate(checkout)),
        newDate = date.setDate(date.getUTCDate() - N),
        finalDate = deformatDate(new Date(newDate).toLocaleDateString('en'))

    return finalDate
}

export const fillDates = (checkin, checkout, nights, id) => {
    // e.preventDefault()
    // const checkin = document.getElementById('checkin'),
    //     checkout = document.getElementById('checkout'),
    //     nights = document.getElementById('nights'),
    //     id = e.target.id

    switch (id) {
        case 'checkin':
            if (checkin.value) {
                if (nights.value && !checkout.value) {
                    //? new value for "checkout" input (checkin + nights)
                    checkout.value = setOUT(checkin.value, nights.value)
                } else if (checkout.value) {
                    //: new value for "nights" input (checkout - checkin)
                    nights.value = setNIGHTS(checkin.value, checkout.value)
                }
            }
            break;

        case 'checkout':
            if (checkout.value) {
                if (nights.value && !checkin.value) {
                    //* new value for "checkin" input (checkout - nights)
                    checkin.value = setIN(checkout.value, nights.value)
                } else if (checkin.value) {
                    //: new value for "nights" input (checkout - checkin)
                    nights.value = setNIGHTS(checkin.value, checkout.value)
                }
            }
            break;

        default:
            if (checkout.value && !checkin.value) {
                //* new value for "checkin" input (checkout - nights)
                checkin.value = setIN(checkout.value, nights.value)
            } else if (checkin.value && !checkout.value) {
                //? new value for "checkout" input (checkin + nights)
                checkout.value = setOUT(checkin.value, nights.value)
            }
            break;
    }
}

export const doDatesOverlap = (a1, a2, b1, b2) => {
    const a = new Date(a1),
        b = new Date(a2),
        x = new Date(b1),
        y = new Date(b2)

    if ((x >= a && x < b) || (x < a && y > a))
        return true
    else
        return false
}

// Looks for available rooms
export const datesValidator = (rooms, setAvRooms, setErrors, IN, OUT, PAX = 1, edit) => {
    // remove error alerts
    setErrors(errors => {
        let aux = { ...errors }
        delete aux.checkin
        delete aux.persons
        delete aux.room
        return aux
    })

    if (!IN || !OUT) return null

    const dateA = formatDate(IN),
        dateB = formatDate(OUT),
        select = document.getElementById('room')

    if (new Date(dateA) > new Date(dateB)) {
        setAvRooms(() => [])
        setErrors(errors => ({
            ...errors,
            checkin: 'El checkin es posterior al checkout.'
        }))
        return []
    }

    let avRooms = []
    rooms.forEach(c => {
        if (c.enabled) {
            //look for a reservation that overlaps with form dates
            let overlap = c.reservations.find(r => doDatesOverlap(r.in, r.out, dateA, dateB))

            // overlaping with the same reserv on edition?
            if (edit && overlap?.reservation_id === edit?._id) {
                // If the user edits the checkout date it will found the same reservation first.
                // It's needed to look for another reservation overlaping the new dates.
                // overlaping checkout date = START
                // edit new checkout date = END  
                const overlapChekout = new Date(overlap?.out),
                    editCheckout = new Date(dateB);
                if (editCheckout > overlapChekout) {
                    let overlapB = c.reservations.find(r => doDatesOverlap(r.in, r.out, overlap.out, dateB))
                    // if there is no other overlap, save room for render
                    if (!overlapB) {
                        overlap = false
                    } else {
                        overlap = overlapB
                    }

                } else {
                    // if the user didn't change the checkout it's safe to continue
                    overlap = false
                }
            }

            // if there is no overlap save room for render
            if (!overlap) {
                avRooms.push({ id: c.id, name: c.name, pax: c.capacity })
            } else if (edit && edit.room.id === c.id) {
                // if overlaps in the same room as the one editing, show special error
                setErrors(errors => ({
                    ...errors,
                    room: 'El alojamiento de esta reserva no está disponible en las fechas seleccionadas.'
                }))
            }
        }
    })

    if (!!avRooms.length) {
        // filter by capacity to detect this exact error
        avRooms = avRooms.filter(c => c.pax >= parseInt(PAX))
        if (!!avRooms.length) {
            // enable select input
            select && (select.disabled = false)
            // set new room list for render
            setAvRooms(() => avRooms)
        } else {
            // disable select input
            select && (select.disabled = true)
            select && (select.value = false)
            // set error
            setErrors(errors => ({
                ...errors,
                persons: 'No hay alojamiento disponible con esta capacidad'
            }))
            // set new room list for render
            setAvRooms(() => [])

            return avRooms
        }
    } else {
        // disable select input
        select && (select.disabled = true)
        select && (select.value = false)
        // set error
        setErrors(errors => ({
            ...errors,
            checkin: 'No hay alojamiento disponible para estas fechas'
        }))
        // set new room list for render
        setAvRooms(() => [])
    }
    return avRooms
}

export const numberToCurrency = (num) => {
    // format number XXXXXXX to X.XXX.XXX
    let n = String(num).replace('$', '').replace('.', '')
    if (n.length === 0) return ''
    return '$' + n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const numberToPercentage = (num) => {
    // format number XXX to %XXX
    let n = String(num).replace('%', '')
    if (n.length === 0) return ''
    if (parseInt(n) > 100) return '%100'
    return '%' + n.replace(/\D/g, "")
}