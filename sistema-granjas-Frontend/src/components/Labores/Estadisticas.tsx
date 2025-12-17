// src/components/Labores/EstadisticasLaboresModal.tsx
import React, { useState, useEffect } from 'react';
import type { EstadisticasLabores } from '../../types/laboresTypes';
import laborService from '../../services/laboresService';
import Modal from '../Common/Modal';

interface EstadisticasLaboresModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EstadisticasLaboresModal: React.FC<EstadisticasLaboresModalProps> = ({ isOpen, onClose }) => {
    const [estadisticas, setEstadisticas] = useState<EstadisticasLabores | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            loadEstadisticas();
        }
    }, [isOpen]);

    const loadEstadisticas = async () => {
        try {
            setLoading(true);
            const data = await laborService.obtenerEstadisticas();
            setEstadisticas(data);
        } catch (err) {
            console.error('Error al cargar estadísticas:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="max-w-3xl">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Estadísticas de Labores</h2>

                {loading ? (
                    <div className="text-center py-8">
                        <i className="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
                    </div>
                ) : estadisticas ? (
                    <div className="space-y-6">
                        {/* Resumen general */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-blue-700">{estadisticas.total}</div>
                                <div className="text-sm text-blue-600">Total</div>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-700">{estadisticas.pendientes}</div>
                                <div className="text-sm text-yellow-600">Pendientes</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-green-700">{estadisticas.completadas}</div>
                                <div className="text-sm text-green-600">Completadas</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-purple-700">{estadisticas.en_progreso}</div>
                                <div className="text-sm text-purple-600">En Progreso</div>
                            </div>
                        </div>

                        {/* Distribución por tipo */}
                        {estadisticas.por_tipo && estadisticas.por_tipo.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Por Tipo de Labor</h3>
                                <div className="space-y-2">
                                    {estadisticas.por_tipo.map((item) => (
                                        <div key={item.tipo} className="flex items-center">
                                            <div className="w-32 text-sm text-gray-600">{item.tipo}</div>
                                            <div className="flex-1">
                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500 rounded-full"
                                                        style={{
                                                            width: `${(item.cantidad / estadisticas.total) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-12 text-right text-sm font-medium">{item.cantidad}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Distribución por trabajador */}
                        {estadisticas.por_trabajador && estadisticas.por_trabajador.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Por Trabajador</h3>
                                <div className="space-y-2">
                                    {estadisticas.por_trabajador.map((item) => (
                                        <div key={item.trabajador} className="flex items-center">
                                            <div className="w-32 text-sm text-gray-600 truncate">{item.trabajador}</div>
                                            <div className="flex-1">
                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-purple-500 rounded-full"
                                                        style={{
                                                            width: `${(item.cantidad / estadisticas.total) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-12 text-right text-sm font-medium">{item.cantidad}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No se pudieron cargar las estadísticas
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default EstadisticasLaboresModal;