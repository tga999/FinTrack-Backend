import mongoose, { Schema } from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    icono: {
        type: String
    }
}, { timestamps: true });

export const Categoria = mongoose.model('Categoria', CategoriaSchema);
