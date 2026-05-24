import  { Router } from 'express'
import { crearTransaccion, obtenerTransaccion } from '../controllers/transaccion.controller'
import { verificarToken } from '../middlewares/auth.middleware'

const router = Router()

//Rutas protegidas
router.post('/', verificarToken, crearTransaccion)
router.get('/', verificarToken, obtenerTransaccion)

export default router

