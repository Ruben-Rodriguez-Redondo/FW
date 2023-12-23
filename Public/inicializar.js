const INI = 3;
const imgTrofeo = 'Trofeo.png';
let loadMore = 0;

async function initElementos(busqueda){
  loadMore = 0
  if (busqueda==null) busqueda = ""
  const response = await fetch(`/datos-iniciales?bus=${busqueda}`); //Pedir al servidor la lista de equipos basandonos en la búsqueda
  let data = await response.json()
  let flag = false
  let elementos = data //procesar response para obtener el array de elementos
  if(elementos.elementos.length<=INI) flag = true //si no hay mas elementos que mostrar
  elementos = elementos.elementos.slice(0,(loadMore+1)*INI)
  var contenedor = document.getElementById("contenido-principal");
  contenedor.innerHTML = ""
  agregarElementosAlContenidoPrincipal(elementos);
  let masInfoElement = document.getElementById("contenedorCargarMas");
  if(!flag) {
    masInfoElement.style.display = "block";
  }
  else{
    masInfoElement.style.display = "none";
  }
}

async function cargarMas(busqueda){
  let flag = false
  loadMore = loadMore+1
  console.log(busqueda)
  if (busqueda==null) busqueda = ""
  const response = await fetch(`/datos-iniciales?bus=${busqueda}`); //Pedir al servidor la lista de equipos basandonos en la búsqueda
  let data = await response.json()
  let elementos = data //procesar response para obtener el array de elementos
  elementos = elementos.elementos
  let tope = (loadMore+1)*INI
  if(tope>elementos.length) {
    tope = elementos.length
    flag = true
  }
  if(tope==elementos.length) flag = true
  elementos = elementos.slice(loadMore*INI,tope)
  var contenedor = document.getElementById("contenido-principal");
  agregarElementosAlContenidoPrincipal(elementos)
  let masInfoElement = document.getElementById("contenedorCargarMas");
  if(!flag) {
    masInfoElement.style.display = "block";
  }
  else{
    masInfoElement.style.display = "none";
  }
}



  // Función asincrónica para realizar la solicitud Fetch y actualizar la página
 
  

  function agregarElementosAlContenidoPrincipal(elementos) {
   
      var contenedor = document.getElementById("contenido-principal");
      let equipos = elementos;
      let aux = equipos.length
        for (var i = 0; i<equipos.length; i++){
          let colMd6 = document.createElement('div');
          colMd6.className = 'col-md-6';
          let itemR = document.createElement('div');
          itemR.className = 'itemR';
          itemR.style.cursor = 'pointer';
          let identificador= equipos[i].identificador
          itemR.onclick = function() {
            window.location.href = 'subelemento.html?id=' + identificador; // Asumiendo que identificador es una variable definida
          };
      
          let equipo = document.createElement('a');
          equipo.className = 'equipo';
      
          let escudo = document.createElement('img');
          escudo.src = equipos[i].escudo; // Asegúrate de definir {{escudo}} antes de usar este código
          equipo.appendChild(escudo);
          equipo.appendChild(document.createTextNode(equipos[i].nombreEquipo));
      
          let trofeo = document.createElement('a');
          trofeo.className = 'trofeo';
      
          let trofeoImg = document.createElement('img');
          trofeoImg.src = imgTrofeo;
          trofeo.appendChild(trofeoImg);
          trofeo.appendChild(document.createTextNode(equipos[i].titulos));
      
          // Agregar los elementos al DOM
          itemR.appendChild(equipo);
          itemR.appendChild(trofeo);
          colMd6.appendChild(itemR);
          document.body.appendChild(colMd6);
          contenedor.appendChild(colMd6);
        }
   

  }







