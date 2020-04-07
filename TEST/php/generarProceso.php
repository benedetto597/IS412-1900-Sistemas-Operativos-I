<?php 
    sleep(3);
    include('proceso.php');


    $_POST = json_decode(file_get_contents("php://input"),true); 
    $ciclos=$_POST;
    $ciclo = $ciclos['ciclosUsar'];
    $instrucciones = intval($ciclo);
    $instruccionDeBloqueo = $instrucciones - (30);
    $prioridad=rand(1,3);
    $opciones=array(0,3,5);
    $estado = 0;
    $evento=array_rand($opciones,1);
    $bloqueo = rand(1,$instruccionDeBloqueo);
    $tamanioArchivo = '../procesos.json';

    if (filesize($tamanioArchivo) > 0){
        $contenidoArchivo = file_get_contents('../procesos.json');
        $procesos = json_decode($contenidoArchivo,true);
        $id = (sizeof($procesos) + 1) * 1000 + 1;
        $nuevoProceso = new Proceso($id, $estado, $prioridad, $instrucciones, $bloqueo, $evento);
        $retornarProceso = array('Id' => $nuevoProceso->getId(),'Estado' => $nuevoProceso->getEstado(),'Prioridad' => $nuevoProceso->getPrioridad(), 'Instrucciones' => $nuevoProceso->getInstrucciones(),'Bloqueo' => $nuevoProceso->getBloqueo(), 'Evento' => $nuevoProceso->getEvento());
        $procesos[] = $retornarProceso;
        $nuevoProceso->escribirProcesos($procesos);
    }else{
        $id = 1001;
        $nuevoProceso = new Proceso($id, $estado, $prioridad, $instrucciones, $bloqueo, $evento);
        $retornarProceso[] = array('Id' => $nuevoProceso->getId(),'Estado' => $nuevoProceso->getEstado(),'Prioridad' => $nuevoProceso->getPrioridad(), 'Instrucciones' => $nuevoProceso->getInstrucciones(),'Bloqueo' => $nuevoProceso->getBloqueo(), 'Evento' => $nuevoProceso->getEvento());
        $nuevoProceso->escribirProcesos($retornarProceso);
    }
    echo json_encode($retornarProceso);

        ?>