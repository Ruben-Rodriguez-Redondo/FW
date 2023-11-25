import express from 'express';
import * as boardService from './boardService.js'

const router = express.Router();

router.get('/', (req, res) => {

    res.render('paginaPrincipal', { 
        equipos: boardService.getEquipos()
    });
});

router.get('/subelemento.html', (req, res) => {
    let id = parseInt(req.query.id)
    res.render('subelemento', { 
        equipo: boardService.getEquipo(id),
        id:id
    });
});

router.post("/nuevoSub",(req, res) => {
    //falta poner el if de si todo esta correcto
    //añadir un nuevo jugador al subelemento correspondiente
    let id = parseInt(req.body.id)
    let nuevoSubElemento = {
        nombre : req.body.name,
        edad : req.body.age,
        valor : req.body.value,
    }
    
    let elemento=boardService.getEquipo(id)
    console.log(elemento)
    elemento.subElementos[elemento.subElementos.length] = nuevoSubElemento
    res.render('subelemento', { 
        equipo: boardService.getEquipo(id),
        id : id
    });
});

export default router;