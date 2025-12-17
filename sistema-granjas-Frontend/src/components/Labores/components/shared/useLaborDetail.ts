// src/components/Labores/DetallesLaborModal/hooks/useLaborDetails.ts
import { useState, useEffect } from 'react';
import type { Labor } from '../../../../types/laboresTypes';
import laborService from '../../../../services/laboresService';
import loteService from '../../../../services/loteService';
import granjaService from '../../../../services/granjaService';
import usuarioService from '../../../../services/usuarioService';
import recomendacionService from '../../../../services/recomendacionService';
import type {
    HerramientaAsignadaDetalle,
    InsumoAsignadoDetalle,
    LaborContextData
} from './types';

export const useLaborDetails = (labor: Labor | null, isOpen: boolean) => {
    const [laborDetallada, setLaborDetallada] = useState<Labor | null>(null);
    const [evidencias, setEvidencias] = useState<any[]>([]);
    const [herramientasAsignadas, setHerramientasAsignadas] = useState<HerramientaAsignadaDetalle[]>([]);
    const [insumosAsignados, setInsumosAsignados] = useState<InsumoAsignadoDetalle[]>([]);
    const [movimientosHerramientas, setMovimientosHerramientas] = useState<any[]>([]);
    const [movimientosInsumos, setMovimientosInsumos] = useState<any[]>([]);
    const [contextData, setContextData] = useState<LaborContextData>({
        loteInfo: null,
        granjaInfo: null,
        trabajadorInfo: null,
        recomendacionInfo: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && labor) {
            setLaborDetallada(null);
            cargarDetallesCompletos(labor.id);
            cargarInformacionAdicional(labor);
        }
    }, [isOpen, labor]);

    const cargarDetallesCompletos = async (id: number) => {
        try {
            setLoading(true);
            const detalles = await laborService.obtenerLaborPorId(id);
            setLaborDetallada(detalles);

            const evidenciasData = await laborService.obtenerEvidencias(id);
            setEvidencias(evidenciasData);

            if (detalles) {
                const herramientasData: HerramientaAsignadaDetalle[] = detalles.herramientas_asignadas?.map((h: any) => ({
                    herramienta_id: h.herramienta_id,
                    herramienta_nombre: h.herramienta_nombre,
                    cantidad_actual: h.cantidad_actual || 0,
                    unidad_medida: h.unidad_medida || 'unidades'
                })) || [];
                setHerramientasAsignadas(herramientasData);

                const insumosData: InsumoAsignadoDetalle[] = detalles.insumos_asignados?.map((i: any) => ({
                    insumo_id: i.insumo_id,
                    insumo_nombre: i.insumo_nombre,
                    cantidad_consumida: i.cantidad_consumida || 0,
                    unidad_medida: i.unidad_medida || 'unidades'
                })) || [];
                setInsumosAsignados(insumosData);

                setMovimientosHerramientas(detalles.movimientos_herramientas || []);
                setMovimientosInsumos(detalles.movimientos_insumos || []);
            }

        } catch (err) {
            console.error('Error cargando detalles:', err);
        } finally {
            setLoading(false);
        }
    };

    const cargarInformacionAdicional = async (labor: Labor) => {
        try {
            const newContextData: LaborContextData = {
                loteInfo: null,
                granjaInfo: null,
                trabajadorInfo: null,
                recomendacionInfo: null
            };

            // Cargar información del lote
            if (labor.lote_id) {
                try {
                    const lote = await loteService.obtenerLote(labor.lote_id);
                    newContextData.loteInfo = lote;

                    if (lote.granja_id) {
                        const granja = await granjaService.obtenerGranjaPorId(lote.granja_id);
                        newContextData.granjaInfo = granja;
                    }
                } catch (error) {
                    console.error('Error cargando lote/granja:', error);
                }
            }

            // Cargar información del trabajador
            if (labor.trabajador_id) {
                try {
                    const trabajador = await usuarioService.obtenerUsuarioPorId(labor.trabajador_id);
                    newContextData.trabajadorInfo = trabajador;
                } catch (error) {
                    console.error('Error cargando trabajador:', error);
                }
            }

            // Cargar recomendación
            if (labor.recomendacion_id) {
                try {
                    const recomendacion = await recomendacionService.obtenerRecomendacionPorId(labor.recomendacion_id);
                    newContextData.recomendacionInfo = recomendacion;
                } catch (error) {
                    console.error('Error cargando recomendación:', error);
                }
            }

            setContextData(newContextData);
        } catch (err) {
            console.error('Error cargando información adicional:', err);
        }
    };

    const calcularTotalesHerramientas = () => {
        const asignadas = herramientasAsignadas.reduce((sum, h) => sum + h.cantidad_actual, 0);
        const salidas = movimientosHerramientas
            .filter(m => m.tipo_movimiento === 'salida')
            .reduce((sum, m) => sum + m.cantidad, 0);
        const entradas = movimientosHerramientas
            .filter(m => m.tipo_movimiento === 'entrada')
            .reduce((sum, m) => sum + m.cantidad, 0);

        return { asignadas, salidas, entradas };
    };

    const calcularTotalesInsumos = () => {
        const asignados = insumosAsignados.reduce((sum, i) => sum + i.cantidad_consumida, 0);
        const salidas = movimientosInsumos
            .filter(m => m.tipo_movimiento === 'salida')
            .reduce((sum, m) => sum + m.cantidad, 0);
        const entradas = movimientosInsumos
            .filter(m => m.tipo_movimiento === 'entrada')
            .reduce((sum, m) => sum + m.cantidad, 0);

        return { asignados, salidas, entradas };
    };

    const getMovimientosPorHerramienta = (herramientaId: number) => {
        return movimientosHerramientas.filter(m => m.herramienta_id === herramientaId);
    };

    const getMovimientosPorInsumo = (insumoId: number) => {
        return movimientosInsumos.filter(m => m.insumo_id === insumoId);
    };

    return {
        laborDetallada,
        evidencias,
        herramientasAsignadas,
        insumosAsignados,
        movimientosHerramientas,
        movimientosInsumos,
        contextData,
        loading,
        calcularTotalesHerramientas,
        calcularTotalesInsumos,
        getMovimientosPorHerramienta,
        getMovimientosPorInsumo
    };
};