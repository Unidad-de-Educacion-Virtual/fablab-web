export interface Sesion {
  id: number;
  fecha: string;
  hora: string;
  programacion: {
    id: number;
    valor: string;
  };
  instructor: {
    id: number;
    nombre: string;
  };
  ubicacion: {
    id: number;
    nombre: string;
  };
  totalAsistentes: number;
}
export interface SesionForm {
  fecha: string;
  hora: string;
  programacionId: number;
  instructorId: number;
  ubicacionId: number;
}
