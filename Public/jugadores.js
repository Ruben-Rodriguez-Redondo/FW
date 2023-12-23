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
