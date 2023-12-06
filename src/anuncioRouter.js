import express from 'express';
import * as boardService from './boardService.js';


const router = express.Router();

function validEntry(nombre,edad,valor){
    let valorNum = parseFloat(valor)
    let edadNum=parseInt(edad)
    if(nombre=="" || edad=="" || valor==""){
        return 1
    }
    if(isNaN(valorNum)||typeof valorNum !=='number'){
        return 2
    }
    if(isNaN(edadNum) || !Number.isInteger(edadNum)){
        return 3
    }
    return 0
}

function check(escudo, nombreEquipo, fCreacion, titulos, estadio, estilo){
    let creacionNum = parseInt(fCreacion);
    let titulosNum = parseInt(titulos);
    if(escudo=="" || nombreEquipo=="" || fCreacion=="" || titulos =="" || estadio =="" || estilo== ""){
        return 1
    }
    else if(isNaN(creacionNum) || !Number.isInteger(creacionNum) || creacionNum < 0 || creacionNum > 2024){
        return 2
    }
    else if (isNaN(titulosNum) || !Number.isInteger(titulosNum) || titulosNum < 0){
        return 3
    }
    return 0
}

router.get('/', (req, res) => {
    
    let [col1,col2,solitario] = boardService.getColumnas();
    res.render('paginaPrincipal', { 
        col1,
        col2,
        solitario
    
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
    let mensaje=""
    let id=parseInt(req.body.id)
    //añadir un nuevo jugador al subelemento correspondiente
    let flag = validEntry(req.body.name,req.body.age,req.body.value)
    if(flag==0){
        mensaje="Se ha actualizado la pagina"
        id = parseInt(req.body.id)
        let nuevoSubElemento = {
            nombre : req.body.name,
            edad : req.body.age,
            valor : req.body.value,
        }
    
        let elemento=boardService.getEquipo(id)
        elemento.subElementos[elemento.subElementos.length] = nuevoSubElemento
    }
    else  if(flag==1){
        mensaje="Rellene todos los campos"
    }
    else if(flag==2){
        mensaje="El valor debe ser un número"
    }
    else{
        mensaje="La edad debe ser un número entero"
    }
    
    res.render('paginaIntermedia', { 
        id : id,
        mensaje: mensaje
    });
});

router.post("/subelemento/new",(req,res) => {
    let { escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo,champion } = req.body;
    let flag = check(escudo, nombreEquipo, fCreacion, titulos, estadio, estilo);
    let mensaje = "";
    if (flag == 0){
    boardService.addEquipo({ escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo, champion });
    mensaje = "Equipo creado correctamente."
    }
    else  if(flag==1){
        mensaje="Rellene todos los campos."
    }
    else if(flag==2){
        mensaje="El año de creación debe ser un número entero positivo y no superior a 2024."
    }
    else{
        mensaje="El número de títulos debe ser un número entero positivo."
    }
    res.render('savedTeam', { 
        mensaje: mensaje
    });
});

router.post("/borrar",(req, res) => {
    
    boardService.deleteEquipo(parseInt(req.body.id))
    let [col1,col2,solitario] = boardService.getColumnas();
    res.render('paginaPrincipal', { 
        col1,
        col2,
        solitario
    
    });
});

router.get('/paginaEditar.html', (req, res) => {
    let id = parseInt(req.query.id)
    res.render('editarElemento', { 
        equipo: boardService.getEquipo(id),
        id:id
    });
});


router.post("/subelemento/edit",(req,res) => {
    console.log(req.body)
    let { id, escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo,champion } = req.body;
    let flag = check(escudo, nombreEquipo, fCreacion, titulos, estadio, estilo);
    let mensaje = "";
    if (flag == 0){
        let equipo = boardService.getEquipo(parseInt(id))   
        equipo = { escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo, champion }
        boardService.editEquipo(parseInt(id),equipo)
    mensaje = "Equipo editado correctamente."
    }
    else  if(flag==1){
        mensaje="Rellene todos los campos."
    }
    else if(flag==2){
        mensaje="El año de creación debe ser un número entero positivo y no superior a 2024."
    }
    else{
        mensaje="El número de títulos debe ser un número entero positivo."
    }
    res.render('editedTeam', { 
        mensaje: mensaje,
        id: parseInt(id)
    });
});
export default router;