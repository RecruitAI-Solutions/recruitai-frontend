import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";

export default function ForgotPasswordPage() {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Quên mật khẩu?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhớ rồi?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <ForgotPasswordForm />
        </div>
      </Container>
    </Section>
  );
}
