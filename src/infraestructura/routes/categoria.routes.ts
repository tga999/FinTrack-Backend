import { Router } from 'express'
import { crearCategoria, obtenerCategorias } from '../controllers/categoria.controller'
import { verificarToken } from '../middlewares/auth.middleware'

const router = Router()

//Rutas protegidas
router.post('/', verificarToken, crearCategoria)
router.get('/', verificarToken, obtenerCategorias)

export default router

