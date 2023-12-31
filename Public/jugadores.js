async function loadJugadores(id){

    let fetchpar = '/pagePartJ?id='+ id 

    const response = await fetch(fetchpar);

    const pagePart = await response.text();

    const content = document.getElementById("contentJ");
    content.innerHTML = pagePart;

}
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
async function addJugador(id){
    
    let usernameInput = document.getElementById('nombreJ');
    let nombre = usernameInput.value;
    usernameInput = document.getElementById('valorJ');
    let valor = usernameInput.value;
    usernameInput = document.getElementById('edadJ');
    let edad = usernameInput.value;
    let mensaje = ""


    if(validEntry(nombre,edad,valor)==0){ //guardar jugador y pedir la página nueva o guardar jugador y añadir el jugador
        let nuevoSubElemento = {
            nombre : nombre,
            edad : edad,
            valor : valor
        }

        const response1 = await fetch('/nuevoSub',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({id: parseInt(id),
                NuevoJugador: nuevoSubElemento})              
        });
        loadJugadores(id)
        mensaje = "Jugador añadido correctamente"
    }
    else{ //poner el mensaje 
        mensaje = "Los datos introducidos no son correctos"
    }

    const content2 = document.getElementById("checkMessage2")
    content2.innerHTML = mensaje

}

async function deleteJugador(id, row){
    const response1 = await fetch('/borrarSub',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({id: parseInt(id),
            fila: parseInt(row.parentNode.parentNode.rowIndex)})   //Honours to chatGPT this line       
    });
    //borrar Jugador
    loadJugadores(id)

    mensaje = "Se ha borrado correctamente"
    const content = document.getElementById("check3");
    content.innerHTML = mensaje;
}

async function checkName(){
    let usernameInput = document.getElementById('nombreJ');
    let nombre = usernameInput.value;
    let message = ""
    if (nombre == ""){
        message = "Ese nombre no es válido"
    }
    const content = document.getElementById("checkMessage");
    content.innerHTML = message;
}

async function checkAge(){
    let usernameInput = document.getElementById('edadJ');
    let edad = usernameInput.value;
    let message = ""
    if (edad == "" || isNaN(edad)){
        message = "La edad introducida debe se un número entero"
    }
    const content = document.getElementById("checkMessage");
    content.innerHTML = message;
}

async function checkValue(){
    let usernameInput = document.getElementById('valorJ');
    let valor = usernameInput.value;
    let message = ""
    if (valor == "" || isNaN(valor)){
        message = "El valor debe ser un número"
    }
    const content = document.getElementById("checkMessage");
    content.innerHTML = message;
}
