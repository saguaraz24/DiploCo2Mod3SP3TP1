import express, { request } from 'express';
import {
    obtenerSuperheroePorIdController,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroeController,
    eliminarSuperheroePorNombreController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller
} from '../controllers/superheroesController.mjs';
//import { obtenerSuperheroesMayoresDe30 } from '../services/superheroeService.mjs';

const router = express.Router();
router .get('/heroes', obtenerTodosLosSuperheroesController);
router .post(`/heroeNuevo`, crearSuperheroeController);
router.put("/heroesac/:id", actualizarSuperheroeController);
router.delete("/heroesdel/:id", eliminarSuperheroeController);
router.delete("/heroesdelnom/:nombre", eliminarSuperheroePorNombreController);
router .get('/heroesid/:id', obtenerSuperheroePorIdController);
router .get('/heroesat/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router .get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
export default router;

