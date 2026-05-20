import { z } from 'zod'

export const CrearCuenta = z.object({
    nombre: z.string().trim()
        .min(3,'Debe contener mas de 3 caracteres ')
        .max(40,'Debe contener menos de 40 caracteres'),
    tipo: z.enum(['efectivo','debito','credito','transferencia','otro'],{
        error: 'Tipo de cuenta invalido'
    }),
    saldo: z.number()
        .min(0,'El saldo no puede ser negativo')
})