<?php 

// -------------------------------- BCP Proceso -------------------------------- //
    class Proceso{
        private $estado;
        private $id;
        private $prioridad;
        private $instrucciones;
        private $bloqueo;
        private $evento;

        public function __construct(
            $id,
            $estado,
            $prioridad,
            $instrucciones,
            $bloqueo,
            $evento
            ){
                $this->id = $id;
                $this->estado = $estado;
                $this->prioridad = $prioridad;
                $this->instrucciones = $instrucciones;
                $this->bloqueo = $bloqueo;
                $this->evento = $evento;
        }
        
    
                 
                public function getId(){
                                return $this->id;
                }

                 
                public function setId($id){
                                $this->id = $id;

                                return $this;
                }

                 
                public function getEstado(){
                                return $this->estado;
                }

                 
                public function setEstado($estado){
                                $this->estado = $estado;

                                return $this;
                }

                 
                public function getPrioridad(){
                                return $this->prioridad;
                }

                 
                public function setPrioridad($prioridad){
                                $this->prioridad = $prioridad;

                                return $this;
                }

                 
                public function getInstrucciones(){
                                return $this->instrucciones;
                }

                 
                public function setInstrucciones($instrucciones){
                                $this->instrucciones = $instrucciones;

                                return $this;
                }

                 
                public function getBloqueo(){
                                return $this->bloqueo;
                }

                 
                public function setBloqueo($bloqueo){
                                $this->bloqueo = $bloqueo;

                                return $this;
                }

                 
                public function getEvento(){
                                return $this->evento;
                }

                 
                public function setEvento($evento){
                                $this->evento = $evento;

                                return $this;
                }

                public function escribirProcesos($procesos){
                    $archivo = fopen('../procesos.json','w');//r: Lectura, w: Escritura, a+: Anexar
                    fwrite($archivo, json_encode($procesos));
                    fclose($archivo);
                }
        
    }
?>