export interface Participante {
  id: number;
  nombre: string;
  colegio: {
    id: number;
    nombre: string;
  };
  tipoDocumento: {
    id: number;
    descripcion: string;
  };
}

export interface ParticipanteForm {
  nombre: string;
  colegioId: number;
  tipoDocumentoId: number;
}
