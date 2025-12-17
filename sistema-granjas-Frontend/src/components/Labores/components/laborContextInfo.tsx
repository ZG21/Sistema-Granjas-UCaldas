// src/components/Labores/DetallesLaborModal/components/LaborContextInfo.tsx
import React from 'react';

interface LaborContextInfoProps {
    contextData: {
        loteInfo: any;
        granjaInfo: any;
        trabajadorInfo: any;
        recomendacionInfo: any;
    };
    data: any;
}

const LaborContextInfo: React.FC<LaborContextInfoProps> = ({ contextData, data }) => {
    const { loteInfo, granjaInfo, trabajadorInfo, recomendacionInfo } = contextData;

    return (
        <div className="bg-white border rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
                <i className="fas fa-info-circle mr-2 text-purple-500"></i>
                Información de Contexto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <span className="font-medium text-gray-700">Trabajador:</span>
                    <p className="text-gray-900 font-semibold">
                        {trabajadorInfo?.nombre || data.trabajador_nombre || `ID: ${data.trabajador_id}`}
                    </p>
                    {trabajadorInfo?.email && (
                        <p className="text-sm text-gray-600">{trabajadorInfo.email}</p>
                    )}
                </div>
                <div>
                    <span className="font-medium text-gray-700">Lote:</span>
                    <p className="text-gray-900 font-semibold">
                        {loteInfo?.nombre || data.lote_nombre || `Lote ${data.lote_id}`}
                    </p>
                    {granjaInfo?.nombre && (
                        <p className="text-sm text-gray-600">Granja: {granjaInfo.nombre}</p>
                    )}
                </div>
                {recomendacionInfo && (
                    <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Recomendación asociada:</span>
                        <div className="mt-1 p-3 bg-blue-50 rounded border border-blue-200">
                            <p className="font-semibold text-blue-800">
                                #{recomendacionInfo.id} - {recomendacionInfo.titulo}
                            </p>
                            <p className="text-sm text-blue-600 mt-1">
                                {recomendacionInfo.descripcion?.substring(0, 100)}...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LaborContextInfo;