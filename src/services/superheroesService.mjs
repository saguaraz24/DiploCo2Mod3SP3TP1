import superHeroRepository from "../repositories/SuperHeroRepository.mjs"; 
import SuperHero from "../models/superheroeModel.mjs";

export async function obtenerSuperheroePorId(id){
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

//import SuperHero from "../models/superheroeModel.mjs";

export const crearSuperheroe = async (data) => {
    try {
        // Validar que se envían los datos correctos
        if (!data.nombreReal || !data.nombreSuperHeroe || !data.edad || !data.poderes) {
            throw new Error("Todos los campos son obligatorios");
        }

        const nuevoSuperheroe = new SuperHero({
            nombreSuperHeroe: data.nombreSuperHeroe,
            nombreReal: data.nombreReal,
            edad: data.edad,
            planetaOrigen: data.planetaOrigen,
            debilidad: data.debilidad,
            poderes: data.poderes,
            aliados: data.aliados,
            enemigos: data.enemigos
        });

        await nuevoSuperheroe.save();
        return nuevoSuperheroe;
    } catch (error) {
        throw new Error("Error al crear el superhéroe: " + error.message);
    }
};

export const actualizarSuperheroe = async (id, datosActualizados) => {
    try {
        const superheroeActualizado = await SuperHero.findByIdAndUpdate(
            id, 
            datosActualizados, 
            { new: true, runValidators: true }
        );

        return superheroeActualizado;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const eliminarSuperheroe = async (id) => {
    try {
        const superheroeEliminado = await SuperHero.findByIdAndDelete(id);
        console.log(`Se encontró el id a eliminar ${id}`);
        return superheroeEliminado;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const eliminarSuperheroePorNombre = async (nombreSuperHeroe) => {
    try {
        console.log("Buscando el superhéroe con nombre:", nombreSuperHeroe); // 🛠 Depuración
        const superheroeEliminado = await SuperHero.findOneAndDelete({nombreSuperHeroe});
        //console.log(`Se encontró el nombre a eliminar ${nombreSuperHeroe}`);
        if (!superheroeEliminado) {
            console.log(`No se encontró un superhéroe con el nombre: ${nombre}`);
        }
        return superheroeEliminado;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function buscarSuperheroesPorAtributo(atributo,valor) {
    return await superHeroRepository.buscarPorAtributo(atributo,valor);
    //return superHeroRepository.buscarPorAtributo({[atributo]: valor});
}

export async function obtenerSuperheroesMayoresDe30(atributo,valor) {
    return await superHeroRepository.obtenerMayoresDe30();
}
