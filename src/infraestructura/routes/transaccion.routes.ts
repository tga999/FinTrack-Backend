import  { Router } from 'express'
import { crearTransaccion, obtenerTransaccion, pagarCuota } from '../controllers/transaccion.controller'
import { verificarToken } from '../middlewares/auth.middleware'


const router = Router()

//Rutas protegidas
router.post('/', verificarToken, crearTransaccion)
router.get('/', verificarToken, obtenerTransaccion)
router.patch('/:id/cuotas/:numeroCuota', verificarToken, pagarCuota)

export default router

