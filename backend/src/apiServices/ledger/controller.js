import Ledger from "./model.js"
import Reservation from "../reservation/model.js";
import { defineWeek } from "../../utils/defineWeeks.js";
import { getWeekValues } from "../../utils/getWeekValues.js";

const getWeek = async (req, res, next) => {
    try{   
        console.log("getting week")
        const { date } = req.query
        console.log(date)
        if (!date) return res.json({ error: 'No date' })

        const DATE = new Date(`${date}T12:00:00`).toLocaleDateString('en')
        // defino las fechas de inicio y final de la semana actual
        // Lunes como primer día
        console.log(DATE)
        const {
            start,
            end
        } = defineWeek(DATE)
        console.log("defineWeek")
        console.log(start)
        console.log(end)
        const START_MONTH = new Date(start).getMonth()
        console.log(START_MONTH)
        console.log(typeof START_MONTH)
        const END_MONTH = new Date(end).getMonth()
        console.log(END_MONTH)
        if(typeof START_MONTH !== 'number') return res.json({ error: 'Invalid date' })
        console.log("line 27")
        if(START_MONTH === END_MONTH){
            const YEAR = new Date(start).getFullYear()

            const ledger = await Ledger.findOne({
                month: START_MONTH,
                year: YEAR
            })

            if(!ledger || ledger.entries.length < 1) return res.json({ week: [] })

            const week = getWeekValues(start, end, ledger.entries)
            console.log("line 39")
            console.log(week)
            return res.json({ week })
        }else{
            console.log("entraron al else del startmonth === endmonth")
            const START_YEAR = new Date(start).getFullYear()
            const END_YEAR = new Date(end).getFullYear()
            console.log(START_YEAR)
            console.log(END_YEAR)
            const firstLedger = await Ledger.findOne({
                month: START_MONTH,
                year: START_YEAR
            })

            const secondLedger = await Ledger.findOne({
                month: END_MONTH,
                year: END_YEAR
            })

            const firstWeek = firstLedger ? getWeekValues(start, end, firstLedger?.entries) : {}
            const secondWeek = secondLedger ? getWeekValues(start, end, secondLedger?.entries) : {}
            const week = { ...firstWeek, ...secondWeek }

            return res.json({ week })
        }

    } catch(error){
        next(error)
    }
}

const getMonth = async (req, res, next) => {
    try {
        const { date } = req.query
        console.log(date)
        if (!date) return res.json({ error: 'No date' })
        
        console.log("this is the month")
        const MONTH = new Date(date).getMonth()
        console.log(MONTH)
        const YEAR = new Date(date).getFullYear()
        if(typeof MONTH !== 'number' || typeof YEAR !== 'number') return res.json({ error: 'Invalid date' })

        const ledger = await Ledger.findOne({
            month: MONTH,
            year: YEAR
        })
        console.log(ledger)
        return res.json({ ledger })

    } catch (err) {
        next(err)
    }
}

const getYear = async (req, res, next) => {
    try{
        const { date } = req.query
        console.log(date)
        if(!date) return res.json({ error: 'No date' })

        const YEAR = new Date(date).getFullYear()
        console.log(YEAR)
        if(typeof YEAR !== 'number') return res.json({ error: 'Invalid date' })

        const ledger = await Ledger.find({
            year: YEAR
        })
        console.log(ledger)
        return res.json({ ledger })
    } catch(error){
        next(error)
    }
}

const newEntry = async (req, res, next) => {
    try{
        console.log("this is newEntry from ledger controller.js")
        const { user_name } = req.user
        console.log(user_name)
        const {
            date,
            entryType,
            description,
            paymentType,
            amount,
            currency,
            reservation
        } = req.body

        console.log(date)
        if (!date) return res.json({ error: 'No date' })
        if (!entryType) return res.json({ error: 'No entryType' })
        if (!description) return res.json({ error: 'No description' })
        if (!paymentType) return res.json({ error: 'No paymentType' })
        if (!amount) return res.json({ error: 'No amount' })
        if (!currency) return res.json({ error: 'No currency' })

        if(reservation){
            console.log("showing reserv")
            const reserv = await Reservation.findById(reservation)
            console.log(reserv)
            if (!reserv) return res.json({ error: 'No existe reserva con ese ID.' })
        }

        // mes y año de la fecha pedida
        const MONTH = new Date(date).getMonth()
        const YEAR = new Date(date).getFullYear()
        if (typeof MONTH !== 'number' || typeof YEAR !== 'number') return res.json({ error: 'Invalid date' })
        
        console.log("llegamos al ledger line 39")
        const ledger = await Ledger.findOne({
            month: MONTH,
            year: YEAR
        })
        console.log(ledger)

        if(ledger){
            ledger.entries.push({ ...req.body, creator: user_name })
            await ledger.save()

            return res.json({
                message: 'Entrada registrada correctamente.',
                ledger
            })
        }else{
            const newLedger = await Ledger.create({
                month: MONTH,
                year: YEAR,
                entries: [{ ...req.body, creator: user_name }]
            })

            return res.json({
                message: 'Entrada registrada correctamente.',
                ledger: newLedger
            })
        }

    } catch(error){
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const ledger = await Ledger.find({})

        res.json({ ledger: ledger || [] })

    } catch (err) {
        next(err)
    }
}

const updateEntry = async (req, res, next) => {
    try{
        const { user_name } = req.user
        const {
            id,
            date,
            entryType,
            description,
            paymentType,
            amount,
            currency,
            reservation
        } = req.body

        if (!id) return res.json({ error: 'No ID' })
        if (!date) return res.json({ error: 'No date' })
        if (!entryType) return res.json({ error: 'No entryType' })
        if (!description) return res.json({ error: 'No description' })
        if (!paymentType) return res.json({ error: 'No paymentType' })
        if (!amount) return res.json({ error: 'No amount' })
        if (!currency) return res.json({ error: 'No currency' })

        if(reservation){
            const reserv = await Reservation.findById(reservation)
            if(!reserv) return res.json({ error: 'No existe ninguna reserva con ese ID.' })
        }

        // necesidad de tomar el mes y el año de la fecha
        const MONTH = new Date(date).getMonth()
        const YEAR = new Date(date).getFullYear()
        if(typeof MONTH !== 'number' || typeof YEAR !== 'number') return res.json({ error: 'Invalid date'})

        const ledger = await Ledger.findOneAndUpdate(
            {
                month: MONTH,
                year: YEAR,
                'entries._id': id
            },
            {
                $set: {
                    'entries.$': {
                        date,
                        entryType,
                        description,
                        paymentType,
                        amount,
                        currency,
                        reservation,
                        editor: user_name
                    }
                }
            },
            { new: true }
        )

        if(!ledger) return res.json({ error: 'Posiblemente ID de entrada incorrecta.' })

        return res.json({
            message: 'Entrada actualizada correctamente',
            ledger
        })

    } catch(error){
        next(error)
    }
}

const deleteEntry = async (req, res, next) => {
    try{
        const { date, entry_id } = req.query

        if (!date) return res.json({ error: 'No date' })
        if (!entry_id) return res.json({ error: 'No entry_id' })

        const MONTH = new Date(date).getMonth()
        const YEAR = new Date(date).getFullYear()
        if (typeof MONTH !== 'number' || typeof YEAR !== 'number') return res.json({ error: 'Invalid date' })

        const newLedger = await Ledger.findOneAndUpdate(
            {
                month: MONTH,
                year: YEAR
            },
            {
                $pull: {
                    entries: { _id: entry_id },
                },
            },
            { new: true }
        );

        return res.json({ message: 'Entrada eliminada', ledger: newLedger })
        
    } catch(error){
        next(error)
    }
}

export {
    newEntry,
    getWeek,
    getMonth,
    getYear,
    getAll,
    updateEntry,
    deleteEntry
}