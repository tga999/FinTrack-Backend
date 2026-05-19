import { z } from 'zod'

//ESQUEMAS CON ZOD Y EXPORT
export const UserRegister = z.object({
    nombre: z.string().trim()
    .min(3, 'Debe contener más de 3 caracteres')
    .max(40, 'Debe contener menos de 40 caracteres'),
    apellido: z.string().trim()
    .min(3, 'Debe contener más de 3 caracteres')
    .max(40, 'Debe contener menos de 40 caracteres'),
    email: z.email('Email inválido'),
    password: z.string()
    .min(8, 'Debe contener mínimo 8 caracteres')
    .max(100, 'Debe contener menos de 100 caracteres')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe tener al menos un número')
})

export const UserLogin = z.object({
    email: z.email('Email invalido'),
    password: z.string().min(1,'Contraseña invalida'),
})

