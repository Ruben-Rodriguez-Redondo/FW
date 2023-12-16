const INI = 3;
const imgTrofeo = 'Trofeo.png';
  // Función asincrónica para realizar la solicitud Fetch y actualizar la página
  async function cargarDatosIniciales() {
    try {
        const from = 0;
        const to = INI;
      // Realizar la solicitud Fetch al servidor
      const response = await fetch(`/datos-iniciales?from=${from}&to=${to}`);

      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Error al cargar datos iniciales');
      }

      // Procesar los datos recibidos
      const data = await response.json();

      const elementos = data.elementos;

      // Actualizar la página con los elementos iniciales
      agregarElementosAlContenidoPrincipal(elementos);
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  function agregarElementosAlContenidoPrincipal(elementos) {
   
      var contenedor = document.getElementById("contenido-principal");
      var equipos = elementos;

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
   

    /*var contenedor = document.getElementById("contenido-principal");
      equipos = elementos

        for (var i = 0; i<equipos.length; i++){

            if (i%2===0) {
                var fila = document.createElement('div');
                fila.className = 'row'; 
            }
            var suma = 2;
            if ((i === (equipos.lenght-1)) && (equipos.length%2 !==0)){
                suma = 1;
            }

                var columna = document.createElement('div');
                columna.className = 'col-md-6';



                var item = document.createElement('div');
                item.className = 'itemR';

                var enlace = document.createElement('a');
                enlace.href = 'subelemento.html';

                var img = document.createElement('img');
                img.src = equipos[i].enlace;

                enlace.appendChild(img);
                enlace.appendChild(document.createTextNode(equipos[i].nombreEquipo));


                var enlace2 = document.createElement('a');
                enlace2.className = 'trofeo'
                enlace2.href = 'subelemento.html';

                var img2 = document.createElement('img');
                img2.src = 'Trofeo.png';
                enlace2.appendChild(img2);
                enlace2.appendChild(document.createTextNode(equipos[i].titulos));


                item.appendChild(enlace2); 
                item.appendChild(enlace);

                columna.appendChild(item);
                fila.appendChild(columna);

        contenedor.appendChild(fila);
        }*/

  }



  // Llamar a la función para cargar los datos iniciales cuando la página se carga
  window.onload = cargarDatosIniciales;


