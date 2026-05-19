import { Server } from './infraestructura/server/server'
import { ENV } from './infraestructura/config/env'
import { connectDB } from './infraestructura/database/mongodb'




// Conectar a la base de datos y luego iniciar el servidor
const main = async () => {
    await connectDB(ENV.MONGODB_URL)
    const server = new Server(ENV.PORT)
    server.start()
}

main().catch(console.error)







