// types/dashboard.types.ts
export interface DashboardStats {
    newJobsToday: number;
    totalApplications: number;
    suggestedJobs: number;
    reviewedApplications: number;
    analyzedCVs: number;
    savedJobs: number;
    unreadNotifications: number;
}

// Response trả về thẳng object, không có wrapper
export type DashboardSummary = DashboardStats;