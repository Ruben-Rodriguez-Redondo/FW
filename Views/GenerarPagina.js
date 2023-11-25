import { getEquipos } from "./boardService.js";
      

function generarHTML() {
        document.addEventListener('DOMContentLoaded', function() {
       
            let equipos = getEquipos();
   
            var contenedor = document.getElementById("contenedorPrincipal");
                

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
                }
        });
       }
