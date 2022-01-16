<div align="center">
    <img src="https://www.areatecnologia.com/informatica/imagenes/so.jpg" width="300px"> </img> 
    
<!-- Encabezado -->
### IS412 - 1900 - Sistemas Operativos I
### I PAC - 2020
#### Proyecto Web
#### Autors 

| Nombre | Numero De Cuenta |
|:-------------:| :-----:|
| Edgar Josué Benedetto Godoy | ```20171033802``` |

</div>

_____
_____

### Descripción del Proyecto:
* Basado en el **modelo de 5 estados** desarrollar un gestor que planifique y ejecute procesos que 
estará representado por la siguiente codificación:

<br>

|Espacios| Información Contenida | Observación |
|:------:|:---------------------:|:-----------:|
|4| Id del proceso| |
|1| Estado del proceso | Abajo descrito el número que representa cada estado |
|1| Prioridad | Valores (1,2,3) |
|3| Cantidad de Instrucciones | |
|3| Instrucción de Bloqueo | Núm. de instrucción donde se iniciará el bloqueado del proceso |
|1| Evento | Evento que generará el bloqueo --> 3 = E/S 13 ciclos --> 5 = Disco duro 27 ciclos |

<br>

* Cada dato del proceso ira separado por el carácter “/” y cada proceso será separado del otro por el carácter “;”

### Ejemplo: 
   ```
   1001/0/1/84/52/5;
   ```

### Descripción de este proceso:
| Num | Descripción |
|:----:|:--------------:|
| 1001 | Id del proceso |
| 0 | Estado del proceso |
| 1 | Prioridad |
| 84 | Cantidad de Instrucciones |
| 52 | Núm. de instrucción donde se iniciará el bloqueado delproceso |
| 5 | Evento por el que espera (Disco Duro 27ciclos)|

______

## Evaluación
### Generalidades (valor 2 puntos c/u)
  1. La información de los procesos deberá ser almacenada en unBCP
  2. Los procesos estarán almacenados en un archivo de textoplano
  3. El usuario indicara cuantos ciclos del procesador necesitautilizar
  4. El procesador manejara un temporizador de 5 ciclos
  5. Se deben representar por lo menos 5 TDA’s que contengan los procesos en los estados de 
  Nuevo(0), Listos(1), Ejecutando (2), Bloqueado(3) y Saliente(4)
  6. Cada proceso manejara una prioridad, siendo la prioridad 1 la más alta y la prioridad 3 la 
  más baja
  7. Si el mismo proceso está siendo ejecutado durante 3 segmentos seguidos, el gestor 
  deberá bajar la prioridad y continuar con otros procesos de la lista
  8. La ejecución dentro del procesador se simulará por medio de una estructura de repetición
  9. El gestor podrá manejar desde 1 hasta 10 procesos
### Manual técnico (valor 5 puntos):
   * Manual de estándares.
   * Funcionalidades con sus respectivos comentarios.
   * Es recomendado usar el estándar “Camel Case”.
### Manual de usuario (valor 2 puntos)

_______

### Mockups

* Portada del proyecto 
* Input de los ciclos del procesador

![Mockup Input](https://drive.google.com/uc?export=view&id=1hfhZ09lGavX9V2cwP6rVPAiXHUBfaxrv)

* Procesos inactivos

![Mockup Output 1](https://drive.google.com/uc?export=view&id=1KhVzW2iYAt0zj2wtMKCOCGtDRJNkxqnN)

* Procesos activos

![Mockup Output 2](https://drive.google.com/uc?export=view&id=1UvViDuQXe2wfFqAwTLlI_OrWo3QCjRSy)

### Enlaces

[Video Explicativo](https://drive.google.com/file/d/1NFPWSazf14hiZbuWL0rKMNQefAU4JsUp/view?usp=sharing)