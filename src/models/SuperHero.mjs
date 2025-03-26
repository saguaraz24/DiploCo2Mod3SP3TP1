import mongoose from "mongoose";

const superheroSchema=new mongoose.Schema({

    id:{type:Number},
    nombreSuperHeroe: {type:String, required:true},
    nombreReal:{type: String, required:true},
    edad:{type:Number, min:0},
    planetaOrigen: {type: String, default:"Desconocido"},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos:[String],
    createdAt: {type:Date,default:Date.now},
    creador:{type:String, default:'Sebastián Guaraz'}
});
const superHero = mongoose.model('SuperHero', superheroSchema, "Grupo-14");
export default superHero

