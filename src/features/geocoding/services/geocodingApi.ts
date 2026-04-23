import { axiosInstance } from "@/services/api/axiosInstance";
import { GEO_ENDPOINTS } from "@/config/endpoints/geocoding.endpoints";
import type {
  LocationData,
  GeocodingResponse,
  SearchLocationParams,
  ReverseGeocodingParams,
} from "../types/geocoding.types";

export const geocodingApi = {
  search: async (params: SearchLocationParams) => {
    const res = await axiosInstance.get<GeocodingResponse<LocationData[]>>(
      GEO_ENDPOINTS.SEARCH,
      { params },
    );
    return res.data.data;
  },

  getPlace: async (refId: string) => {
    const res = await axiosInstance.get<GeocodingResponse<LocationData>>(
      GEO_ENDPOINTS.DETAIL(refId),
    );
    return res.data.data;
  },

  reverse: async (params: ReverseGeocodingParams) => {
    const res = await axiosInstance.get<GeocodingResponse<LocationData>>(
      GEO_ENDPOINTS.REVERSE,
      { params },
    );
    return res.data.data;
  },
};
