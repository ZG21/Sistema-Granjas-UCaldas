// src/components/Labores/DetallesLaborModal/components/LaborToolsDetail.tsx
import React from 'react';
import BadgeMovimiento from './shared/badgeMovimiento';
import type { HerramientaAsignadaDetalle } from './shared/types';

interface LaborToolsDetailProps {
    herramientasAsignadas: HerramientaAsignadaDetalle[];
    getMovimientosPorHerramienta: (id: number) => any[];
}

const LaborToolsDetail: React.FC<LaborToolsDetailProps> = ({
    herramientasAsignadas,
    getMovimientosPorHerramienta
}) => {
    return (
        <div className="space-y-4">
            <div className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                    <i className="fas fa-tools mr-2 text-yellow-500"></i>
                    Herramientas Asignadas - Detalles
                </h3>
                {herramientasAsignadas.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No hay herramientas asignadas</p>
                ) : (
                    <div className="space-y-4">
                        {herramientasAsignadas.map((herramienta, index) => {
                            const movimientos = getMovimientosPorHerramienta(herramienta.herramienta_id);
                            const salidas = movimientos
                                .filter(m => m.tipo_movimiento === 'salida')
                                .reduce((sum, m) => sum + m.cantidad, 0);
                            const entradas = movimientos
                                .filter(m => m.tipo_movimiento === 'entrada')
                                .reduce((sum, m) => sum + m.cantidad, 0);

                            return (
                                <div key={index} className="border rounded p-4 hover:bg-yellow-50 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {herramienta.herramienta_nombre}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                ID: {herramienta.herramienta_id}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-yellow-600">
                                                {herramienta.cantidad_actual} {herramienta.unidad_medida}
                                            </span>
                                            <p className="text-sm text-gray-500">Stock actual</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="text-center p-2 bg-red-50 rounded">
                                            <p className="text-sm font-medium text-red-700">Salidas</p>
                                            <p className="text-lg font-bold text-red-800">{salidas}</p>
                                        </div>
                                        <div className="text-center p-2 bg-green-50 rounded">
                                            <p className="text-sm font-medium text-green-700">Entradas</p>
                                            <p className="text-lg font-bold text-green-800">{entradas}</p>
                                        </div>
                                    </div>

                                    {movimientos.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">
                                                Movimientos ({movimientos.length}):
                                            </p>
                                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                                {movimientos.map((movimiento, idx) => (
                                                    <div key={idx} className="border rounded p-3 hover:bg-gray-50">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className="flex items-center">
                                                                <BadgeMovimiento tipo={movimiento.tipo_movimiento} />
                                                                <span className="ml-2 font-semibold">
                                                                    {movimiento.cantidad} un.
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                {new Date(movimiento.fecha_movimiento).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        {movimiento.observaciones && (
                                                            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                                                                <p className="text-xs font-medium text-blue-800 mb-1">
                                                                    Observaciones:
                                                                </p>
                                                                <p className="text-sm text-blue-700">
                                                                    {movimiento.observaciones}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div className="mt-1 text-xs text-gray-500">
                                                            Movimiento ID: {movimiento.movimiento_id}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LaborToolsDetail;