import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RegisterForm } from "../components/RegisterForm";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";

export const RegisterPage = () => {
  return (
    <Section>
      <Container>
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Tạo tài khoản mới
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-[var(--color-primary)] hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>

          {/* Card */}
          <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
            <RegisterForm />
          </div>
        </div>
      </Container>
    </Section>
  );
};
