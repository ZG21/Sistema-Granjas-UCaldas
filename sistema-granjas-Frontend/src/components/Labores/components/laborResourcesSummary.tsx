// src/components/Labores/DetallesLaborModal/components/LaborResourcesSummary.tsx
import React from 'react';
import type { HerramientaAsignadaDetalle, InsumoAsignadoDetalle } from './shared/types';

interface LaborResourcesSummaryProps {
    herramientasAsignadas: HerramientaAsignadaDetalle[];
    insumosAsignados: InsumoAsignadoDetalle[];
    totalesHerramientas: { asignadas: number; salidas: number; entradas: number };
    totalesInsumos: { asignados: number; salidas: number; entradas: number };
}

const LaborResourcesSummary: React.FC<LaborResourcesSummaryProps> = ({
    herramientasAsignadas,
    insumosAsignados,
    totalesHerramientas,
    totalesInsumos
}) => {
    return (
        <div className="space-y-4">
            {/* Resumen de herramientas */}
            <div className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                    <i className="fas fa-tools mr-2 text-yellow-500"></i>
                    Resumen de Herramientas
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Total asignado:</span>
                        <span className="text-xl font-bold text-yellow-600">
                            {totalesHerramientas.asignadas} unidades
                        </span>
                    </div>

                    {/* Lista de herramientas individuales */}
                    <div className="space-y-2 pt-2 border-t">
                        <p className="text-sm font-medium text-gray-700">
                            Herramientas asignadas ({herramientasAsignadas.length}):
                        </p>
                        {herramientasAsignadas.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No hay herramientas asignadas</p>
                        ) : (
                            <div className="space-y-1">
                                {herramientasAsignadas.map((herramienta, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 truncate">{herramienta.herramienta_nombre}</span>
                                        <span className="font-semibold text-yellow-700">
                                            {herramienta.cantidad_actual} {herramienta.unidad_medida}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Movimientos salida:</span>
                            <span className="font-medium text-red-600">
                                {totalesHerramientas.salidas} unidades
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Movimientos entrada:</span>
                            <span className="font-medium text-green-600">
                                {totalesHerramientas.entradas} unidades
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resumen de insumos */}
            <div className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                    <i className="fas fa-seedling mr-2 text-green-500"></i>
                    Resumen de Insumos
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Total asignado:</span>
                        <span className="text-xl font-bold text-green-600">
                            {totalesInsumos.asignados} unidades
                        </span>
                    </div>

                    {/* Lista de insumos individuales */}
                    <div className="space-y-2 pt-2 border-t">
                        <p className="text-sm font-medium text-gray-700">
                            Insumos asignados ({insumosAsignados.length}):
                        </p>
                        {insumosAsignados.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No hay insumos asignados</p>
                        ) : (
                            <div className="space-y-1">
                                {insumosAsignados.map((insumo, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 truncate">{insumo.insumo_nombre}</span>
                                        <span className="font-semibold text-green-700">
                                            {insumo.cantidad_consumida} {insumo.unidad_medida}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Movimientos salida:</span>
                            <span className="font-medium text-red-600">
                                {totalesInsumos.salidas} unidades
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Movimientos entrada:</span>
                            <span className="font-medium text-green-600">
                                {totalesInsumos.entradas} unidades
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaborResourcesSummary;