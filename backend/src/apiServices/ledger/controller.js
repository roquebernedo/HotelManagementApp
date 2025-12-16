import Ledger from "./model.js"
import Reservation from "../reservation/model.js";

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

export {
    newEntry
}