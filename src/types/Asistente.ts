export interface Asistente {
  id: number;
  sesion: {
    id: number;
  };
  participante: {
    id: number;
    nombre: string;
  };
}
export interface AsistenteForm {
  sesionId: number;
  participanteId: number;
}
