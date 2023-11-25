const equipos = new Map();
let nextId = 0;

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
        default:
          console.log("Opción no reconocida");
    }
    for (let i = 0; i < 5; i++) {
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
          ntitulos = 97
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
            ntitulos = 97
            stadium = "San Siro"
            style = "Catenaccio"
            sub=cargarSubElementos(id)
            break;
        case 2:
          console.log("Seleccionaste la opción 3");
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
        subElementos: sub
    }
    return elemento
}
function cargarDatos(){
    //aqui hay que cargar en el mapa los valores de cada elemento
    for (let i = 0; i < 2; i++) {
        equipos.set(i,cargarElemento(i))
        nextId+=1
      }
    
}


cargarDatos()
export function addEquipo(equipo) {
    let id = nextId;
    equipo.id = id.toString();
    equipos.set(equipo.id, equipo);
    nextId++;
}

export function deleteEquipo(id){
    equipos.delete(id);
}

export function getEquipos(){
    return [...equipos.values()];
}

export function getEquipo(id){
    return equipos.get(id);
}