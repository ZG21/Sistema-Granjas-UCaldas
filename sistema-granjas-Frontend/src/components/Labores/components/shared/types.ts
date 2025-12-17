// src/components/Labores/DetallesLaborModal/components/shared/types.ts
export interface MovimientoHerramienta {
    movimiento_id: number;
    herramienta_id: number;
    herramienta_nombre: string;
    cantidad: number;
    tipo_movimiento: string;
    fecha_movimiento: string;
    observaciones: string;
}

export interface MovimientoInsumo {
    movimiento_id: number;
    insumo_id: number;
    insumo_nombre: string;
    cantidad: number;
    tipo_movimiento: string;
    fecha_movimiento: string;
    observaciones: string;
    unidad_medida: string;
}

export interface HerramientaAsignadaDetalle {
    herramienta_id: number;
    herramienta_nombre: string;
    cantidad_actual: number;
    unidad_medida: string;
    movimientos?: MovimientoHerramienta[];
}

export interface InsumoAsignadoDetalle {
    insumo_id: number;
    insumo_nombre: string;
    cantidad_consumida: number;
    unidad_medida: string;
    movimientos?: MovimientoInsumo[];
}

export interface LaborContextData {
    loteInfo: any;
    granjaInfo: any;
    trabajadorInfo: any;
    recomendacionInfo: any;
}