//Contador de procesos agregados
var bloquearAgregar = 0;

// TDA Procesos
var Nuevo = new LinkedList();
var Listo = new LinkedList();
var Ejecutando = new LinkedList();
var Bloqueado = new LinkedList();
var Finalizado = new LinkedList();

document.getElementById('ciclos-usar').value = 0;
document.getElementById('empezar-simulacion').disabled = true;

//Petición AJAX con la información del proceso 
function GenerarProceso() {
    let ciclos = {
        ciclosUsar: document.getElementById('ciclos-usar').value
    }
    $.ajax({
        url: 'php/generarProceso.php',
        method: 'post',
        data: JSON.stringify(ciclos),
        dataType: 'json',
        success: function (proceso) {
            MostrarProceso(proceso.Id, proceso.Estado, proceso.Prioridad, proceso.Instrucciones, proceso.Bloqueo, proceso.Evento);
            //Agregar el nuevo proceso al TDA correspondiente
            Nuevo.add(proceso, proceso.Prioridad);
        },
        error: function (xhr, textStatus, errorMessage) {

            console.log("ERROR " + errorMessage + " " + textStatus + " " + xhr.responseText);

        }
    });
}

//Validación de input
function ValidarCiclos() {
    let valor = document.getElementById('ciclos-usar').value;
    if (valor <= 40 || valor > 999) {
        document.getElementById('texto-advertencia').innerHTML = `<h6>Introduzca un valor mayor a 40 y menor que 999</h6>`;
    } else {
        document.getElementById('texto-advertencia').innerHTML = ``;
        GenerarProceso();
        //Bloquear botón si hay 10 procesos agregados
        if (bloquearAgregar == 9) {
            document.getElementById('agregar-proceso').disabled = true;
        }
        document.getElementById('empezar-simulacion').disabled = false;
    }
}

function MostrarProceso(id, estado, prioridad, instrucciones, bloqueo, evento) {
    //Agregar card con información del proceso
    let eventoBloqueo = "Ninguno";

    if (evento == 1) {
        eventoBloqueo = "E/S";
    }
    if (evento == 2) {
        eventoBloqueo = "Disco Duro";
    }

    document.getElementById('procesos-cards').innerHTML +=
        `<div class="col">
        <div class="card bg-white my-2" id="proceso-${bloquearAgregar + 1}">
            <div class="card-header ml-auto mr-auto bg-transparent"><h4 class="bg-transparent" id="proceso-${bloquearAgregar + 1}-estado">Nuevo</h4>
            <div id="myProgress-${bloquearAgregar + 1}" class="bg-transparent">
            <div id="myBar-${bloquearAgregar + 1}" class="bg-transparent"></div>
            </div></div>
            <div class="card-body bg-white ">
            <li> Id:<h6 id="id-${bloquearAgregar + 1}">${id}</h6></li>
            <li> Estado:<h6 id="estado-${bloquearAgregar + 1}">${estado}</h6></li>
            <li> Prioridad:<h6 id="prioridad-${bloquearAgregar + 1}">${prioridad}</h6></li>
            <li> Instrucciones:<h6>${instrucciones}</h6></li>
            <li> Instrucción de Bloqueo:<h6>${bloqueo}</h6></li>
            <li> Evento:<h6>${eventoBloqueo}</h6></li>
            </div>
        </div>
    </div>
    `
    bloquearAgregar++;

}

function EmpezarSimulacion() {
    document.getElementById('agregar-proceso').disabled = true;
    document.getElementById('empezar-simulacion').disabled = true;
    AsignarProcesosListos();
    Simular();
  
}

