async function loadJugadores(id){

    let fetchpar =  '/pagePartJ?id='+ id +
    console.log(id)
    console.log("Poya y webos")
    const response = await fetch(fetchpar);

    const pagePart = await response.text();
    console.log(pagePart)
    const content = document.getElementById("contentJ");
    content.innerHTML += pagePart;

}

async function addJugador(id){

    let fetchpar =  '/pagePartJ?id='+ id +
    console.log(id)
    console.log("Poya y webos")
    const response = await fetch(fetchpar);

    const pagePart = await response.text();
    console.log(pagePart)
    const content = document.getElementById("contentJ");
    content.innerHTML += pagePart;

}

async function deleteJugador(id){

    let fetchpar =  '/pagePartJ?id='+ id +
    console.log(id)
    console.log("Poya y webos")
    const response = await fetch(fetchpar);

    const pagePart = await response.text();
    console.log(pagePart)
    const content = document.getElementById("contentJ");
    content.innerHTML += pagePart;

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
        message = "La edad introducida no es valida"
    }
    const content = document.getElementById("checkMessage");
    content.innerHTML = message;
}

async function checkValue(){
    let usernameInput = document.getElementById('valorJ');
    let valor = usernameInput.value;
    let message = ""
    if (valor == "" || isNaN(valor) || typeof valor !=='number'){
        message = "El valor introducido no es valido"
    }
    const content = document.getElementById("checkMessage");
    content.innerHTML = message;
}
