import mongoose, { Schema } from 'mongoose';

const CuentaSchema = new mongoose.Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['efectivo', 'credito', 'transferencia','debito', 'otro']
    },
    saldo: {
        type: Number,
        required: true,
        default: 0
    }
    
}, { timestamps: true });

export const Cuenta = mongoose.model('Cuenta', CuentaSchema);