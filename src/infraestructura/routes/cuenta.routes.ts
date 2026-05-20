import { Router } from 'express'
import { crearCuenta, obtenerCuentas } from '../controllers/cuenta.controller'
import { verificarToken } from '../middlewares/auth.middleware'


const router=Router()

//todas las rutas de cuentas estan protegidas
router.post('/', verificarToken, crearCuenta)
router.get('/', verificarToken, obtenerCuentas)

export default router