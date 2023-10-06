export interface LoginData {
  correo: string;
  password: string;
}
export interface CreateUser {
  cedula: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Polygons {
  puntos: Location[];
}
