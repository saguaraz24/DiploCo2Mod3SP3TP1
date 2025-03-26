//import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";
import { obtenerSuperheroePorId,obtenerTodosLosSuperheroes,buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30 } from "../services/superheroesService.mjs";
import {renderizarSuperheroe, renderizaListaSuperheroes} from '../views/responsiveView.mjs';
//import mongoose from "mongoose";
                                
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
 