import { axiosInstance } from "@/services/api/axiosInstance";
import { GEO_ENDPOINTS } from "@/config/endpoints/geocoding.endpoints";
import type {
  LocationData,
  GeocodingResponse,
  SearchLocationParams,
  ReverseGeocodingParams,
  Province,
  District,
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

  // Lấy danh sách tỉnh/thành phố
  getProvinces: async (search?: string): Promise<Province[]> => {
    const res = await axiosInstance.get<Province[]>(
      GEO_ENDPOINTS.PROVINCES,
      { params: { search } },
    );
    return res.data;
  },

  // Lấy danh sách quận/huyện theo tỉnh
  getDistricts: async (provinceId: string, search?: string): Promise<District[]> => {
    const res = await axiosInstance.get<District[]>(
      GEO_ENDPOINTS.DISTRICTS(provinceId),
      { params: { search } },
    );
    return res.data;
  },
};