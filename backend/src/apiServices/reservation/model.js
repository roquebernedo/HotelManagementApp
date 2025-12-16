import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ReservationSchema = new Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: "Client"
        },
        checkin: String,
        checkout: String,
        nights: Number,
        room: {
            type: Schema.Types.ObjectId,
            ref: "Room"
        },
        persons: Number,
        paymentStatus: {
            type: Boolean,
            default: true
        },
        paymentDate: { type: String },
        paymentType: { type: String },
        currency: { type: String },
        amount: { type: Number },
        fees: { type: String },
        yapeDetails: { type: String },
        percentage: { type: Number },
        extraPayments: [
            {
                id: { type: String },
                paymentDate: { type: String },
                paymentType: { type: String },
                currency: { type: String },
                amount: { type: Number },
                fees: { type: String },
                yapeDetails: { type: String },
                percentage: { type: Number },
            }
        ],
        total: { type: Number },
        notes: String,
        creator: { type: String },
        editor: { type: String },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true },
        strictPopulate: false
    }
);

export default model("Reservation", ReservationSchema);