//Pasar procesos de la lista enlazada de Nuevos a Listos
function AsignarProcesosListos() {
    let proceso = 1;
    let current = Nuevo.first;

    while (current.next) {
        document.getElementById(`proceso-${proceso}`).classList.remove('bg-white');
        document.getElementById(`proceso-${proceso}`).classList.add('bg-warning');
        document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Listo`;
        document.getElementById(`estado-${proceso}`).innerHTML = `1`;
        current.value.Estado = 1;
        Listo.add(current.value, current.priority);
        Nuevo.delete();
        current = current.next;
        proceso++;
    }
    current.value.Estado = 1;
    Listo.add(current.value, current.priority);
    document.getElementById(`proceso-${proceso}`).classList.remove('bg-white');
    document.getElementById(`proceso-${proceso}`).classList.add('bg-warning');
    document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Listo`;
    document.getElementById(`estado-${proceso}`).innerHTML = `1`;
}

//Arreglo donde se guardará el id de los procesos que se van ejecutando
var ejecutados = [];

// --------------------------------- Simulación --------------------------------- //
function Simular() {
    document.querySelector('#btn-accion button').style.display = 'none';
    let accion = setInterval(Simulacion, 3000);

    function Simulacion() {
        if (Finalizado.length() == bloquearAgregar) {
            document.getElementById('btn-accion').innerHTML = `
            <button type="button" class="btn btn-primary btn-lg btn-block btn-sm" style="margin: 10px" onclick="FinalizarSimulacion();">Finalizar</button>`;
            clearInterval(accion);
        } else {
            if (Listo.length() != 0) {

                let actual = Listo.first;
                for (let i = 0; i < Listo.length(); i++) {
                    let identificadorTexto = actual.value.Id.toString();
                    let identificador = identificadorTexto.substr(0, identificadorTexto.length - 3);
                    let proceso = parseInt(identificador);

                    if (ProcesosEjecutados() == true && actual.value.Prioridad != 3) {
                        actual.value.Prioridad++;
                        document.getElementById(`prioridad-${proceso}`).innerHTML = `${actual.value.Prioridad}`;
                    } else if (actual.value.Id + 5 == actual.value.Bloqueo + (proceso * 1000) || actual.value.Id + 4 == actual.value.Bloqueo + (proceso * 1000) || actual.value.Id + 3 == actual.value.Bloqueo + (proceso * 1000) || actual.value.Id + 2 == actual.value.Bloqueo + (proceso * 1000) || actual.value.Id + 1 == actual.value.Bloqueo + (proceso * 1000)) {
                        //Simular ejecución y Bloquear Proceso
                        Listo.deleteInPosotion(actual.value);
                        actual.value.Estado = 2;
                        Ejecutando.add(actual.value, actual.value.Prioridad);
                        Ejecutando.deleteInPosotion(actual.value);
                        let nuevoId = actual.value.Bloqueo + (proceso * 1000) - (actual.value.Id);
                        actual.value.Id = actual.value.Id + nuevoId;
                        ejecutados.push(actual.value.Id);
                        actual.value.Estado = 3;
                        Bloqueado.add(actual.value, actual.value.Prioridad);
                        BloquearProceso(proceso, actual.value.Id);
                    } else if (actual.value.Id + 5 > ((proceso * 1000) + actual.value.Instrucciones)) {
                        //Agregar a los finalizados
                        Listo.deleteInPosotion(actual.value);
                        actual.value.Estado = 2;
                        Ejecutando.add(actual.value, actual.value.Prioridad);
                        Ejecutando.deleteInPosotion(actual.value);
                        let nuevoId = actual.value.Instrucciones + (proceso * 1000) - (actual.value.Id);
                        actual.value.Id = actual.value.Id + nuevoId;
                        actual.value.Estado = 4;
                        Finalizado.add(actual.value, actual.value.Prioridad);
                        ejecutados.push(actual.value.Id);
                        FinalizarProceso(proceso, actual.value.Id);
                    } else {
                        Listo.deleteInPosotion(actual.value);
                        actual.value.Estado = 2;
                        Ejecutando.add(actual.value, actual.value.Prioridad);
                        Ejecutando.deleteInPosotion(actual.value);
                        actual.value.Id = actual.value.Id + 5;
                        actual.value.Estado = 1;
                        Listo.add(actual.value, actual.value.Prioridad);
                        ejecutados.push(actual.value.Id);
                        EjecutarProceso(proceso, actual.value.Id);
                    }
                    proceso++;
                    actual = actual.next;
                }
            }
            if (Bloqueado.length() != 0) {
                let current = Bloqueado.first;

                for (let j = 0; j < Bloqueado.length(); j++) {
                    let identificadorTexto = current.value.Id.toString();
                    let identificador = identificadorTexto.substr(0, identificadorTexto.length - 3);
                    let proceso = parseInt(identificador);
                    //Simular como sería el proceso Bloqueado
                    if (current.value.Evento == 1) {
                        if (current.value.Id + 5 > current.value.Bloqueo + 13 + (proceso * 1000)) {
                            Bloqueado.deleteInPosotion(current.value);
                            let nuevoId = (current.value.Bloqueo + 13 + (proceso * 1000)) - (current.value.Id);
                            current.value.Id = current.value.Id + nuevoId;
                            current.value.Estado = 1;
                            Listo.add(current.value, current.value.Prioridad);
                            DesbloquearProceso(proceso, current.value.Id);
                        } else {
                            current.value.Id = current.value.Id + 5;
                            ProcesoBloqueado(proceso, current.value.Id);
                        }

                    } else if (current.value.Evento == 2) {
                        if (current.value.Id + 5 > current.value.Bloqueo + 27 + (proceso * 1000)) {
                            Bloqueado.deleteInPosotion(current.value);
                            let nuevoId = (current.value.Bloqueo + 27 + (proceso * 1000)) - (current.value.Id);
                            current.value.Id = current.value.Id + nuevoId;
                            current.value.Estado = 1;
                            Listo.add(current.value, current.value.Prioridad);
                            DesbloquearProceso(proceso, current.value.Id);
                        } else {
                            current.value.Id = current.value.Id + 5;
                            ProcesoBloqueado(proceso, current.value.Id);
                        }

                    }
                    proceso++;
                    current = current.next;
                }
            }
        }
    }
}

//Detectar si un proceso se ha ejecutado 3 veces seguidas y bajarle la prioridad
function ProcesosEjecutados() {
    if (ejecutados[ejecutados.length - 1] && ejecutados[ejecutados.length - 2] && ejecutados[ejecutados.length - 3]) {
        if (parseInt((ejecutados[ejecutados.length - 1].toString()).substring(0, 1)) == parseInt((ejecutados[ejecutados.length - 2].toString()).substring(0, 1)) == parseInt((ejecutados[ejecutados.length - 3].toString()).substring(0, 1))) {
            return true;
        }
        return false;
    }
    return false;
}

//Simulación de ejecución de proceso
function EjecutarProceso(proceso, id) {
    var elem = document.getElementById(`myBar-${proceso}`);
    let width = 0;
    let accion = setInterval(Ejecutar, 20);

    function Ejecutar() {
        if (width == 100) {
            clearInterval(accion);
        } else if (width < 50) {
            document.getElementById(`myProgress-${proceso}`).classList.remove('bg-transparent');
            document.getElementById(`myBar-${proceso}`).classList.remove('bg-transparent');
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-warning');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-success');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Ejecutando`;
            document.getElementById(`estado-${proceso}`).innerHTML = `2`;
            width++;
            elem.style.width = (2 * width) + '%';
        } else {
            document.getElementById(`myProgress-${proceso}`).classList.add('bg-transparent');
            document.getElementById(`myBar-${proceso}`).classList.add('bg-transparent');
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-success');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-warning');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Listo`;
            document.getElementById(`estado-${proceso}`).innerHTML = `1`;
            document.getElementById(`id-${proceso}`).innerHTML = `${id}`;
            width++;
        }
    }

}

