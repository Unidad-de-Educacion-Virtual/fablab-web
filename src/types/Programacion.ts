export interface Programacion {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  cantidad: number;
  grado: number;
  grupo: string;
  observacion: string;
  colegio: {
    id: number;
    nombre: string;
  };
  taller: {
    id: number;
    nombre: string;
  };
  instructor: {
    id: number;
    nombre: string;
  };
  ubicacion: {
    id: number;
    nombre: string;
  };
}

export interface ProgramacionForm {
  fechaInicio: string;
  fechaFin: string;
  cantidad: number;
  grado: number;
  grupo: string;
  observacion: string;
  colegioId: number;
  tallerId: number;
  instructorId: number;
  ubicacionId: number;
}
