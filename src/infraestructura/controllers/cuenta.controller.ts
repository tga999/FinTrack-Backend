import e, { Response } from 'express'
import { z } from 'zod'
import { Cuenta } from '../database/models/Cuenta'
import { User } from '../database/models/User'
import { CrearCuenta } from '../validators/cuenta.validator'
import { RequestConUsuario } from '../middlewares/auth.middleware'

export const crearCuenta = async (req: RequestConUsuario, res: Response):Promise<void> =>{
    try{
        const datos = CrearCuenta.parse(req.body)

        //Crear cuenta asociada al usuario
        const cuenta = await new Cuenta({
            ...datos,
            userId: req.usuarioId
        }).save() as any

        //Agregar la cuenta al array de cuentas del usuario
        await User.findByIdAndUpdate(req.usuarioId,{ 
            $push:{ cuentas: cuenta._id}}
        )
        res.status(201).json({ cuenta })
    }catch(error){
        console.log(error)
        if(error instanceof z.ZodError){
            res.status(400).json({ errores: error.issues.map(e=> e.message)})
            return
        }
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}

export const obtenerCuentas = async(req: RequestConUsuario, res:Response):Promise<void>=>{
    try{
        //Obtiene cuenta por el Id del usuario
        const cuentas = await Cuenta.find({ userId:req.usuarioId})
        res.status(200).json({cuentas})
    }catch(error){
        console.log(error)
        //Si no la encuentra tira error
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}