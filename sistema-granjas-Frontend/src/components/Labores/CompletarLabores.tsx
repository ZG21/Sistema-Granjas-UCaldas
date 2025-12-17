// src/components/Labores/CompletarLaborModal.tsx
import React, { useState } from 'react';
import Modal from '../Common/Modal';

interface CompletarLaborModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCompletar: (comentario: string) => void;
    tituloLabor: string;
}

const CompletarLaborModal: React.FC<CompletarLaborModalProps> = ({
    isOpen,
    onClose,
    onCompletar,
    tituloLabor
}) => {
    const [comentario, setComentario] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            await onCompletar(comentario);
            resetAndClose();
        } catch (error) {
            console.error('Error completando labor:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const resetAndClose = () => {
        setComentario('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} width="max-w-md">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                    Completar Labor
                </h2>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        Estás por marcar como completada la labor:
                        <strong className="ml-1">{tituloLabor}</strong>
                    </p>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Comentario de finalización (opcional)
                        </label>
                        <textarea
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            className="w-full border rounded p-3"
                            rows={4}
                            placeholder="Describe el trabajo realizado, observaciones, resultados..."
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Completando...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-check-circle mr-2"></i>
                                    Marcar como Completada
                                </>
                            )}
                        </button>
                        <button
                            onClick={resetAndClose}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 rounded-lg font-medium"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CompletarLaborModal;