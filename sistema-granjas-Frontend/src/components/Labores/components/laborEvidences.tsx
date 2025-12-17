// src/components/Labores/DetallesLaborModal/components/LaborEvidences.tsx
import React from 'react';

interface LaborEvidencesProps {
    evidencias: any[];
}

const LaborEvidences: React.FC<LaborEvidencesProps> = ({ evidencias }) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-gray-800 flex items-center">
                    <i className="fas fa-folder-open mr-2 text-blue-500"></i>
                    Evidencias ({evidencias.length})
                </h3>
                <span className="text-sm text-gray-500">
                    {evidencias.length} archivo{evidencias.length !== 1 ? 's' : ''} adjunto{evidencias.length !== 1 ? 's' : ''}
                </span>
            </div>

            {evidencias.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded">
                    <i className="fas fa-image text-3xl text-gray-300 mb-2"></i>
                    <p className="text-gray-500">No hay evidencias registradas</p>
                    <p className="text-sm text-gray-400 mt-1">No se han adjuntado fotos o documentos a esta labor</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {evidencias.map((e) => (
                        <div key={e.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                            <div className="p-3 bg-gray-50 border-b">
                                <div className="flex items-center">
                                    <i className={`fas fa-${e.tipo === 'imagen' ? 'image' : e.tipo === 'video' ? 'video' : 'file-alt'} mr-2 text-blue-500`}></i>
                                    <span className="font-medium capitalize">{e.tipo}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 truncate">
                                    {e.descripcion}
                                </p>
                                {e.creado_por_nombre && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Subido por: {e.creado_por_nombre}
                                    </p>
                                )}
                            </div>
                            <div className="p-3">
                                <a
                                    href={e.url_archivo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                                >
                                    <i className="fas fa-external-link-alt mr-1"></i>
                                    Ver archivo
                                </a>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(e.fecha_creacion).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LaborEvidences;