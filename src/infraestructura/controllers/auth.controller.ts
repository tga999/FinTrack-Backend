import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../database/models/User'
import { UserRegister, UserLogin } from '../validators/userValidator'
import { ENV } from '../config/env'
import { z } from 'zod'



export const registro = async (req: Request, res: Response): Promise <void> =>{
    try{
        //valida datos con zod
        const datos = UserRegister.parse(req.body)

        //verifica mail
        const usuarioExiste = await User.findOne({email: datos.email})
        if (usuarioExiste){
            res.status(400).json({
                mensaje: 'El email ya está registrado'
            }) 
            return
        }    
        //Encriptar password
        const passwordHash = await bcrypt.hash(datos.password,10)

        //Crear el usuario
        const usuario = await User.create({
            ...datos,
            password: passwordHash
        })

        //Token
        const token = jwt.sign({ id: usuario._id}, ENV.JWT_SECRET,{ expiresIn: '7d'})
        res.status(201).json({
            token,
            usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email}
        })
    } catch (error) {
        //Muestra error por error si es que hay
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    errores: error.issues.map(e => e.message)
                })
            return
        }
            res.status(500).json({ mensaje: 'Error en el servidor' })
    }
}

export const login = async(req: Request, res: Response):Promise <void> =>{
    try{
    //Validar con zod
    const datos = UserLogin.parse(req.body)

    //Verificar si el usuario existe
    const usuario = await User.findOne({email: datos.email})
    if(!usuario){
        res.status(400).json({mensaje: 'Email o contraseña incorrecto'})
        return
    }
    //Comparar contraseña
    const passwordValida = await bcrypt.compare(datos.password, usuario.password)
    if(!passwordValida){
        res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })
        return
    }

    // generar el token
    const token = jwt.sign({ id: usuario._id }, ENV.JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } })

  } catch (error) {
        if (error instanceof z.ZodError) {
            //Muestra error por error si es que hay
            res.status(400).json({
                errores: error.issues.map(e => e.message)
            })
        return
    }
        res.status(500).json({ mensaje: 'Error en el servidor' })
    }
}
