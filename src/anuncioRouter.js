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

function URLValido(url){
    const urlTipo = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return urlTipo.test(url);
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
    else if (!URLValido(escudo)){
        return 4
    }
    return 0
}

router.get('/', (req, res) => {
    res.render('paginaPrincipalAJAX', { 
       
    });
    
   
});

router.get('/datos-iniciales', (req, res) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);
    // Aquí puedes realizar cualquier lógica para obtener los datos iniciales
    // Puedes usar una base de datos, archivos, o cualquier otro método.
    const datosIniciales = {
      elementos: boardService.iniciales(from,to),
      // Otros datos
    };
  
    res.json(datosIniciales);
});
router.get('/busqueda', (req, res) => {
    const buscar= req.query.buscar;
   
    // Aquí puedes realizar cualquier lógica para obtener los datos iniciales
    // Puedes usar una base de datos, archivos, o cualquier otro método.
    const matches= {
      elementos: boardService.busqueda(buscar),
      // Otros datos
    };
  
    res.json(matches);
});
router.get('/availableUsername', (req, res) => {

    let username = req.query.username.trim();

    let availableUsername = boardService.aNombreEquipos().indexOf(username) === -1;

    let response = {
        available: availableUsername
    }

    res.json(response);
});

router.get('/reAvailableUsername', (req, res) => {

    let username = req.query.username.trim();
   
    let id = parseInt(req.query.id);
    
    let availableUsername = (boardService.aNombreEquipos().indexOf(username) === -1) 
                            || (boardService.getEquipo(id).nombreEquipo === username);

    let response = {
        available: availableUsername
    }

    res.json(response);
});

router.get('/availableDescripcion', (req, res) => {
    let descripcion = req.query.descripcion;
    let num = 0
    if (descripcion.length < 50){
        num = 1
    }else if (descripcion.length > 500){
        num = 2
    }
    let response = {
        flag: num
    }
    res.json(response);
});

router.get('/availableEscudo', (req, res) => {
    let escudo = req.query.escudo;
    
    let response = {
        available: URLValido(escudo)
    }
    res.json(response);
});

router.get('/availablefCreacion', (req, res) => {
    let fCreacion = req.query.fCreacion;
    let num = 0;
    let año = parseInt(fCreacion);
    if (isNaN(año)){
        num = 1
    }else if (!Number.isInteger(año)){
        num = 2
    }else if(año < 0){
        num = 3
    }else if(año > 2024){
        num = 4
    }

    let response = {
        flag: num
    }

    res.json(response);
});

router.get('/availableTitulos', (req, res) => {
    let titulos = req.query.titulos;
    let num = 0;
    let titulosNum= parseInt(titulos);
    if (isNaN(titulosNum)){
        num = 1;
    } else if (!Number.isInteger(titulosNum)){
        num = 2
    }else if (titulosNum < 0){
        num = 3
    }

    let response = {
        flag: num
    }
    res.json(response);
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

router.post("/new",(req,res) => {
    let { escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo,champion, subElementos,id } = req.body;
    let flag = check(escudo, nombreEquipo, fCreacion, titulos, estadio, estilo);
    let mensaje = "";
    if (flag == 0){
    boardService.addEquipo({ escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo, champion, subElementos,id });
    mensaje = "Equipo creado correctamente."
    }
    else  if(flag==1){
        mensaje="Rellene todos los campos."
    }
    else if(flag==2){
        mensaje="El año de creación debe ser un número entero positivo y no superior a 2024."
    }
    else if(flag==3){
        mensaje="El número de títulos debe ser un número entero positivo."
    }
    else{
        mensaje="Introduzca una URL válida para la foto del escudo."
    }
    res.render('savedTeam', { 
        mensaje: mensaje
    });
});

router.post("/borrar",(req, res) => {
    
    boardService.deleteEquipo(parseInt(req.body.id))
    let [col1,col2,solitario] = boardService.getColumnas();
    res.render('paginaPrincipalAJAX', { 
      
    
    });
});

router.get('/paginaEditar.html', (req, res) => {
    let id = parseInt(req.query.id)
    res.render('editarElemento', { 
        equipo: boardService.getEquipo(id),
        id:id
    });
});


router.post("/edit",(req,res) => {
    let { id, escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo,champion } = req.body;
    let flag = check(escudo, nombreEquipo, fCreacion, titulos, estadio, estilo);
    id = parseInt(id)
    let mensaje = "";
    if (flag == 0){
        let equipo = boardService.getEquipo(parseInt(id))   
        let subElementos = equipo.subElementos
        equipo = { escudo, nombreEquipo, descripcion, fCreacion, valor,titulos, estadio, estilo, champion, subElementos, id}
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