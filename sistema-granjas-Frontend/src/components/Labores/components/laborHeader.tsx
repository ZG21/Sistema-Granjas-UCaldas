// src/components/Labores/DetallesLaborModal/components/LaborHeader.tsx
import React from 'react';
import BadgeEstado from './shared/badgeEstado';

interface LaborHeaderProps {
    data: any;
    trabajadorInfo: any;
    loteInfo: any;
    onClose: () => void;
}

const LaborHeader: React.FC<LaborHeaderProps> = ({
    data,
    trabajadorInfo,
    loteInfo,
    onClose
}) => {
    return (
        <div className="flex justify-between items-start mb-6 pb-4 border-b">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Labor #{data.id} - {data.tipo_labor_nombre || data.tipo_labor}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                    <BadgeEstado estado={data.estado} />
                    <span className="text-gray-600">
                        <i className="fas fa-user mr-1"></i>
                        {trabajadorInfo?.nombre || data.trabajador_nombre || `ID: ${data.trabajador_id}`}
                    </span>
                    <span className="text-gray-600">
                        <i className="fas fa-th-large mr-1"></i>
                        {loteInfo?.nombre || data.lote_nombre || `Lote ${data.lote_id}`}
                    </span>
                </div>
            </div>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
    );
};

export default LaborHeader;