const equipos = new Map();
let nextId = 0;
const numEquiposInicial = 5;
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
            noms = ["Mike Maignan", "Theo Hernández", "Fikayo Tomori", "Tijani Reijnders", "Rafael Leao"] 
            ages = [28,26,25,25,24]
            values = [30,70,60,35,80]
            break;
        case 2:
            noms = ["Gerónimo Rulli", "Jorrel Hato", "Steven Berghuis", "Bergwijn", "Brian Brobbey"] 
            ages = [31,17,31,26,21]
            values = [10,40,15,55,30]
            break; 
            
            case 3:
                noms = ["Manuel Neuer", "Daniel Peretz", "Sven Ulreich", "TomHülsmann", "Matthijs de Ligt"] 
            ages = [37,23,35,19,24]
            values = [5,5,0.7,0.25,70]
                break;   
                
                case 4:
                    noms = ["Alisson", "Caoimhím Kelleher", "Adrián", "Ibrahima Konaté", "Virgil Van Dijk"] 
                    ages = [31,25,36,24,32]
                    values = [35,15,0.8,38,35]
                    break;   
                
        default:
            noms = []
            ages = []
            values = []
            break;
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
    let champion;
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
          champion = "Sí"
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
            champion = "Sí"
            sub=cargarSubElementos(id)
            break;
        case 2:
            foto = "Ajax.png",
            nom = "Ajax";
            desc = "Descripción del Ajax";
            year = 1922
            value = 200000000
            ntitulos = 7
            stadium = "San Siro"
            style = "Catenaccio"
            champion = "Sí"
            sub=cargarSubElementos(id)
            break;
        
            case 3:
                foto = "BayernM.png",
                nom = "Bayern de Munich";
                desc = "Descripción del Bayern";
                year = 1900
                value = 948150000
                ntitulos = 6
                stadium = "Alianz Arena"
                style = "Ofensivo"
                champion = "Sí"
                sub=cargarSubElementos(id)
                break;
          
                case 4:
                    foto = "Liverpool.png",
                    nom = "Liverpool";
                    desc = "Descripción del Liverpool";
                    year = 1847
                    value = 887550000
                    ntitulos = 6
                    stadium = "Anfield"
                    style = "Ofensivo"
                    champion = "Sí"
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
        champion: champion,
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
    if (equipo.champion === undefined){
        equipo.champion = "No"
    }
    else{
        equipo.champion = "Sí"
    }
    equipo.subElementos = cargarSubElementos(equipo.identificador);
    equipos.set(equipo.identificador, equipo);
    nextId++;
}

export function editEquipo(id,equipo) {
    //let id = nextId;
    equipo.identificador = id;
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
        case "6":
            equipo.estilo = "Catenaccio";
            break;
    }
    if (equipo.champion === undefined){
        equipo.champion = "No"
    }
    else{
        equipo.champion = "Sí"
    }
    equipos.set(id, equipo);
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
export function aNombreEquipos(){
    
    return Array.from(equipos.values()).map(objeto => objeto.nombreEquipo);
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

export function iniciales(from,to){
    let last = false;
    let equiposIniciales = [];
    let keys = getKeys();
    for (from; from<to; from++) {
        if (from < keys.length){
        equiposIniciales.push(equipos.get(keys[from]));
        }
       
    }
    if (to >= keys.length) {
        last = true;

    }
    return [equiposIniciales,last];
}

export function busqueda(buscar){
    
    let aEquipos = getEquipos();
     let matches = [];
    for (let i = 0; i < aEquipos.length; i++) {
        let textoElemento = aEquipos[i].nombreEquipo.toLowerCase();
        if (textoElemento.includes(buscar.toLowerCase())){
            matches.push(aEquipos[i])
        }
        
    }
    return matches;
}