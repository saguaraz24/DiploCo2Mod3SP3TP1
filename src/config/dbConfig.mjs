import mongoose, { connect } from "mongoose"

export async function connectDB(){
    try{
        await mongoose.connect('mongodb+srv://Grupo-14:grupo14@cursadanodejs.ls9ii.mongodb.net/Node-js');
        console.log('Conexión exitosa a MongoDB');
    }catch(error){
        console.error('Error al conectar a MongoDB:',error);
        process.exit(1);
}
}