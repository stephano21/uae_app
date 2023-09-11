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
  Id: number;
  Lote: string;
  CodigoLote: string;
}
export interface IVertices {
  latitude: number;
  longitude: number;
}

export interface lecturasTotales {
  id: string;
  codLectura: string;
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
  Fecha: string;
}

export interface Geolotes {
  id: number;
  FillColor: string;
  Activo: boolean;
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
  Id_Poligono: number;
}
