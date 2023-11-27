import { getEquipos, getKeys } from "./boardService.js";
  
export function generarHTML (){
        document.addEventListener('DOMContentLoaded', function() {
            
       
            var equipos = getEquipos(); // Se tendrán q cambiar por comunicación AJAX con el servidor
            var claves = getKeys();//
           
   
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
                        enlace.className ='equipo';
                        enlace.href = 'subelemento.html'+'?id='+claves[i];

                        var img = document.createElement('img');
                        img.src = equipos[i].escudo;

                        enlace.appendChild(img);
                        enlace.appendChild(document.createTextNode(equipos[i].nombreEquipo));


                        var enlace2 = document.createElement('a');
                        enlace2.className = 'trofeo';
                        enlace2.href = 'subelemento.html'+'?id='+claves[i];

                        var img2 = document.createElement('img');
                        img2.src = 'Trofeo.png';
                        enlace2.appendChild(img2);
                        enlace2.appendChild(document.createTextNode(equipos[i].titulos));

                
                        
                        item.appendChild(enlace);
                        item.appendChild(enlace2); 
                        
                        columna.appendChild(item);
                        fila.appendChild(columna);
                        
                contenedor.appendChild(fila);
                }
        });
    }