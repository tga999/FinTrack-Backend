import { Response } from 'express'
import { z } from 'zod'
import { Categoria } from '../database/models/Categoria'
import { CrearCategoria } from '../validators/categoria.validator'
import { RequestConUsuario } from '../middlewares/auth.middleware'

export const crearCategoria = async (req: RequestConUsuario,res: Response): Promise <void> =>{
    try{
        //Valido datos con zod
        const datos = CrearCategoria.parse(req.body)

        //Crear categoria asociada al usuario
        const categoria = await Categoria.create({
            ...datos,
            userId: req.usuarioId
        })
        res.status(201).json({ categoria })
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
        res.status(600).json({ mensaje: 'Error en el servidor'})
    }
}
export const obtenerCategorias = async (req: RequestConUsuario,res: Response): Promise <void> =>{
    try{
        //obtener categorias del usuario logueado
        const categorias = await Categoria.find({userId: req.usuarioId})
        res.status(200).json({categorias})
    }catch(error){
        //error no manejado
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}