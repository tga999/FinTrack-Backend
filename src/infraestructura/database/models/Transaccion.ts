import mongoose ,{ Schema } from 'mongoose';

const TransaccionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cuentaId: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    categoriaId: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Ingreso', 'Gasto']
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String
    }
}, { timestamps: true });

export const Transaccion = mongoose.model('Transaccion', TransaccionSchema);