//Contador de procesos agregados
var bloquearAgregar = 0;
document.getElementById('ciclos-usar').value = 0;
document.getElementById('empezar-simulacion').disabled = true;
function AgregarProceso(){
    ValidarProceso();
}

function EmpezarSimulacion(){
    document.getElementById('agregar-proceso').disabled = true;
    document.getElementById('empezar-simulacion').disabled = true;
    document.getElementById('procesos-cards').innerHTML += `
    <div style="margin: 10px">
    <button type="button" class="btn btn-primary btn-lg btn-block btn-sm" style="margin: 10px" onclick="FinalizarSimulacion();">Finalizar</button>
    </div>`;
}

function FinalizarSimulacion(){
    document.getElementById('procesos-cards').innerHTML = ``;
    document.getElementById('agregar-proceso').disabled = false;
}

function CrearProceso(){
//Agregar card con información del proceso
document.getElementById('procesos-cards').innerHTML += 
`<div id="proceso-${bloquearAgregar + 1}" class="col">
        <div class="card mb-3">
        <div class="card-header">Proceso</div>
        <div class="card-body">
        <li> 1</li>
        <li> 1</li>
            <li> 1</li>
            <li> 1</li>
            <li> 1</li>
            </div>
            </div>
            </div>`
            bloquearAgregar ++;
}

function ValidarProceso(){
    var valor = document.getElementById('ciclos-usar').value;
    if (valor <= 10){
        document.getElementById('texto-advertencia').innerHTML = `<h6>Introduzca un valor mayor a 10</h6>`;
        }else{
            document.getElementById('texto-advertencia').innerHTML = ``;
            CrearProceso();
            //Bloquear botón si hay 10 procesos agregados
            if (bloquearAgregar == 10){
                document.getElementById('agregar-proceso').disabled = true;
            }
                document.getElementById('empezar-simulacion').disabled = false;
        }
}

