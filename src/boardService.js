const equipos = new Map();
let nextId = 0;
const numEquiposInicial = 3;
function cargarSubElementos(id){
    let dev  = []
    let noms = []
    let ages = []
    let values  =[]
    switch(id){
        case 0:
           noms = ["Thibaut Courtois", "Kepa Arrizabalaga", "Andriy Lunin", "Éder Militao", "Dávid Alaba"] 
            ages = [31,29,24,25,31]
            values = [45,18,5,70,40]
            break; 
        case 1:
            noms = ["Thibaut Courtois", "Kepa Arrizabalaga", "Andriy Lunin", "Éder Militao", "Dávid Alaba"] 
            ages = [31,29,24,25,31]
            values = [45,18,5,70,40]
            break;
        case 2:
            noms = ["Thibaut Courtois", "Kepa Arrizabalaga", "Andriy Lunin", "Éder Militao", "Dávid Alaba"] 
            ages = [31,29,24,25,31]
            values = [45,18,5,70,40]
            break;        
        default:
          console.log("Opción no reconocida");
    }
    for (let i = 0; i < noms.length; i++) {
        let subElemento = {
            nombre : noms[i],
            edad : ages[i],
            valor : values[i]
        }
        dev[i] = subElemento
      }
    return dev
}
function cargarElemento(id){
    //real madrid
    let foto;
    let nom;
    let desc;
    let year;
    let value;
    let ntitulos; 
    let stadium; 
    let style;
    let sub;
    switch (id) {
        case 0:
          //real madrid
          foto = "RM.png",
          nom = "Real Madrid";
          desc = "Descripción del real madrid";
          year = 1902
          value = 991000000
          ntitulos = 14
          stadium = "Santiago Bernabeu"
          style = "Ofensivo"
          sub=cargarSubElementos(id)
          break;
        case 1:
            foto = "Milan.png",
            nom = "AC.Milan";
            desc = "Descripción del milan";
            year = 1922
            value = 991
            ntitulos = 7
            stadium = "San Siro"
            style = "Catenaccio"
            sub=cargarSubElementos(id)
            break;
        case 2:
            foto = "Ajax.png",
            nom = "Ajax";
            desc = "Descripción del milan";
            year = 1922
            value = 991
            ntitulos = 7
            stadium = "San Siro"
            style = "Catenaccio"
            sub=cargarSubElementos(id)
            break;
          
        default:
          console.log("Opción no reconocida");
    }
    let elemento = {
        escudo:foto,
        nombreEquipo: nom,
        descripcion: desc,
        fCreacion: year,
        valor: value,
        titulos: ntitulos,
        estadio: stadium,
        estilo: style,
        subElementos: sub,
        identificador:id
    }
    return elemento
}
function cargarDatos(){
    //aqui hay que cargar en el mapa los valores de cada elemento
    for (let i = 0; i < numEquiposInicial; i++) {
        //addEquipo(cargarElemento(i));
        equipos.set(i,cargarElemento(i))
        nextId+=1;
      }
    
}


cargarDatos();
export function addEquipo(equipo) {
    //let id = nextId;
    equipo.identificador = nextId;
    //equipo.id = id.toString();
    switch(equipo.estilo){
        case "1":
            equipo.estilo = "Ofensivo";
            break;
        case "2":
            equipo.estilo = "Defensivo";
            break;
        case "3":
            equipo.estilo = "Posesión";
            break;
        case "4":
            equipo.estilo = "Contraataque";
            break;
        case "5":
            equipo.estilo = "Juego por las bandas";
            break;
    }
    equipos.set(equipo.identificador, equipo);
    nextId++;
}

export function deleteEquipo(id){
    equipos.delete(id);
}

export function getKeys(){
    
    return [...equipos.keys()] ;
}

export function getEquipos(){
       
    return [...equipos.values()] ;
}


export function getEquipo(id){
    return equipos.get(id);
}


export function getColumnas(){
    let col1 = [];
    let col2 = [];
    let solitario = null;
    let alternar =true;
    let keys = getKeys();
    if (keys.length % 2 !==0) {solitario = getEquipo(keys[keys.length-1]); keys.pop();}
    for ( let key of keys) {
        if (alternar) {
            col1.push(getEquipo(key));
        }
        else {
            col2.push(getEquipo(key));
        }
        alternar = !alternar;
    }
    if (keys.length % 2 !==0) solitario = getEquipo(keys[keys.length-1]);

return  [col1,col2, solitario];
}