// src/components/Labores/DetallesLaborModal/components/shared/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
    porcentaje: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ porcentaje }) => {
    let color = 'bg-red-500';
    if (porcentaje >= 75) color = 'bg-green-500';
    else if (porcentaje >= 50) color = 'bg-yellow-500';
    else if (porcentaje >= 25) color = 'bg-blue-500';

    return (
        <div className="w-full bg-gray-200 rounded-full h-4">
            <div
                className={`${color} h-4 rounded-full flex items-center justify-center`}
                style={{ width: `${Math.min(100, Math.max(0, porcentaje))}%` }}
            >
                <span className="text-xs font-bold text-white">{porcentaje}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;