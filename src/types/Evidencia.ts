export interface Evidencia {
  id: number;
  sesion: {
    id: number;
  };
  url: string;
  observacion: string;
}

export interface EvidenciaForm {
  sesionId: number;
  url: string;
  observacion: string;
}
