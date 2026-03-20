import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { LoginForm } from "../components/LoginForm";
import { OAuthButtons } from "../components/OAuthButtons";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";

export default function LoginPage() {
  return (
    <Section>
      <Container>
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Đăng nhập RecruitAI
            </h2>

            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="font-medium text-[var(--color-primary)] hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Card */}
          <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
            <LoginForm />

            <div className="mt-6">
              <OAuthButtons />
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <span className="text-[var(--color-primary)] hover:underline cursor-pointer">
              Điều khoản dịch vụ
            </span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
