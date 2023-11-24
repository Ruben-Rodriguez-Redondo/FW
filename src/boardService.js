const equipos = new Map();
let nextId = 0;

addEquipo({ nombreEquipo: "Real Madrid FC", descripcion: "Floren Team" ,estadio:"Bernabeu" ,titulos: "14", fCreacion: "1/1/1" });
addEquipo({ nombreEquipo: "Real Madrid FC", descripcion: "Floren Team" ,estadio:"Bernabeu" ,titulos: "14", fCreacion: "1/1/1" });

export function addEquipo(equipo) {
    let id = nextId++;
    equipo.id = id.toString();
    equipos.set(equipo.id, equipo);
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