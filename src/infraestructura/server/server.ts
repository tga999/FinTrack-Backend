import express, { Application } from 'express'
import authRoutes from '../routes/auth.routes'
import cuentaRoutes from '../routes/cuenta.routes'
import categoriaRoutes from '../routes/categoria.routes'

//Clase para configurar el servidor Express
export class Server{
    private app: Application
    private port: number

    // Constructor para inicializar el servidor con el puerto especificado
    constructor(port: number){
        this.app = express()
        this.port = port
        this.middlewares()
        this.routes()
    }
    // Método para configurar los middlewares del servidor
    private middlewares(): void {
        this.app.use(express.json())
    }
    // Método para definir las rutas del servidor
    private routes(): void {
        this.app.use('/api/auth', authRoutes)
        this.app.use('/api/cuentas', cuentaRoutes)
        this.app.use('/api/categorias',categoriaRoutes)
    }
    // Método para arrancar el servidor
    public start(): void {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en http://localhost:' + this.port)
        })
    }
}
