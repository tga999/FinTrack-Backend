import dotenv from 'dotenv'

// Carga las variables de entorno desde el archivo .env
dotenv.config()
export const ENV={
    // Si no se encuentra la variable de entorno PORT, se asigna el valor 3000 por defecto
    PORT: Number(process.env.PORT) || 3000,
    // Si no se encuentra la variable de entorno MONGODB_URL, se asigna el valor 'mongodb://localhost:27017/fintrack' por defecto
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/fintrack',
    //Clave jwt
    JWT_SECRET: process.env.JWT_SECRET  || 'secret',
}
