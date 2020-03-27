<?php  
    $ciclos=$_POST;
    $instrucciones = intval($ciclos['ciclos']);
    $instruccionDeBloqueo = $instrucciones - (30);
    $prioridad=rand(1,3);
    $opciones=array(0,3,5);
    $evento=array_rand($opciones,1);
    $bloqueo = rand(1,$instruccionDeBloqueo);
    $tamanioArchivo = '../procesos.json';

        
        if (filesize($tamanioArchivo) > 0){
            $contenidoArchivo = file_get_contents('../procesos.json');
            $proceso = json_decode($contenidoArchivo,true);
            $id = (sizeof($proceso) + 1) * 1000 + 1;
            $nuevoProceso = array('Id' => $id,'Estado' => 0,'Prioridad' => $prioridad, 'Instrucciones' => $instrucciones,'Bloqueo' => $bloqueo, 'Evento' => $evento );
            $proceso[] = $nuevoProceso;
            $archivo1 = fopen('../procesos.json','w');//r: Lectura, w: Escritura, a+: Anexar
            fwrite($archivo1, json_encode($proceso));
            fclose($archivo1);
        }else{
            $id = 1001;
            $nuevoProceso = array('Id' => $id,'Estado' => 0,'Prioridad' => $prioridad, 'Instrucciones' => $instrucciones,'Bloqueo' => $bloqueo, 'Evento' => $evento );
            $guardarProceso[] = $nuevoProceso;
            $archivo2 = fopen('../procesos.json','w');//r: Lectura, w: Escritura, a+: Anexar
            fwrite($archivo2, json_encode($guardarProceso));
            fclose($archivo2);
        }
?>