//Simulación de ejecución y finalización de un proceso
function FinalizarProceso(proceso, id) {
    var elem = document.getElementById(`myBar-${proceso}`);
    let width = 0;
    let accion = setInterval(Finalizar, 20);

    function Finalizar() {
        if (width == 100) {
            clearInterval(accion);
        } else if (width < 50) {
            document.getElementById(`myProgress-${proceso}`).classList.remove('bg-transparent');
            document.getElementById(`myBar-${proceso}`).classList.remove('bg-transparent');
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-warning');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-success');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Ejecutando`;
            document.getElementById(`estado-${proceso}`).innerHTML = `2`;
            width++;
            elem.style.width = (2 * width) + '%';
        } else {
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-success');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-dark');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Finalizado`;
            document.getElementById(`estado-${proceso}`).innerHTML = `4`;
            document.getElementById(`id-${proceso}`).innerHTML = `${id}`;
            document.getElementById(`myProgress-${proceso}`).classList.add('bg-transparent');
            document.getElementById(`myBar-${proceso}`).classList.add('bg-transparent');
            width++;
        }
    }

}

//Simulación de ejecución y Bloqueo de un proceso
function BloquearProceso(proceso, id) {
    var elem = document.getElementById(`myBar-${proceso}`);
    let width = 0;
    let accion = setInterval(Bloquear, 20);

    function Bloquear() {
        if (width == 100) {
            clearInterval(accion);
        } else if (width < 50) {
            document.getElementById(`myProgress-${proceso}`).classList.remove('bg-transparent');
            document.getElementById(`myBar-${proceso}`).classList.remove('bg-transparent');
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-warning');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-success');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Ejecutando`;
            document.getElementById(`estado-${proceso}`).innerHTML = `2`;
            width++;
            elem.style.width = (2 * width) + '%';
        } else {
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-success');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-danger');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Bloqueado`;
            document.getElementById(`estado-${proceso}`).innerHTML = `3`;
            document.getElementById(`id-${proceso}`).innerHTML = `${id}`;
            document.getElementById(`myProgress-${proceso}`).classList.add('bg-transparent');
            document.getElementById(`myBar-${proceso}`).classList.add('bg-transparent');
            width++;
        }
    }
}

