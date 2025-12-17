// src/components/Labores/DetallesLaborModal/components/shared/BadgeEstado.tsx
import React from 'react';

interface BadgeEstadoProps {
    estado: string;
}

const BadgeEstado: React.FC<BadgeEstadoProps> = ({ estado }) => {
    const estados: Record<string, { color: string; icon: string }> = {
        pendiente: { color: 'bg-yellow-100 text-yellow-800', icon: 'fas fa-clock' },
        en_progreso: { color: 'bg-blue-100 text-blue-800', icon: 'fas fa-spinner' },
        completada: { color: 'bg-green-100 text-green-800', icon: 'fas fa-check-circle' },
        cancelada: { color: 'bg-red-100 text-red-800', icon: 'fas fa-times-circle' }
    };

    const config = estados[estado] || { color: 'bg-gray-100 text-gray-800', icon: 'fas fa-question-circle' };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
            <i className={`${config.icon} mr-2`}></i>
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
        </span>
    );
};

export default BadgeEstado;