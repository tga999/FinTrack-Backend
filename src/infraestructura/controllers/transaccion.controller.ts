import { Response } from 'express'
import { z } from 'zod'
import { Transaccion } from '../database/models/Transaccion'
import { CrearTransaccion } from '../validators/transaccion.validator'
import { RequestConUsuario } from '../middlewares/auth.middleware'

export const crearTransaccion = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    const datos = CrearTransaccion.parse(req.body)

    // si es en cuotas, generamos el array automáticamente
    let cuotas: {numero: number, monto: number, pagada: boolean, fechaVencimiento: Date}[] = []
    if (datos.esCuotas && datos.cantidadCuotas) {
      const montoPorCuota = Math.round(datos.monto / datos.cantidadCuotas)
      const fechaBase = new Date(datos.fecha)

      cuotas = Array.from({ length: datos.cantidadCuotas }, (_, i) => {
        const fechaVencimiento = new Date(fechaBase)
        fechaVencimiento.setMonth(fechaVencimiento.getMonth() + i)
        return {
          numero: i + 1,
          monto: montoPorCuota,
          pagada: false,
          fechaVencimiento
        }
      })
    }

    const transaccion = await new Transaccion({
      ...datos,
      userId: req.usuarioId,
      cuotas
    }).save() as any

    res.status(201).json({ transaccion })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errores = error.issues.reduce((acc, issue) => {
        const campo = issue.path[0] as string
        acc[campo] = issue.message
        return acc
      }, {} as Record<string, string>)
      res.status(400).json({ errores })
      return
    }
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const obtenerTransaccion = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    // obtiene solo las transacciones del usuario logueado
    const transacciones = await Transaccion.find({ userId: req.usuarioId })
    res.status(200).json({ transacciones })
  } catch (error) {
    // error no manejado
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const pagarCuota = async (req: RequestConUsuario, res: Response): Promise<void> => {
  try {
    const { id, numeroCuota } = req.params

    // busca la transacción y marca la cuota como pagada
    const transaccion = await Transaccion.findOneAndUpdate(
      { _id: id, userId: req.usuarioId, 'cuotas.numero': Number(numeroCuota) },
      { $set: { 'cuotas.$.pagada': true } },
      { new: true } // devuelve el documento actualizado
    )

    if (!transaccion) {
      res.status(404).json({ mensaje: 'Transacción o cuota no encontrada' })
      return
    }

    res.status(200).json({ transaccion })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}