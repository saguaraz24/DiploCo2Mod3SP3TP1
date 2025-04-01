//import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30} from "../services/superheroesService.mjs";
import {renderizarSuperheroe, renderizaListaSuperheroes} from '../views/responsiveView.mjs';
//import mongoose from "mongoose";
import SuperHero from "../models/superheroeModel.mjs";
import {crearSuperheroe,actualizarSuperheroe, eliminarSuperheroe, eliminarSuperheroePorNombre} from "../services/superheroesService.mjs"
                                
export async function obtenerSuperheroePorIdController(req,res) {
   try{
        const{id} = req.params;

        // Verifica si el ID es válido antes de hacer la consulta
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ mensaje: "ID no válido para MongoDB" });
        // }
        console.log(`Por ID Requerimiento, ${id}`);
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe)
                {
                return res.status(404).send({mensaje: "Superheroe no encontrado"});

            }
            const superheroeFormateado = renderizarSuperheroe(superheroe);
            res.status(200).json(superheroeFormateado);
        }catch (error) {
            res.status(500).send({mensaje: "Error al obtener el superheroe", error: error.message});

        }
}

export async function obtenerTodosLosSuperheroesController(req,res){
    try{
        const superheroes = await obtenerTodosLosSuperheroes();
        console.log(`Todos los Superheroes Requerimiento` );
        const superheroeFormateados = renderizaListaSuperheroes(superheroes);
        res.status(200).json(superheroeFormateados);
    }catch(error){
        res.status(500).json({mensaje: "Error al obtener los superheroes",error: error.message});
    }
}

export const crearSuperheroeController = async (req, res) => {
try {
    const { nombreSuperHeroe, nombreReal,  edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;
    if (!nombreReal || !nombreSuperHeroe || !edad || !poderes) {
        return res.status(400).json({
            mensaje: "Error al crear el superhéroe",
            error: "Todos los campos son obligatorios"
        });
    }

    // Continuar con la creación del superhéroe
    
        const nuevoSuperheroe = new SuperHero({ 
            nombreSuperHeroe, 
            nombreReal, 
            edad,
            planetaOrigen,
            debilidad,
            poderes,
            aliados,
            enemigos
        });
        await nuevoSuperheroe.save();
        res.status(201).json(nuevoSuperheroe);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el superhéroe",
            error: error.message
        });
    }
};

export const actualizarSuperheroeController = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del superhéroe desde la URL
        const datosActualizados = req.body; // Obtener los datos a actualizar

        // Buscar y actualizar el superhéroe
        const superheroeActualizado = await SuperHero.findByIdAndUpdate(
            id, 
            datosActualizados, 
            { new: true, runValidators: true }
        );

        if (!superheroeActualizado) {
            return res.status(404).json({
                mensaje: "Superhéroe no encontrado",
            });
        }

        res.json(superheroeActualizado);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el superhéroe",
            error: error.message
        });
    }
};

export const eliminarSuperheroeController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`El ID para eliminar es: ${id}`);
        const superheroeEliminado = await eliminarSuperheroe(id);
        if (!superheroeEliminado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        res.json({ mensaje: "Superhéroe eliminado exitosamente", superheroeEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
};

export const eliminarSuperheroePorNombreController = async (req, res) => {
     // Depuración: Verificar el valor del parámetro recibido
     console.log("Todos los Superheroes Requerimiento");
     console.log("Parámetros recibidos: ", req.params); 
     
    try {
       
        const { nombre } = req.params;
        console.log("El nombre para eliminar es:", nombre);
        if (!nombre) {
            return res.status(400).json({ mensaje: "Debe proporcionar un nombre de superhéroe" });
        }
        //console.log(`El nombre para eliminar es: ${nombreSuperHeroe}`);
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        res.json({ mensaje: "Superhéroe eliminado exitosamente", superheroeEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
};

export async function buscarSuperheroesPorAtributoController(req,res){
    try{
        console.log("Entrando al controlador");
        const {atributo,valor}=req.params;
        console.log(`Buscando atributo/ valor  ${atributo} = ${valor}`);
        const superheroes=await buscarSuperheroesPorAtributo(atributo,valor);
        if(superheroes.length===0){
            return res.status(404).send(
                {mensaje: "No se encontraron superheroes con ese atributo"});
            }
        const superheroesFormateados = renderizaListaSuperheroes(superheroes); 
        res.status(200).json(superheroesFormateados);
    }catch(error){
        res.status(500).json({mensaje: "Error al buscar los superheroes",error: error.message});
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res){
    try{
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length === 0){
            return res.status(404).send(
                {mensaje: "No se encontraron super Heroes mayores de 30 años"});
            }
            const superheroeFormateados = renderizaListaSuperheroes(superheroes);
            res.status(200).json(superheroeFormateados);
        }catch(error){
            res.status(500).send(
                {mensaje: "Error al obtener superheroe mayores de 30", error: error.message});
                
            }
        }
 