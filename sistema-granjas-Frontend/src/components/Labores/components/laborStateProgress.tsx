// src/components/Labores/DetallesLaborModal/components/LaborStateProgress.tsx
import React from 'react';
import BadgeEstado from './shared/badgeEstado';
import ProgressBar from './shared/progressBar';

interface LaborStateProgressProps {
    data: any;
}

const LaborStateProgress: React.FC<LaborStateProgressProps> = ({ data }) => {
    return (
        <div className="bg-white border rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
                <i className="fas fa-chart-line mr-2 text-blue-500"></i>
                Estado y Progreso
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium">Estado:</span>
                    <BadgeEstado estado={data.estado} />
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Progreso:</span>
                        <span className="font-bold">{data.avance_porcentaje}%</span>
                    </div>
                    <ProgressBar porcentaje={data.avance_porcentaje} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="font-medium">Fecha asignación:</span>
                        <p className="text-gray-700">
                            {new Date(data.fecha_asignacion).toLocaleString()}
                        </p>
                    </div>
                    {data.fecha_finalizacion && (
                        <div>
                            <span className="font-medium">Fecha finalización:</span>
                            <p className="text-gray-700">
                                {new Date(data.fecha_finalizacion).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LaborStateProgress;