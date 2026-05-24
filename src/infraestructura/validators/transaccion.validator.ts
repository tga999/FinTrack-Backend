import { z } from 'zod'

export const CrearTransaccion = z.object({
    tipo: z.enum(['ingreso','gasto'],{
            error: 'Tipo de cuenta invalido'
    }),
    monto: z.number()
        .min(0, 'El monto no puede ser negativo'),
    descripcion:z.string().trim()
        .min(4,'Debe tener mas de 4 caracteres')
        .max(40,'Debe tener meno de 40 caracteres'),
    fecha: z.string().or(z.date()),
    cuentaId: z.string().min(1, 'La cuenta es requerida'),
    categoriaId: z.string().min(1, 'La categoría es requerida'),
    // campos opcionales para cuotas
    esCuotas: z.boolean().optional(),
    cantidadCuotas: z.number().min(2, 'Debe tener al menos 2 cuotas').optional()
})