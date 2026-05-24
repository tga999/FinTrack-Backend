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
    fecha: z.string().or(z.date())
})