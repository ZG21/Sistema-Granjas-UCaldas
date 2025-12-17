// src/components/Labores/DetallesLaborModal/components/shared/BadgeMovimiento.tsx
import React from 'react';

interface BadgeMovimientoProps {
    tipo: string;
}

const BadgeMovimiento: React.FC<BadgeMovimientoProps> = ({ tipo }) => {
    const tipos = {
        entrada: { color: 'bg-green-100 text-green-800', icon: 'fas fa-arrow-down', label: 'Entrada' },
        salida: { color: 'bg-red-100 text-red-800', icon: 'fas fa-arrow-up', label: 'Salida' },
        devolucion: { color: 'bg-blue-100 text-blue-800', icon: 'fas fa-undo', label: 'Devolución' }
    };

    const config = tipos[tipo] || { color: 'bg-gray-100 text-gray-800', icon: 'fas fa-exchange-alt', label: tipo };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
            <i className={`${config.icon} mr-1`}></i>
            {config.label}
        </span>
    );
};

export default BadgeMovimiento;