//Simulación de desbloqueo de un proceso
function DesbloquearProceso(proceso, id) {
    var elem = document.getElementById(`myBar-${proceso}`);
    let width = 0;
    let accion = setInterval(Desbloquear, 20);

    function Desbloquear() {
        if (width == 100) {
            clearInterval(accion);
        } else if (width < 50) {
            width++;
            elem.style.width = (2 * width) + '%';
        } else {
            document.getElementById(`proceso-${proceso}`).classList.remove('bg-danger');
            document.getElementById(`proceso-${proceso}`).classList.add('bg-warning');
            document.getElementById(`proceso-${proceso}-estado`).innerHTML = `Listo`;
            document.getElementById(`estado-${proceso}`).innerHTML = `1`;
            document.getElementById(`id-${proceso}`).innerHTML = `${id}`;
            width++;

        }
    }
}

function ProcesoBloqueado(proceso, id) {
    var elem = document.getElementById(`myBar-${proceso}`);
    let width = 0;
    let accion = setInterval(frame, 20);

    function frame() {
        if (width == 100) {
            document.getElementById(`id-${proceso}`).innerHTML = `${id}`;
            clearInterval(accion);
        } else {
            width++;
            elem.style.width = (2 * width) + '%';
        }
    }

}

//Borrado del archivo JSON, reinicio de botones y listas enlazadas
function FinalizarSimulacion() {
    document.getElementById('procesos-cards').innerHTML = ``;
    document.getElementById('agregar-proceso').disabled = false;

    $.ajax({
        url: 'php/borrarProcesos.php',
        method: 'get',
        data: '',
        dataType: 'json',
        success: function (msj) {
            console.log(msj);
        },
        error: function (xhr, textStatus, errorMessage) {
            console.log("ERROR " + errorMessage + " " + textStatus + " " + xhr.responseText);

        }
    });
    document.getElementById('btn-accion').innerHTML = ``;
    document.getElementById('btn-accion').innerHTML = `
    <button id="empezar-simulacion" type="button" class="btn btn-primary btn-lg btn-block btn-sm" style="margin: 10px" disabled onclick="EmpezarSimulacion();">Empezar</button>`;
    bloquearAgregar = 0;
    ejecutados = [];
    LimpiarListas();
}

