import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env'

//extiende el tipo request para agregar el usuario decodificado
export interface RequestConUsuario extends Request{
    usuarioId?: string
}

export const verificarToken = (req: RequestConUsuario, res:Response, next: NextFunction): void => {
    try{
        //obtener token del header
        const token= req.headers.authorization?.split(' ')[1]
        //Si es distintio dropear el mensaje
        if(!token){
            res.status(401).json({mensaje: 'Token no proporcionado'})
            return
        }
        //verificar y decodificar token
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as {id: string}
        req.usuarioId = decoded.id
        next()
    }catch(error){
        res.status(401).json({mensaje: 'Token invalido o expirado'})
    }
} 

