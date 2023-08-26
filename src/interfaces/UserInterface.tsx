export interface LoginData {
  correo: string;
  password: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Polygons {
  puntos: Location[];
}
