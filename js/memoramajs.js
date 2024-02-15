//JUEGO DE MEMORAMA EN JAVASCRIPT
// CESAR BAUTISTA CASTILLA

//Inicializacion de variables
let tarjetasDestapadas = 0;//Iniciamos varibales en nulo
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer=30;//varibales para el tiempo
let timerInicial=30;
let tiempoRegresivo=null;

//Apuntando a documento HTML
let mostrarMovimiento=document.getElementById("movimientos") 
let mostrarAciertos=document.getElementById("aciertos")
let mostrarTiempo=document.getElementById("t-restante")

//Apuntando a audios
let winAudio= new Audio(`./Sonido/win.wav`);
let clickAudio=new Audio(`./Sonido/click.wav`);
let loseAudio=new Audio(`./Sonido/lose.wav`);
let rigthAudio=new Audio(`./Sonido/rigth.wav`);
let wrongAudio=new Audio(`./Sonido/wrong.wav`);

//Generador de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//sort para ordenar el arreglo 
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//FUNCIONES

//Funcion para reiniciar jugada
function reiniciarJuego() {
    tarjetasDestapadas = 0;//Inicializamos todo en nulo
    tarjeta1=null;
    tarjeta2=null;
    primerResultado=null;
    segundoResultado=null;
    movimientos=0;
    aciertos=0;
    temporizador=false;
    timer=30;
    timerInicial=30;
    tiempoRegresivo=null;
    numeros = numeros.sort(()=>{return Math.random()-0.5});
    mostrarMovimiento.innerHTML="Movimientos: 0";
    mostrarAciertos.innerHTML="Aciertos: 0";
    mostrarTiempo.innerHTML="Tiempo: 30 segundos";

    //Ocultamos tarjetas con los nuevos valores
    for (let i = 0; i<=15;i++){
        let tarjetabloqueada=document.getElementById(i);
        tarjetabloqueada.innerHTML=``;
        tarjetabloqueada.disabled=false;
    }
}

//Funicon para contar el tiempo que llevamos
function contarTiempo(){
    tiempoRegresivo=setInterval(()=>{
        timer--;//Vamos restandole cada segundo
        mostrarTiempo.innerHTML=`Tiempo ${timer} segundos`;//Lo imprimimos
        //Si el timer llega a 0 
        if(timer==0){
            clearInterval(tiempoRegresivo);//Para el setInterval
            bloquearTarjetas();//Bloqueamos tarjetas
            loseAudio.play();//Audio de perder
            setTimeout(reiniciarJuego,4000);//Reiniamos jugadas
        }
    },1000)
}

//Funcion para bloquear tarjetas
function bloquearTarjetas(){
    for (let i = 0; i<=15;i++){
        let tarjetabloqueada=document.getElementById(i);
        tarjetabloqueada.innerHTML=`<img src="Imagenes/${numeros[i]}.png" alt="">`;//Imprimos las tarjetas
        tarjetabloqueada.disabled=true;//Las inabilitamos
    }
}

//Funcion que se ejecuta cuando el usuario aprete una tarjeta
function destapar(id){
    //Iniciamos temporizador
    if (temporizador==false){
        contarTiempo();
        temporizador=true;
    }
    tarjetasDestapadas++;

    //Si destapamos una tarjeta
    if (tarjetasDestapadas==1){
        //Mostrar el primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML = `<img src="Imagenes/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //Desabilitar el primer boton
        tarjeta1.disabled=true;
    }else if(tarjetasDestapadas==2){ //Si destapamos la segunda
        //mostrar segundo numero
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id]
        tarjeta2.innerHTML=`<img src="Imagenes/${segundoResultado}.png" alt="">`;

        //Desabilitamos el segundo boton
        tarjeta2.disabled=true;
        
        //Incrementar movimientos
        movimientos++;
        mostrarMovimiento.innerHTML= `Movimientos: ${movimientos}`;
        
        //En caso de que sean iguales las imagenes
        if (primerResultado==segundoResultado){
            //encerrar contador tarjetas destapadas
            tarjetasDestapadas=0;

            //Aumentamos aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rigthAudio.play();
            
            //En caso de ser el ultimo para
            if (aciertos==8){
                //Acciones para ganador
                winAudio.play();
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML=`Aciertos: ${aciertos}😄`
                mostrarTiempo.innerHTML=`Fantastico, solo demoraste ${timerInicial-timer} segundos`
                mostrarMovimiento.innerHTML=`Movimientos: ${movimientos}😎`
                setTimeout(reiniciarJuego,4000);
            }
        }else{
            //Seguir jugando
            wrongAudio.play();
            //Mostrar momentaneamoente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML=" ";
                tarjeta2.innerHTML=" ";
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
            },369);
        }
    }
}