import React, { useState, useRef } from "react";
import { v4 as uuid } from 'uuid'
import { TodoItem } from "./TodoItem";
import { Fragment } from "react";

export function TodoList(){
    const [todos,setTodos] = useState([]);

    const taskRef = useRef();

    const agregarTarea = () => {
        console.log("AGREGANDO TAREA");
        const task = taskRef.current.value;
        
        if (task === '')return;

        setTodos((prevTodos) => {
            const newTask = {
                id:uuid(),   // para instalar esta función  npm install uuid  y se debe importar 
                task: task,
                completed:false   //  para registrar si la tarea si se completo la tarea o se encuentra pendiente.

            }

            //Agregamos la trea al hisotrial
            agregarHistorial('Agregada','Tarea',task);

            return [...prevTodos,newTask]
        })

    };

    const ResumenTareas = () =>{    //  COMPONENTE LOCAL Resumen Tarea
        const cant = cantidadTareas()
        if (cant == 0) {
            return(
                <div className="alert alert-success mt-3">
                    <h2>RESUMEN TAREAS </h2>
                    <h3>Felicitaciones no tienes tareas pendientes </h3>
                </div>
                )

        }
        
        if (cant == 1) {
            return(
                <div className="alert alert-info mt-3">
                    <h2>RESUMEN TAREAS </h2>
                    <h3>Queda solamente una tarea pendiente : {cant}</h3>
                </div>
                )

        }
      return(
                <div className="alert alert-info mt-3">
                    <h2>RESUMEN TAREAS </h2>
                    <h3>Tareas pendientes : {cant}</h3>
      </div>)

    };

    const cantidadTareas = () =>{   // Tareas Pendientes
        return todos.filter((todo)=> !todo.completed).length;
    };

    const cambiarEstadoTarea = (id) => {
        console.log(id)      
         const newTodos = [...todos];  //   Hace una copia de elemento     
         const todo = newTodos.find((todo)=> todo.id === id)
         const acctionAnterior = todo.completed;
         todo.completed = !todo.completed;

         //Actualizamos el historial
         if(!acctionAnterior && todo.completed){
             agregarHistorial('Completada','Tarea',todo.task);
         }else if(acctionAnterior && !todo.completed){
             agregarHistorial('Pendiente','Tarea',todo.task);
         }

         setTodos(newTodos)   
    };

    const eliminarTareasCompletadas=()=> {
        const tareasCompletadas = todos.filter((todo) => todo.completed);
        const cantidadEliminadas = tareasCompletadas.length;

        //Actualizamos el historial
        if(cantidadEliminadas > 0){
            agregarHistorial('Eliminada','Tarea',cantidadEliminadas + ' Tareas');
        }

        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    const cantidadCompletadas = () =>{  // Tareas Completadas  
        return todos.filter((todo)=> todo.completed).length;
    };

    const [historial,setHistorial] = useState([
        {
            id:uuid(),
            accion:'Session iniciada',
            tipo:'inicio',
            descripcion:'Aplicacion TotoApp Iniciada',
            fecha:new Date()
        }
    ]);

    const agregarHistorial = (accion,tipo,descripcion) => {
        const nuevoRegistro = {
            id:uuid(),
            accion:accion,
            tipo:tipo,
            descripcion:descripcion,
            fecha:new Date()
        };
        setHistorial((prevHistorial)=>[nuevoRegistro,...prevHistorial]);
    };

    const formateoHora = (timestamp) => {
        return timestamp.toLocaleTimeString('es-ES', 
            {  hour12: false, 
               hour: '2-digit', 
               minute: '2-digit' 

            });
    }

    const tiempoTranscurrido = (timestamp) => {
        const ahora = new Date();
        const diferencia = Math.floor((ahora - timestamp) / 60000); // convertimos a minutos

        if (diferencia < 1) return 'Reciencito';
        if (diferencia === 1) return 'Hace 1 minuto';
        if (diferencia < 60) return 'Hace ' + diferencia + ' minutos';

        const horas = Math.floor(diferencia / 60);
        if (horas === 1) return 'Hace 1 hora';
        return 'Hace ' + horas + ' horas';
    };

    // COMPONENTE INTERNO: HistorialTareas
    const HistorialTareas = () => {
        const getIconoTipo = (tipo) => {
            switch(tipo) {
                case 'agregada': return '📝';
                case 'completada': return '✅';
                case 'pendiente': return '⏳';
                case 'eliminada': return '🗑️';
                case 'inicio': return '🚀';
                default: return '📋';
            }
        };

        const getColorTipo = (tipo) => {
            switch(tipo) {
                case 'agregada': return 'border-primary bg-light';
                case 'completada': return 'border-success bg-light';
                case 'pendiente': return 'border-warning bg-light';
                case 'eliminada': return 'border-danger bg-light';
                case 'inicio': return 'border-info bg-light';
                default: return 'border-secondary bg-light';
            }
        };

        return (
            <div className="card" style={{ height:'calc(100vh - 350px)' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">📚 Historial de Tareas</h5>
                    <small className="text-muted d-block text-center mb-3">
                        Registro de toda la actividad de la sesión
                    </small>
                    
                    <div>
                        {historial.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-muted small">No hay actividad registrada</p>
                            </div>
                        ) : (
                            historial.map((registro) => (
                                <div 
                                    key={registro.id} 
                                    className={`border-start border-3 ps-3 pe-2 py-2 mb-3 rounded-end ${getColorTipo(registro.tipo)}`}
                                >
                                    <div className="d-flex align-items-start">
                                        <span className="me-2">{getIconoTipo(registro.tipo)}</span>
                                        <div className="flex-grow-1">
                                            <div className="fw-bold small">
                                                {registro.accion}: {registro.descripcion}
                                            </div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                {tiempoTranscurrido(registro.fecha)} - {formateoHora(registro.fecha)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // COMPONENTE LOCAL: EstadisticasActuales 
    const EstadisticasActuales = () => {
        const total = todos.length;
        const completadas = cantidadCompletadas();
        const pendientes = cantidadTareas();
        const porcentaje = total > 0 ? ((completadas / total) * 100).toFixed(1) : 0;

        return (
            <div className="card mt-4">
                <div className="card-body">
                    {/* <h5 className="card-title text-center mb-4">📊 Estadísticas Actuales</h5> */}
                    
                    {/* Contadores */}
                    <div className="row text-center mb-4">
                        <div className="col-4">
                            <div className="border rounded p-3">
                                <h6 className="text-primary mb-1">{total}</h6>
                                <small className="text-muted">Total Actuales</small>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="border rounded p-3">
                                <h6 className="text-success mb-1">{completadas}</h6>
                                <small className="text-muted">Completadas</small>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="border rounded p-3">
                                <h6 className="text-warning mb-1">{pendientes}</h6>
                                <small className="text-muted">Pendientes</small>
                            </div>
                        </div>
                    </div>

                    {/* Barra de progreso */}
                    <div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Progreso actual</span>
                            <span>{porcentaje}%</span>
                        </div>
                        <div className="progress">
                            <div 
                                className="progress-bar bg-success" 
                                role="progressbar" 
                                style={{ width: `${porcentaje}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Mensaje motivacional */}
                    {pendientes === 0 && total > 0 && (
                        <div className="alert alert-success mt-3 mb-0">
                            🎉 ¡Felicitaciones! Has completado todas tus tareas
                        </div>
                    )}
                    {pendientes > 0 && (
                        <div className="alert alert-info mt-3 mb-0">
                            💪 ¡Sigue así! Te quedan {pendientes} tarea{pendientes > 1 ? 's' : ''} por completar
                        </div>
                    )}
                </div>
            </div>
        );
    };


    return(

        <Fragment>
            <div className="row">
                <div className="col-lg-8">
                    <h1>Listado de Tareas</h1>
                    <div className="input-group mt-4 mb-4">
                        <input className="form-control" ref={taskRef} placeholder="Agregar Tarea" type="text"></input>
                        <button onClick={agregarTarea} className="btn btn-success ms-2" >+</button>
                        <button onClick={eliminarTareasCompletadas} className="btn btn-danger ms-2" >-</button>
                    </div>

                    <ul className="list-group" style={{ height:'calc(100% - 630px)' }}>
                        {todos.map((todo) =>(
                            <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea} ></TodoItem>
                        ))}
                    </ul>

                    <ResumenTareas/> {/* Nuevo Compontente  "Local" */}                    
                    <EstadisticasActuales/>
                </div>
                <div className="col-lg-4">
                    {/* Componente INTERNO: HistorialTareas */}
                    <HistorialTareas/>
                </div>                
            </div>
         </Fragment>
    );
}
