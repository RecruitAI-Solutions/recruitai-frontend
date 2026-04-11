import { Container } from "@/shared/layouts/Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useGetMyCVs } from "../hooks/useGetMyCVs";

export default function CandidateDashboard() {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetMyCVs();
  const cvCount = data?.data?.length ?? 0;

  return (
    // ═══ PAGE USES CONTAINER ═══
    <Container className="py-8">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome back, {user?.fullName}! 👋
        </h2>
        <p className="text-gray-600">Here's your job search overview</p>
      </div>

      {/* Stats Grid - Auto responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Applications Sent</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Matched Jobs</p>
          <p className="text-3xl font-bold text-gray-900">45</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">CVs Uploaded</p>
          <p className="text-3xl font-bold text-gray-900">{cvCount}</p>
        </div>
        <LogoutButton />
      </div>
    </Container>
  );
}
