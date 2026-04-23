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
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Đăng nhập RecruitAI
            </h2>

            <p className="text-sm text-text-secondary">
              Chưa có tài khoản?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="font-medium text-primary hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Card */}
          <div className="bg-background py-8 px-6 shadow-lg rounded-xl border border-border">
            <LoginForm />

            <div className="mt-6">
              <OAuthButtons />
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-text-secondary mt-6">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <span className="text-text-primary hover:underline cursor-pointer">
              Điều khoản dịch vụ
            </span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
