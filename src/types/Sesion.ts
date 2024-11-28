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
  cantidadEvidencias: number;
  taller: {
    id: number;
    nombre: string;
  };
}

export interface SesionForm {
  fecha: string;
  hora: string;
  programacionId: number;
  instructorId: number;
  ubicacionId: number;
}
