export interface Programacion {
  id: number;
  colegio: {
    id: number;
    nombre: string;
  };
  taller: {
    id: number;
    nombre: string;
  };
  fechaInicio: string;
  fechaFin: string;
  cantidad: number;
  observacion: string;
  instructor: {
    id: number;
    nombre: string;
  };
  grado: number;
  grupo: string;
  ubicacion: {
    id: number;
    nombre: string;
  };
  cantidadInscritos: number;
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
