// src/features/auth/pages/ProfilePage.tsx
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import { ButtonBack } from "@/shared/components/ui/ButtonBack";
import { AvatarUpload } from "../components/AvatarUpload";
import { ProfileForm } from "../components/ProfileForm";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "../slices/authSlice";
import { Mail, Calendar, Shield } from "lucide-react";
import { useGetProfile } from "../hooks/useGetProfile";

export const ProfilePage = () => {
  const reduxUser = useAppSelector(selectCurrentUser);
  const { data: fullUser, isLoading } = useGetProfile();

  const user = fullUser ?? reduxUser;

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "candidate":
        return "Ứng viên";
      case "recruiter":
        return "Nhà tuyển dụng";
      case "admin":
        return "Quản trị viên";
      default:
        return "";
    }
  };
  return (
    <Section>
      <Container size="lg">
        <ButtonBack animation="bounce">Quay lại</ButtonBack>
        <div className="max-w-4xl mx-auto mt-4">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <AvatarUpload />
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.fullName}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-primary" /> {user?.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-primary" />{" "}
                    {getRoleLabel(user?.role)}
                  </span>
                  {user?.createdAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      Tham gia:{" "}
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa thông tin</h2>
            {user && <ProfileForm user={user} isLoading={isLoading} />}
          </div>
        </div>
      </Container>
    </Section>
  );
};
