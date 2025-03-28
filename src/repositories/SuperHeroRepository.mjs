//import superHero from "../models/superheroeModel.mjs";
import SuperHero from "../models/superheroeModel.mjs";
import IRepository from "./IRepository.mjs";
class SuperHeroRepository extends IRepository{
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async crearSuperHeroe(datosSuperheroe){
        const nuevoSuperheroe = new SuperHero(datosSuperheroe);
        return await SuperHero.save()
    }

    async buscarPorAtributo(atributo, valor){
        return await SuperHero.find({[atributo]: valor});
    }

    async obtenerMayoresDe30(){
        return await SuperHero.find({edad:{$gt:30}});
    }

}
export default new SuperHeroRepository();
