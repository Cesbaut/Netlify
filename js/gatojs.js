//JUEGO DE GATO EN JAVASCRIPT
// CESAR BAUTISTA CASTILLA


//Declaramos variables
let arreglo = [0,0,0,0,0,0,0,0,0]; //Arreglo que iniciaremos en 0
let contador=0; //Definimos nuestros contadores
let contadorX=0;
let contadorO=0;
let jugador=1; //Empezara el jugador 1 que es la X
let sumaX=document.getElementById("X");//Tomamos elementos del html
let sumaO=document.getElementById("O");
let pregunta = document.getElementById("pregunta");
let fig=document.querySelector("#figura");
let fondo = document.getElementsByTagName("main");
let clickAudio=new Audio(`./Sonido/click.wav`);//Inicializamos audios
let winAudio= new Audio(`./Sonido/win.wav`);
let loseAudio=new Audio(`./Sonido/lose.wav`);

//Funcion para volver a jugar
function reiniciarJuego() {
    //Volvemos a inicializar en 0
    arreglo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    contador = 0;
    
    //Ocultamos las fichas
    for (let i = 0; i < arreglo.length; i++) {
      let tarjetabloqueada = document.getElementById(i);
      tarjetabloqueada.innerHTML = "";
      tarjetabloqueada.disabled = false;
    }
}

//Aqui se realizan las comparaciones para saber si alguien ha ganado
//En este caso haremos de X
function comparaciones(j){
    if((arreglo.slice(0, 3).every(elemento => elemento ==1))//Primero para filas
    || (arreglo.slice(3, 6).every(elemento => elemento ==1))
    || (arreglo.slice(6, 9).every(elemento => elemento ==1)) 
    || (arreglo[0]==1 && arreglo[3]==1 && arreglo[6]==1) //Columnas
    || (arreglo[1]==1 && arreglo[4]==1 && arreglo[7]==1) 
    || (arreglo[2]==1 && arreglo[5]==1 && arreglo[8]==1) 
    || (arreglo[0]==1 && arreglo[4]==1 && arreglo[8]==1)//Diagnolas 
    || (arreglo[2]==1 && arreglo[4]==1 && arreglo[6]==1)){
        //Si alguna se cumplio inabilitamos todas las tarjetas
        for (let i = 0; i < arreglo.length; i++) {
            let tarjetabloqueada=document.getElementById(i);  
            tarjetabloqueada.disabled=true;
        }
        contadorX++;//Sumamos uno al contador de X
        sumaX.innerHTML = `${contadorX}`;//Lo imprimimos
        jugador=j;//Le toca ahora al jugador 2
        winAudio.play(); //Sonido de ganar un punto
        setTimeout(reiniciarJuego,3000); //Reinicia el juego
    
    //Se realizaran exactamente las mismas condiciones anteriores pero esta vez para el 2 que es circulo
    }else if((arreglo.slice(0, 3).every(elemento => elemento ==2)) 
    || (arreglo.slice(3, 6).every(elemento => elemento ==2))
    || (arreglo.slice(6, 9).every(elemento => elemento ==2))
    || (arreglo[0]==2 && arreglo[3]==2 && arreglo[6]==2)
    || (arreglo[1]==2 && arreglo[4]==2 && arreglo[7]==2)
    || (arreglo[2]==2 && arreglo[5]==2 && arreglo[8]==2)
    || (arreglo[2]==2 && arreglo[4]==2 && arreglo[6]==2)
    || (arreglo[0]==2 && arreglo[4]==2 && arreglo[8]==2)){
        for (let i = 0; i < arreglo.length; i++) {
            let tarjetabloqueada=document.getElementById(i);  
            tarjetabloqueada.disabled=true;
        }
        contadorO++;
        sumaO.innerHTML = `${contadorO}`;
        jugador=j;
        winAudio.play();
        setTimeout(reiniciarJuego,3000);
    //En caso de no haber ningun ganador
    }else if(arreglo.slice(0, 9).every(elemento => elemento !=0)){//Condicion para saber si todo el arreglo es 0
        jugador=j;
        loseAudio.play();//Sonido de perder
        setTimeout(reiniciarJuego,3000);//Reiniciamos el juego
    }
}

// Funcion que se ejecutara cuando el usuario aprete una ficha
function destapar(id){
    clickAudio.play();//Sonido
    if (jugador==1){//En caso de que empieza la X
        contador++;
        if (contador==1){//En caso ser la primera tirada
            fig.innerHTML=`<img src="Imagenes/circulo.png" alt="circuclo">`; //Cambiamos en el turno cuando de click
            fondo[0].style.background = "#d7feff"; //Igual el color de fondo

            tarjeta1=document.getElementById(id);//Encontramos la posicion
            tarjeta1.innerHTML = `<img src="Imagenes/equis.png" alt="equis">`;//Mostramos la equis en el tablero
            arreglo[id]=1;//En lugar del 0 ponemos 1 para posteriormente hacer las comparaciones de gane
            tarjeta1.disabled=true;//Inabilitamos la ficha

        }else if(contador==2){//En caso de ser la segunda tirada que es el circulo
            fig.innerHTML=`<img src="Imagenes/equis.png" alt="equis">`;//Cambiamos en el turno cuando de click
            fondo[0].style.background = "#ff9797";//Igual el color de fondo

            tarjeta2=document.getElementById(id);//Encontramos la posicion
            tarjeta2.innerHTML = `<img src="Imagenes/circulo.png" alt="circulo">`;//Mostramos el circulo en el tablero
            arreglo[id]=2;//Para circulo pondremos un 2 en el arreglo
            contador=0;//Para que se vuelva a repetir el ciclo
            tarjeta2.disabled=true;//Inabilitamos la ficha
        }
        comparaciones(2);//llamamos a la funcion para hacer las comparaciones

    //Aqui seran las mismas configuraciones anteriore pero se invertiran las figuras y jugadas
    }else if(jugador==2){
        contador++;
        if (contador==1){
            fig.innerHTML=`<img src="Imagenes/equis.png" alt="equis">`
            fondo[0].style.background = "#ff9797";
            tarjeta1=document.getElementById(id);
            tarjeta1.innerHTML = `<img src="Imagenes/circulo.png" alt="equis">`
            arreglo[id]=2
            tarjeta1.disabled=true;
        }else if(contador==2){
            fig.innerHTML=`<img src="Imagenes/circulo.png" alt="equis">`
            fondo[0].style.background = "#d7feff";
            tarjeta2=document.getElementById(id);
            tarjeta2.innerHTML = `<img src="Imagenes/equis.png" alt="circulo">`
            arreglo[id]=1
            contador=0;
            tarjeta2.disabled=true;
        }
        comparaciones(1); 
    }
}
