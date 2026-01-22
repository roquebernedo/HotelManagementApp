import Reservation from '../reservation/model.js'
import Ledger from '../ledger/model.js'

const test = async (req, res, next) => {
    try{
        console.log("este es el test de statistics")
        const bookings = await Reservation.aggregate([
            {
                $group: {
                    _id: {
                        month: {
                            $month: '$createdAt'
                        },
                        year: {
                            $year: '$createdAt'
                        }
                    },
                    totalBookings: { $sum: 1 },
                }
            }
        ])
        console.log(bookings)
        const hostings = await Reservation.aggregate([
            {
                $group: {
                    _id: {
                        month: {
                            $month: {
                                $dateFromString: {
                                    dateString: '$checkin'
                                }
                            }
                        },
                        year: {
                            $year: {
                                $dateFromString: {
                                    dateString: '$checkin'
                                }
                            }
                        }
                    },
                    totalHostings: { $sum: 1 },
                    totalGuests: { $sum: '$persons' }
                }
            }
        ])
        console.log(hostings)
        const income = await Ledger.aggregate([
            { $unwind: "$entries" },
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year",
                    },
                    reservsIncome: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        "$entries.reservation",
                                        { "$eq": ["$entries.currency", "PEN"] },
                                    ]
                                },
                                "$entries.amount",
                                0
                            ],
                        }
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [
                                {
                                    "$eq": ["$entries.currency", "PEN"]
                                },
                                "$entries.amount",
                                0
                            ],
                        }
                    }
                }
            }
        ])
        console.log(income)

        const averageBookings = bookings.reduce(
            (total, curr) => total + curr.totalBookings, 0
        ) / bookings.length
        console.log(averageBookings)
        const averageHostings = hostings.reduce(
            (total, curr) => total + curr.totalHostings, 0
        ) / hostings.length
        console.log(averageHostings)
        const averageReservIncome = income.reduce(
            (total, curr) => total + curr.reservsIncome, 0
        ) / income.length
        console.log(averageReservIncome)
        const averageIncome = income.reduce(
            (total, curr) => total + curr.totalIncome, 0
        ) / income.length
        console.log(averageIncome)

        const aux = {
            bookings,
            averageBookings,
            hostings,
            averageHostings,
            income,
            averageReservIncome,
            averageIncome
        }

        res.json(aux)
        
    } catch(error){
        next(error)
    }
}

const getMonth = async (req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
}

export {
    test,
    getMonth
}