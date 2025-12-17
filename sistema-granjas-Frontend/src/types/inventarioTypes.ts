// src/types/inventarioTypes.ts

export interface Herramienta {
    id: number;
    nombre: string;
    descripcion: string;
    categoria_id: number;
    categoria_nombre?: string;
    cantidad_total: number;
    cantidad_disponible: number;
    cantidad_en_uso?: number;
    estado: string;
    fecha_creacion?: string;
    ultima_actualizacion?: string;
    
    // Para movimientos
    movimientos?: MovimientoHerramienta[];
}

export interface Insumo {
    id: number;
    nombre: string;
    descripcion: string;
    programa_id: number;
    programa_nombre?: string;
    cantidad_total: number;
    cantidad_disponible: number;
    unidad_medida: string;
    nivel_alerta: number;
    estado: string;
    fecha_creacion?: string;
    
    // Para movimientos
    movimientos?: MovimientoInsumo[];
}

export interface CategoriaInventario {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface MovimientoHerramienta {
    id: number;
    herramienta_id: number;
    herramienta_nombre?: string;
    labor_id?: number;
    labor_descripcion?: string;
    cantidad: number;
    tipo_movimiento: string; // entrada, salida, devolucion
    fecha_movimiento: string;
    observaciones: string;
    usuario_id?: number;
    usuario_nombre?: string;
}

export interface MovimientoInsumo {
    id: number;
    insumo_id: number;
    insumo_nombre?: string;
    labor_id?: number;
    labor_descripcion?: string;
    cantidad: number;
    tipo_movimiento: string; // entrada, salida
    fecha_movimiento: string;
    observaciones: string;
    usuario_id?: number;
    usuario_nombre?: string;
}

export interface CreateHerramientaDto {
    nombre: string;
    descripcion: string;
    categoria_id: number;
    cantidad_total?: number;
    cantidad_disponible?: number;
}

export interface UpdateHerramientaDto {
    nombre?: string;
    descripcion?: string;
    categoria_id?: number;
    cantidad_total?: number;
    cantidad_disponible?: number;
    estado?: string;
}

export interface CreateInsumoDto {
    nombre: string;
    descripcion: string;
    programa_id: number;
    cantidad_total: number;
    unidad_medida: string;
    nivel_alerta?: number;
}

export interface UpdateInsumoDto {
    nombre?: string;
    descripcion?: string;
    programa_id?: number;
    cantidad_total?: number;
    unidad_medida?: string;
    nivel_alerta?: number;
    estado?: string;
}

export interface InventarioFilters {
    tipo?: 'herramienta' | 'insumo';
    estado?: string;
    programa_id?: number;
    categoria_id?: number;
    skip?: number;
    limit?: number;
}

export interface EstadisticasInventario {
    total_herramientas: number;
    total_insumos: number;
    herramientas_disponibles: number;
    insumos_disponibles: number;
    herramientas_bajo_stock: number;
    insumos_bajo_alerta: number;
    categorias_herramientas: Array<{ categoria: string; cantidad: number }>;
}