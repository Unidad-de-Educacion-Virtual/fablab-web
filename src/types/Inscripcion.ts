export interface Inscripcion {
  id: number;
  fecha: string;
  participante: {
    id: number;
    nombre: string;
  };
  programacion: {
    id: number;
    nombre: string;
  };
}

export interface InscripcionForm {
  participanteId: string;
  programacionId: string;
  fecha: string;
}
