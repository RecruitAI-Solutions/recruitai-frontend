import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { ButtonBack } from "@/shared/components/ui/ButtonBack";

export default function ChangePasswordPage() {
  return (
    <Section>
      <Container>
        <ButtonBack animation="bounce">Quay lại</ButtonBack>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Đổi mật khẩu</h2>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <ChangePasswordForm />
        </div>
      </Container>
    </Section>
  );
}
