//Api

import {GeoCoordinates} from 'react-native-geolocation-service';
export interface IProyecto {
  id: number;
  Codigo_Proyecto: string;
  Nombre: string;
  Id_Hacienda: number;
  Activo: boolean;
}
export interface ILote {
  id: number;
  Codigo_Lote: string;
  Nombre: string;
  Hectareas: number | null;
  Variedad: null;
  Id_Proyecto: number;
  Activo: boolean;
}

export interface ILectura {
  id: number | null;
  E1: number | null;
  E2: number | null;
  E3: number | null;
  E4: number | null;
  E5: number | null;
  GR1: number | null;
  GR2: number | null;
  GR3: number | null;
  GR4: number | null;
  GR5: number | null;
  Cherelles: null | number;
  Observacion: string;
  FechaVisita: Date;
  Activo: boolean;
  Id_Planta: number;
}

export interface ILocation extends GeoCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  altitudeAccuracy?: number | null;
  region: IRegion[];
}

export interface IRegion {
  Id: number;
  Lote: string;
  CodigoLote: string;
}
export interface IVertices {
  latitude: number;
  longitude: number;
}

export interface GlobalLecturas {
  Id_Planta: number;
  planta: string;
  E1: string;
  E2: string;
  E3: string;
  E4: string;
  E5: string;
  GR1: string;
  GR2: string;
  GR3: string;
  GR4: string;
  GR5: string;
  Cherelles: string;
  Observacion: string;
  SyncId: string;
  Fecha_Visita: string;
}

export interface Geolotes {
  id: number;
  FillColor: string;
  Activo: boolean;
  Usuario: string;
  Id_Lote: number;
  Lote: string;
  CodigoLote: string;
  geocoordenadas: Geocoordenada[];
}

export interface Geocoordenada {
  id: number;
  lat: number;
  lng: number;
  Activo: boolean;
  Usuario: string;
  Id_Poligono: number;
}

export interface Plantas {
  id: number;
  Codigo_Planta: string;
  Nombre: string;
  Activo: boolean;
  Id_Lote: number;
}
export interface Porfile {
  cedula: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

