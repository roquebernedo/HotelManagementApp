import { setNIGHTS } from '@/utils/formUtils'
import { useEffect, useState } from 'react'

const usePanelController = (create, creating) => {

    const [selectMode, setSelectMode] = useState(false)
    const [room, setRoom] = useState(false)
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)

    const [creatingMode, setCreatingMode] = useState(false)
    useEffect(() => {
        if (!creating) {
            setCreatingMode(() => false)
            reset()
        }
    }, [creating])


    const reset = () => {
        setSelectMode(() => false)
        setRoom(() => false)
        setStart(() => false)
        setEnd(() => false)
    }

    const cDown = (room, date) => {
        setSelectMode(() => true)
        setRoom(() => room)
        setStart(() => date)
    }

    const cUp = () => {
        if (selectMode && end) {
            const aux = {
                room,
                checkin: start,
                checkout: end,
                nights: setNIGHTS(start, end)
            }
            setCreatingMode(() => true)
            create(() => aux)
        } else reset()
    }

    const mEnter = (date) => {
        if (selectMode) {
            // si se selecciona hacia atras, se desactiva el modo
            if (date < start) reset()
            setEnd(() => date)
        }
    }

    const frontier = () => {
        // checkea si el mouse sale de la fila
        selectMode && reset()
    }

    return {
        selectMode,
        creatingMode,
        end,

        reset,
        cDown,
        cUp,
        mEnter,
        frontier
    }
}

export default usePanelController