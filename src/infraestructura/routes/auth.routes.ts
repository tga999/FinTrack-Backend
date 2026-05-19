import { Router } from 'express'
import { registro, login } from '../controllers/auth.controller'
import { verificarToken, RequestConUsuario } from '../middlewares/auth.middleware'


const router = Router()

//Rutas de autenticación
router.post('/registro', registro)
router.post('/login',login)

//Ruta protegida

router.get('/perfil', verificarToken, (req: RequestConUsuario, res) => {
    res.json({mensaje: 'Ruta protegida', usuarioId: req.usuarioId})
})

export default router

