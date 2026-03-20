import { Container } from "@/shared/layouts/Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";

export default function RecruiterDashboard() {
  const user = useAppSelector(selectCurrentUser);

  return (
    // ═══ PAGE USES CONTAINER ═══
    <Container className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Recruiter Dashboard
      </h1>

      {/* Permission Display */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="text-sm font-semibold text-green-700 mb-2">
          Your Active Permissions (RECRUITER)
        </div>
        <div className="flex flex-wrap gap-2">
          {user?.permissions?.map((perm) => (
            <span
              key={perm}
              className="px-2 py-1 bg-white border border-green-300 rounded text-xs font-medium text-green-700"
            >
              {perm}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">New Applications</p>
          <p className="text-3xl font-bold text-gray-900">248</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Views This Week</p>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Hired This Month</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
      </div>
    </Container>
  );
}
