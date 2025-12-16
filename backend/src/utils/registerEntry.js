import Client from "../apiServices/client/model.js";
import Ledger from "../apiServices/ledger/model.js";

const saveEntries = async (template, date, extraPayments = false) => {
    const entry = { ...template }
    console.log("linea 5 registerEntry.js")
    console.log(entry)

    const MONTH = new Date(date).getMonth()
    const YEAR = new Date(date).getFullYear()

    const ledger = await Ledger.findOne({
        month: MONTH,
        year: YEAR
    })
    console.log(ledger)
    if(ledger){
        ledger.entries.push(entry)
        await ledger.save()
    }else{
        console.log("line 21 creating ledger")
        await Ledger.create({
            month: MONTH,
            year: YEAR,
            entries: [entry]
        })
    }
    console.log("se creo el ledger 28")
    console.log(ledger)
    if(extraPayments && !!extraPayments?.length){
        for (let i = 0; i < extraPayments.length; i++){
            const e = extraPayments[i]

            if(date === e.paymentDate){
                entry.date = date
                entry.description = `${entry.description.split('-')[0]} - Pago #${i + 2}`
                entry.paymentType = e.paymentType
                entry.amount = e.amount
                entry.currency = e.currency

                ledger.entries.push(entry)
            }else{
                const MONTH = new Date(e.paymentDate).getMonth()
                const YEAR = new Date(e.paymentDate).getFullYear()

                const otherLedger = await Ledger.findOne({
                    month: MONTH,
                    year: YEAR
                })

                entry.date = e.paymentDate
                entry.description = `${entry.description.split('-')[0]} - Pago #${i + 2}`
                entry.paymentType = e.paymentType
                entry.amount = e.amount
                entry.currency = e.currency

                if(otherLedger){
                    otherLedger.entries.push(entry)
                    await otherLedger.save()
                }else{
                    await Ledger.create({
                        month: MONTH,
                        year: YEAR,
                        entries: [entry]
                    })
                }
            }
        }
        console.log("llego hasta el save ledger 69")
        await ledger.save()
    }
}

export const registerEntry = async (data, creator, reservation) => {
    const {
        client,
        amount,
        currency,
        paymentDate,
        paymentType,
        extraPayments
    } = data 
    console.log(data)
    console.log("linea 17 de registerEntry.js")
    const clientData = await Client.findById(client)
    console.log(clientData)
    console.log(extraPayments)
    const entry = {
        date: paymentDate,
        entryType: 'income',
        description: `Reserva de ${clientData.name} (${clientData.nationality})${!!extraPayments?.length ? ' - Pago #1' : ''}`,
        paymentType,
        amount,
        currency,
        reservation,
        creator
    }

    console.log(entry)

    await saveEntries(entry, paymentDate, extraPayments)

    return
}