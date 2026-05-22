import { z } from 'zod'

export const CrearCategoria = z.object({
    nombre: z.string().trim()
        .min(3,'Debe contener mas de 3 caracteres')
        .max(40,'Debe contener menos de 40 caracteres'),
    icono: z.string().optional()
})