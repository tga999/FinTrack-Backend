import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cuentas: [{
    type: Schema.Types.ObjectId,
    ref: "Cuenta"
    }]

}, { timestamps: true});

export const User = mongoose.model("User", UserSchema);
