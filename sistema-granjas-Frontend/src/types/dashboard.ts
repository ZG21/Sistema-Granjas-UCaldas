// types/dashboard.ts
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  nombre: string;
  apellido: string;
}

export interface Granja {
  id: number;
  nombre: string;
  ubicacion: string;
  estado: boolean;
  area_total: number;
}

export interface Programa {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  fecha_inicio: string;
}

export interface Labor {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  fecha_asignacion: string;
  fecha_vencimiento: string;
  granja_id: number;
}

export interface DashboardStats {
  granjasActivas: number;
  usuariosRegistrados: number;
  programasActivos: number;
  laboresMes: number;
}