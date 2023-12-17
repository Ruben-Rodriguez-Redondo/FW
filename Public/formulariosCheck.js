async function checkNameAvaliability(){

    let usernameInput = document.getElementById('nombreEquipo');

    let username = usernameInput.value;

    const response = await fetch(`/availableUsername?username=${username}`);

    const responseObj = await response.json();

    if (responseObj.available) {
        availabilityMessage.textContent = ''; // Nombre disponible, borra el mensaje
    } else {
        availabilityMessage.textContent = 'Nombre no disponible'; // Nombre no disponible, muestra el mensaje en rojo
    }


}

async function checkReNameAvaliability(id){
   
    let usernameInput = document.getElementById('nombreEquipo');


    let username = usernameInput.value;

    const response = await fetch(`/reAvailableUsername?username=${username}&id=${id}`);

    const responseObj = await response.json();

    if (responseObj.available) {
        availabilityMessage.textContent = ''; // Nombre disponible, borra el mensaje
    } else {
        availabilityMessage.textContent = 'Nombre no disponible'; // Nombre no disponible, muestra el mensaje en rojo
    }


}