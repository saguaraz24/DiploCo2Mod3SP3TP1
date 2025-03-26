import express, { request } from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller
} from '../controllers/superheroesController.mjs';
//import { obtenerSuperheroesMayoresDe30 } from '../services/superheroeService.mjs';

const router = express.Router();
router .get('/heroes', obtenerTodosLosSuperheroesController);
router .get('/heroesid/:id', obtenerSuperheroePorIdController);
router .get('/heroesat/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router .get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
export default router;

