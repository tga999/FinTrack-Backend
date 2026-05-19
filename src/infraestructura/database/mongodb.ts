import mongoose from 'mongoose';

// funcion para conectar a la base de datos
export const connectDB = async (url: string) : Promise<void> => {
    // Conectar a la base de datos usando mongoose
    try{
        await mongoose.connect(url);
        console.log('Connectado a MongoDB');
    }
    // Si hay error mostrar el error y salir del proceso
    catch (error){
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
}
