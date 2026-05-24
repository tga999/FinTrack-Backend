import mongoose, { Schema } from 'mongoose'

// esquema de cada cuota individual
const CuotaSchema = new Schema({
  numero: {
    type: Number,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  pagada: {
    type: Boolean,
    default: false
  },
  fechaVencimiento: {
    type: Date,
    required: true
  }
})

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
    enum: ['ingreso', 'gasto']
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
  },
  // campos opcionales para cuotas
  esCuotas: {
    type: Boolean,
    default: false
  },
  cantidadCuotas: {
    type: Number
  },
  cuotas: [CuotaSchema]

}, { timestamps: true })

export const Transaccion = mongoose.model('Transaccion', TransaccionSchema)