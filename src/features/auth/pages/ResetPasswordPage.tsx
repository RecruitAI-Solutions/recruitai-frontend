import { Section } from "@/shared/layouts/Section";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { Container } from "@/shared/layouts/Container";

export default function ResetPasswordPage() {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Đặt lại mật khẩu</h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập mật khẩu mới của bạn
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <ResetPasswordForm />
        </div>
      </Container>
    </Section>
  );
}
