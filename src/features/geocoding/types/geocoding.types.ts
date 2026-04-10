// enums
export const DISPLAY_TYPE = {
  NewOnly: 1,
  OldOnly: 2,
  Both: 6,
} as const;

export type DisplayType = (typeof DISPLAY_TYPE)[keyof typeof DISPLAY_TYPE];

export const BOUNDARY_TYPE = {
  Province: 0,
  District: 1,
  Ward: 2,
} as const;

export type BoundaryType = (typeof BOUNDARY_TYPE)[keyof typeof BOUNDARY_TYPE];

// root boundary (có prefix)
export type Boundary = {
  type: BoundaryType;
  name: string;
  prefix: string;
  code: string;
};

// format boundary (KHÔNG có prefix)
export type FormatBoundary = {
  type: BoundaryType;
  name: string;
  code: string;
};

export type LocationFormatDetail = {
  address: string;
  boundaries: FormatBoundary[];
};

export type LocationFormats = {
  new: LocationFormatDetail;
  old: LocationFormatDetail;
};

export type LocationPoint = {
  lat: number;
  lng: number;
};

export type LocationData = {
  refId: string;
  fullAddress: string;
  display: string;
  location: LocationPoint;
  distance: number;
  boundaries: Boundary[];
  formats: LocationFormats;
};

// response wrapper
export type GeocodingResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// params
export type SearchLocationParams = {
  text: string;
  limit?: number;
  lat?: number;
  lng?: number;
  cityId?: string;
  wardId?: string;
  displayType?: DisplayType;
};

export type ReverseGeocodingParams = {
  lat: number;
  lng: number;
  radius?: number;
};
