async function checkNameAvaliability(){

    let usernameInput = document.getElementById('nombreEquipo');

    let username = usernameInput.value;
    const response = await fetch(`/availableUsername?username=${username}`);

    const responseObj = await response.json();
    if (responseObj.available == true && username[0] == username[0].toUpperCase()) {
        //availabilityMessage.textContent = ''; // Nombre disponible, borra el mensaje
        ocultarError('nombreEquipo')
    } else if (responseObj.available == false) {
        //availabilityMessage.textContent = 'Nombre no disponible'; // Nombre no disponible, muestra el mensaje en rojo
        mostrarError('nombreEquipo','Nombre de equipo no disponible')
    }else if (username[0] !== username[0].toUpperCase()){
        mostrarError('nombreEquipo','El nombre debe empezar por mayúscula')
    }
}

async function checkDescriptionAvaliability(){

    let descripcionInput = document.getElementById('descripcion');

    let descripcion = descripcionInput.value;
    const response = await fetch(`/availableDescripcion?descripcion=${descripcion}`);

    const responseObj = await response.json();
    if (responseObj.flag == 1){
        mostrarError('descripcion','La descripción debe superar los 50 caracteres')
    } else if (responseObj.flag == 2){
        mostrarError('descripcion','La descripción no debe superar los 500 caracteres')
    } else{
        ocultarError('descripcion')
    }

}

async function checkEscudoAvaliability(){

    let escudoInput = document.getElementById('escudo');

    let escudo = escudoInput.value;
    const response = await fetch(`/availableEscudo?escudo=${escudo}`);

    const responseObj = await response.json();
    if (responseObj.available == true){
        ocultarError('escudo')
    }else{
        mostrarError('escudo','URL no válida')
    }

}

async function checkfCreacionAvaliability(){

    let fCreacionInput = document.getElementById('fCreacion');

    let fCreacion = fCreacionInput.value;
    const response = await fetch(`/availablefCreacion?fCreacion=${fCreacion}`);
    const responseObj = await response.json();
    if (responseObj.flag == 1){
        mostrarError('fCreacion','Tiene que ser un número')
    } else if (responseObj.flag == 2){
        mostrarError('fCreacion','Tiene que ser un número entero')
    }else if (responseObj.flag == 3){
        mostrarError('fCreacion','Tiene que ser un número entero positivo')
    }else if(responseObj.flag == 4){
        mostrarError('fCreacion','Tiene que ser menor que 2024')
    }else{
        ocultarError('fCreacion')
    }
}

async function checkTitulosAvaliability(){

    let titulosInput = document.getElementById('titulos');

    let titulos = titulosInput.value;
    const response = await fetch(`/availableTitulos?titulos=${titulos}`);

    const responseObj = await response.json();
    if (responseObj.flag == 1){
        mostrarError('titulos','Tiene que ser un número')
    } else if (responseObj.flag == 2){
        mostrarError('titulos','Tiene que ser un número entero')
    }else if (responseObj.flag == 3){
        mostrarError('titulos','Tiene que ser un número entero positivo')
    }else{
        ocultarError('titulos')
    }
}

function mostrarError(campo, mensaje) {
    const input = document.querySelector(`input[name="${campo}"]`);
    const errorDiv = input.nextElementSibling;
    errorDiv.innerText = mensaje;
    input.classList.add('is-invalid');
  }

    // Función para ocultar errores
    function ocultarError(campo) {
        const input = document.querySelector(`input[name="${campo}"]`);
        const errorDiv = input.nextElementSibling;
        errorDiv.innerText = '';
        input.classList.remove('is-invalid');
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