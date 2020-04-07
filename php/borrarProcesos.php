<?php
$contenidoArchivo = file_get_contents('../procesos.json');
$procesos = json_decode($contenidoArchivo,true);
    $vacio[] = array_splice($procesos, 0, count($procesos));
    $archivo = fopen('../procesos.json','w');//r: Lectura, w: Escritura, a+: Anexar
    fwrite($archivo, json_encode($procesos));
    fclose($archivo);
    echo json_encode($procesos);
?>