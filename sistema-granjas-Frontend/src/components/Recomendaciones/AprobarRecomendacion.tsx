// src/components/Recomendaciones/AprobarRecomendacionModal.tsx
import React, { useState } from 'react';
import Modal from '../Common/Modal';

interface AprobarRecomendacionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAprobar: (observaciones: string) => void;
    onRechazar?: (observaciones: string) => void;
    tituloRecomendacion: string;
}

const AprobarRecomendacionModal: React.FC<AprobarRecomendacionModalProps> = ({
    isOpen,
    onClose,
    onAprobar,
    onRechazar,
    tituloRecomendacion
}) => {
    const [observaciones, setObservaciones] = useState('');
    const [accion, setAccion] = useState<'aprobar' | 'rechazar' | null>(null);

    const handleSubmit = () => {
        if (accion === 'aprobar') {
            onAprobar(observaciones);
        } else if (accion === 'rechazar' && onRechazar) {
            onRechazar(observaciones);
        }
        resetAndClose();
    };

    const resetAndClose = () => {
        setObservaciones('');
        setAccion(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} width="max-w-md">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                    {accion ? (accion === 'aprobar' ? 'Aprobar Recomendación' : 'Rechazar Recomendación') : 'Acción sobre Recomendación'}
                </h2>

                {!accion ? (
                    <div>
                        <p className="mb-4">Selecciona una acción para: <strong>{tituloRecomendacion}</strong></p>
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={() => setAccion('aprobar')}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                            >
                                <i className="fas fa-check mr-2"></i>
                                Aprobar
                            </button>
                            {onRechazar && (
                                <button
                                    onClick={() => setAccion('rechazar')}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                                >
                                    <i className="fas fa-times mr-2"></i>
                                    Rechazar
                                </button>
                            )}
                        </div>
                        <button
                            onClick={resetAndClose}
                            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4">
                            Estás por <strong>{accion === 'aprobar' ? 'aprobar' : 'rechazar'}</strong> esta recomendación.
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Observaciones (opcional)
                            </label>
                            <textarea
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                className="w-full border rounded p-2"
                                rows={3}
                                placeholder="Ej: Recomendación aprobada tras revisión del lote..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmit}
                                className={`flex-1 py-2 rounded-lg text-white ${accion === 'aprobar'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                Confirmar {accion === 'aprobar' ? 'Aprobación' : 'Rechazo'}
                            </button>
                            <button
                                onClick={() => setAccion(null)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
                            >
                                Atrás
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AprobarRecomendacionModal; 