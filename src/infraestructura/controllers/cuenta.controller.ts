import { Response } from 'express'
import { z } from 'zod'
import { Cuenta } from '../database/models/Cuenta'
import { User } from '../database/models/User'
import { CrearCuenta } from '../validators/cuenta.validator'
import { RequestConUsuario } from '../middlewares/auth.middleware'

export const crearCuenta = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    // validar datos con Zod
    const datos = CrearCuenta.parse(req.body)

    // crear la cuenta asociada al usuario
    const cuenta = await new Cuenta({
      ...datos,
      userId: req.usuarioId
    }).save() as any

    // agregar la cuenta al array de cuentas del usuario
    await User.findByIdAndUpdate(req.usuarioId, {
      $push: { cuentas: cuenta._id }
    })

    res.status(201).json({ cuenta })
  } catch (error) {
    // mostrar errores por campo si vienen de Zod
    if (error instanceof z.ZodError) {
      const errores = error.issues.reduce((acc, issue) => {
        const campo = issue.path[0] as string
        acc[campo] = issue.message
        return acc
      }, {} as Record<string, string>)
      res.status(400).json({ errores })
      return
    }
    // error no manejado
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const obtenerCuentas = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    // obtiene solo las cuentas del usuario logueado
    const cuentas = await Cuenta.find({ userId: req.usuarioId })
    res.status(200).json({ cuentas })
  } catch (error) {
    // error no manejado
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}