import express from 'express';
import * as boardService from './boardService.js'

const router = express.Router();

router.get('/', (req, res) => {

    res.render('paginaPrincipal', { 
        equipos: boardService.getEquipos()
    });
});

router.get('/subelemento.html', (req, res) => {

    res.render('subelemento', { 
        equipos: boardService.getEquipos()
    });
});


export default router;