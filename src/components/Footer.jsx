import React from 'react';

export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="text-light mt-auto">
            <div className="container">
                <hr className="border-secondary" />
                <div className="row py-3">
                    <div className="col-md-6">
                        <p className="mb-0 text-muted">
                            © {currentYear} TodoApp. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0 text-muted">
                            Desarrollado por Alexi Torres usando React
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}