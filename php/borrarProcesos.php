<?php
    //Obtener lo que contenga el archivo de texto plano
    $contenidoArchivo = file_get_contents('../procesos.json');
    $procesos = json_decode($contenidoArchivo,true);

    //Vaciar el arreglo asociativo obtenido del archivo
    $vacio[] = array_splice($procesos, 0, count($procesos));
    $archivo = fopen('../procesos.json','w');//r: Lectura, w: Escritura, a+: Anexar
    fwrite($archivo, json_encode($procesos));
    fclose($archivo);

    //Respuesta del servidor
    echo json_encode($procesos);
?>