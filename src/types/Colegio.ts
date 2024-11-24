export interface Colegio {
  id: number;
  nombre: string;
  dane: string;
  municipio: {
    id: number;
    nombre: string;
  };
}

export interface ColegioForm {
  nombre: string;
  dane: string;
  municipioId: number;
}
