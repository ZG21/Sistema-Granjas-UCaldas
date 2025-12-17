// src/components/Recomendaciones/FiltrosRecomendaciones.tsx
import React, { useState } from 'react';
import type { RecomendacionFilters } from '../../types/recomendacionTypes';

interface FiltrosRecomendacionesProps {
    filters: RecomendacionFilters;
    onFilterChange: (filters: RecomendacionFilters) => void;
}

const FiltrosRecomendaciones: React.FC<FiltrosRecomendacionesProps> = ({
    filters,
    onFilterChange,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = {
            ...filters,
            [name]: value || undefined,
        };

        // Si cambia un filtro, resetear la paginación a la primera página
        if (name !== 'skip' && name !== 'limit') {
            newFilters.skip = 0;
        }

        onFilterChange(newFilters);
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const limit = parseInt(e.target.value);
        onFilterChange({
            ...filters,
            limit: limit,
            skip: 0 // Resetear a primera página
        });
    };

    const clearFilters = () => {
        // Mantener solo la paginación por defecto
        onFilterChange({
            skip: 0,
            limit: 100
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Filtros</h3>
                <div className="space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        {showFilters ? 'Ocultar' : 'Mostrar'} filtros
                    </button>
                    <button
                        onClick={clearFilters}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="space-y-4">
                    {/* Filtros principales */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <select
                                name="estado"
                                value={filters.estado || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todos</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="aprobada">Aprobada</option>
                                <option value="rechazada">Rechazada</option>
                                <option value="en_ejecucion">En Ejecucion</option>
                                <option value="completada">Completada</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo
                            </label>
                            <select
                                name="tipo"
                                value={filters.tipo || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todos</option>
                                <option value="riego">Riego</option>
                                <option value="fertilizacion">Fertilización</option>
                                <option value="poda">Poda</option>
                                <option value="cosecha">Cosecha</option>
                                <option value="proteccion">Protección</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lotes por página
                            </label>
                            <select
                                name="limit"
                                value={filters.limit || 100}
                                onChange={handleLimitChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="250">250</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700"
                            >
                                <i className="fas fa-times mr-2"></i>
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>

                    {/* Filtros adicionales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lote específico
                            </label>
                            <input
                                type="number"
                                name="lote_id"
                                value={filters.lote_id || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="ID del lote"
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha Desde
                            </label>
                            <input
                                type="date"
                                name="fecha_desde"
                                value={filters.fecha_desde || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha Hasta
                            </label>
                            <input
                                type="date"
                                name="fecha_hasta"
                                value={filters.fecha_hasta || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiltrosRecomendaciones;