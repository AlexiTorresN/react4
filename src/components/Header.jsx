import React from 'react';

export function Header() {

    // generamos un evento para el reinicio de la pagina
    const handlRestart = (e) => {
        e.preventDefault();

        // generamos un popup para confirmar el reinicio
        const respuesta = confirm(
                                    '🔄 ¿Reiniciar TodoApp?\n\n' +
                                    '⚠️  Se perderán:\n' +
                                    '• Todas las tareas actuales\n' +
                                    '• El historial de actividad\n' +
                                    '• Las estadísticas\n\n' +
                                    '¿Continuar?'            
                                    );

        if (respuesta) {
            // reiniciamos la aplicación
            window.location.reload();
        }
    };

    return (
        <header className="bg-primary text-white">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand fw-bold" 
                       href="#"
                       onClick={handlRestart}
                       >
                        📝 TodoApp
                    </a>
                </div>
            </nav>
            
            <div className="bg-primary">
                <div className="container text-center">
                    <h1 className="h2 fw-bold mb-2">Gestor de Tareas</h1>
                    <p className="lead mb-0">Organiza tu día y alcanza tus objetivos</p>
                </div>
            </div>
        </header>
    );
}