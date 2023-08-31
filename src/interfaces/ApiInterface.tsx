//Api

import {GeoCoordinates} from 'react-native-geolocation-service';

export interface QuotesApi {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

export interface Quote {
  id: number;
  quote: string;
  author: string;
}
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
  id: number;
  E1: number;
  E2: number;
  E3: number;
  E4: number;
  E5: number;
  Id_Planta: number;
  Monilla: null | number;
  Phythptora: null | number;
  Colletotrichum: null | number;
  Corynespora: null | number;
  Lasodiplodia: null | number;
  Cherelles: null | number;
  Insectos: null | number;
  Animales: null | number;
  Observacion: string;
  FechaVisita: Date;
  Activo: boolean;
}
export interface IPoligono {
  id: number;
  FillColor: string;
  Activo: boolean;
  Id_Lote: number;
  Lote: string;
  CodigoLote: string;
  geocoordenadas: IGeocoordenada[];
}

export interface IGeocoordenada {
  id: number;
  Id_Poligono: number;
  lat: number;
  lng: number;
  Activo: boolean;
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
  id: number;
  Cod: string;
  Name: string;
}