//Borrado de nodos de listas enlazadas
function LimpiarListas(){
    for(let i = 0; i<Nuevo.length()+1; i++ ){
        Nuevo.delete();
    }

    for(let i = 0; i<Listo.length()+1; i++ ){
        Listo.delete();
    }

    for(let i = 0; i<Ejecutando.length()+1; i++ ){
        Ejecutando.delete();
    }

    for(let i = 0; i<Bloqueado.length()+1; i++ ){
        Bloqueado.delete();
    }

    for(let i = 0; i<Finalizado.length()+1; i++ ){
        Finalizado.delete();
    }
}

// ---------------- Nodo de lista enlazada tipo cola ---------------- //
function Node(value, priority) {
    this.value = value;
    this.priority = priority;
    this.next = null;
}

// ------------------- Lista enlazada tipo cola ------------------- //
function LinkedList() {
    this.first = null;
    this.add = LinkedListAdd;
    this.print = LinkedListPrint;
    this.getLast = LinkedListGetLast;
    this.getFirst = LinkedListGetFirst;
    this.delete = LinkedListDelete;
    this.length = LinkedListLenght;
    this.deleteInPosotion = LinkedListDeleteInPosition;
    this.searchPosition = LinkedListSearch;
}

// ---------------------- Agregar a la lista enlazada por prioridad ---------------------- //
function LinkedListAdd(value, newPriority) {
    if (!this.first) {
        this.first = new Node(value, newPriority)
        return true;
    } else {
        if (this.first.priority > newPriority) {
            stack = this.first;
            this.first = new Node(value, newPriority);
            this.first.next = stack;
        } else {
            prev = this.first;
            current = prev.next;
            while (current) {
                if (current.priority > newPriority) {
                    prev.next = new Node(value, newPriority);
                    prev.next.next = current;
                    return true;
                }
                prev = current;
                current = prev.next;
            }
            prev.next = new Node(value, newPriority);
            return true;
        }

    }
    return false;
}

function LinkedListDelete() {
    if (!this.first) {
        return false;
    } else {
        current = this.first;
        this.first = this.first.next;
        return true;
    }
}

function LinkedListDeleteInPosition(value) {
    prev = null;
    current = this.first;
    if (this.first == null) {
        return false;
    } else {
        while (current.value != value && current.next != null) {
            prev = current;
            current = current.next;
        }

        if (current.value == value) {
            if (current == this.first) {
                if (current.next == null) {
                    this.first = null;
                } else {
                    this.first = current.next;
                }
            } else {
                if (current.next == null) {
                    prev.next = null;
                } else {
                    prev.next = current.next;
                }

            }

        }

    }

}

function LinkedListPrint() {
    let current = this.first;
    while (current.next) {
        console.log(current.value);
        current = current.next;
    }
    console.log(current.value);
}

function LinkedListGetFirst() {
    return this.first;
}

function LinkedListGetLast() {
    let last = this.first;
    while (last.next) {
        last = last.next;
    }
    return last;
}

function LinkedListLenght() {
    count = 0;
    current = this.first;
    while (current) {
        count++;
        current = current.next;
    }
    return count;
}

function LinkedListSearch(value) {
    count = 0;
    current = this.first;
    while (current.next) {
        if (current.value == value) {
            return count;
        }
        count++;
        current = current.next;
    }
}