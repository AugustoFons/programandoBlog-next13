import mongoose from "mongoose";

let isConnected = false; //rastrear el estado de la conexion

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); //evita advertencias en la consola

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'blog_dev',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}