//#region Google Maps Prediction

export interface GoogleMapsPrediction {
  predictions: Prediction[];
  status: string;
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

export interface MainTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface SecondaryTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring[];
  secondary_text: string;
  secondary_text_matched_substrings: SecondaryTextMatchedSubstring[];
}

export interface Term {
  offset: number;
  value: string;
}

//Google Maps Prediction Result

export interface GoogleMapsPredictionResult {
  html_attributions: any[];
  result: Result;
  status: string;
}

export interface Result {
  address_components: AddressComponent[];
  adr_address: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: Photo[];
  place_id: string;
  reference: string;
  types: string[];
  url: string;
  utc_offset: number;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

//#endregion

//#region Google Maps Direction
export interface GoogleMapsDirection {
  plus_code: PlusCode;
  results: Result[];
  status: string;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode2;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
  bounds?: Bounds;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: Northeast2;
  southwest: Southwest2;
}

export interface Northeast2 {
  lat: number;
  lng: number;
}

export interface Southwest2 {
  lat: number;
  lng: number;
}

export interface PlusCode2 {
  compound_code: string;
  global_code: string;
}

//#endregion
