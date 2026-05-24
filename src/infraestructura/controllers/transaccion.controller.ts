import { Response } from 'express'
import { z } from 'zod'
import { Transaccion } from '../database/models/Transaccion'
import { CrearTransaccion } from '../validators/transaccion.validator'
import { RequestConUsuario } from '../middlewares/auth.middleware'

export const crearTransaccion = async (req: RequestConUsuario,res: Response): Promise <void> =>{
    try{
        //Validar datos con zod
        const datos = CrearTransaccion.parse(req.body)

        //Crear transaccion asociada al usuario
        const transaccion = await new Transaccion({
            ...datos,
            userId: req.usuarioId
        }).save() as any
        res.status(201).json({ transaccion })
    }catch(error){
        //Muestro errores por campo
                if(error instanceof z.ZodError){
                    const errores = error.issues.reduce((acc,issue) => {
                        const campo = issue.path [0] as string
                        acc[campo] = issue.message
                        return acc
                    }, {} as Record <string,string>)
                    res.status(400).json({errores})
                    return
                }
                //Error no manejado
                res.status(500).json({ mensaje: 'Error en el servidor'})

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