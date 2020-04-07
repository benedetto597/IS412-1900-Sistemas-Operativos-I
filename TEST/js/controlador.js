//Contador de procesos agregados
function GenerarProceso(){
    let ciclos = { ciclosUsar:document.getElementById('ciclos-usar').value }
    $.ajax({
        url:'../php/generarProceso.php',
        method:'post',
        data:JSON.stringify(ciclos),
        dataType:'json',
        success:function(proceso){
            console.log('(Ajax JQUERY) Repuesta del servidor', proceso);
            console.log("Debo aparecer después");
        },
        error:function(error){
            console.error(error);
        }
    });
}

var json = {"Id":1000,"Estado":0,"Prioridad":2,"Instrucciones":134,"Bloqueo":0,"Evento":0};
var json1 = {"Id":2000,"Estado":0,"Prioridad":1,"Instrucciones":134,"Bloqueo":0,"Evento":0};
var json2 = {"Id":2000,"Estado":0,"Prioridad":3,"Instrucciones":134,"Bloqueo":0,"Evento":0};
var json3 = {"Id":2000,"Estado":0,"Prioridad":2,"Instrucciones":134,"Bloqueo":0,"Evento":0};
// ---------------- Nodo de lista enlazada tipo cola por prioridad ---------------- //
function Node(value, priority) {
    this.value = value;
    this.priority = priority;
    this.next = null; 
}

// ------------------- Lista enlazada tipo cola por prioridad ------------------- //
function LinkedList() {
    this.first = null;
    this.push = LinkedListPush;
    this.print = LinkedListPrint;
    this.getLast = LinkedListGetLast;
    this.getFirst = LinkedListGetFirst;
    this.delete = LinkedListDelete;
    this.length = LinkedListLenght;
    this.deleteInPosition = LinkedListDeleteInPosition;
}

function LinkedListPush(value,newPriority) {
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

function LinkedListDelete(value) {
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
            if (current == self.first) {
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
    current = this.first;
    while (current.next) {
        console.log(current.priority);
        current = current.next;
    }
    console.log(current.priority);
}

function LinkedListGetFirst() {
    current =  this.first;
    while(current){
        if (current.priority == 1){
            return current;
        }
        current = current.next;
    }
}

function LinkedListGetFirstTwo() {
    current =  this.first;
    while(current){
        if (current.priority == 2){
            return current;
        }
        current = current.next;
    }
}

function LinkedListGetFirstThree() {
    current =  this.first;
    while(current){
        if (current.priority == 3){
            return current;
        }
        current = current.next;
    }
}

function LinkedListGetLast() {
    last = this.first;
    while (last.next) {
        last = last.next;
    }
    return last;
}

function LinkedListLenght(){
    count = 0;
    current = this.first;
    while(current){
        current = current.next;
        count++;
    }
    return count;
}

var Nuevo = new LinkedList();
Nuevo.push(json, json.Prioridad);
Nuevo.push(json1, json1.Prioridad);
Nuevo.push(json2, json2.Prioridad);
Nuevo.push(json3, json3.Prioridad);

console.log(Nuevo.print());

/*           
function sleep1(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  console.log("Hello");
  sleep1(2000).then(() => { console.log("World!"); });

  console.log("Hello");

  
  console.log("Hello");
    sleep(2000)
    .then(() => { console.log("World!"); })
    .then(() => {
        sleep(2000)
        .then(() => { console.log("Goodbye!"); })
        });


        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          
          async function delayedGreeting() {
            console.log("Hello");
            await sleep(2000);
            console.log("World!");
            await sleep(2000);
            console.log("Goodbye!");
          }
          
          delayedGreeting();

          function sleep(miliseconds) {
            var currentTime = new Date().getTime();
         
            while (currentTime + miliseconds >= new Date().getTime()) {
               
            }
         }

function Do(n){
    if(n == 1 || n == 2 || n == 3 || n == 4 ){
        sleep(500);
        document.getElementById('agregar-proceso').innerHTML = `proceso-${n}`;
        return Do(n+1);
    }else{
        return n;
    }
}

*/