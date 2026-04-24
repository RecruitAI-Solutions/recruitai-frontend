import { axiosInstance } from "@/services/api/axiosInstance";
import {
    type DashboardSummary,
} from "../types/dashboard.types";
import { USER_ENDPOINTS } from "@/config/endpoints/user.endpoints";

export const candidateDashboardApi = {
    /**
     * Get candidate dashboard data
     * @returns Dashboard summary statistics and recent activities
     */
    getDashboard: async (): Promise<DashboardSummary> => {
        const response = await axiosInstance.get<DashboardSummary>(
            USER_ENDPOINTS.DASHBOARD,
        );
        return response.data;
    },
};