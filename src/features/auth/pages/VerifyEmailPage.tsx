import { Section } from "@/shared/layouts/Section";
import { VerifyEmailForm } from "../components/VerifyEmailForm";
import { Container } from "@/shared/layouts/Container";

export default function VerifyEmailPage() {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Xác thực email</h2>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <VerifyEmailForm />
        </div>
      </Container>
    </Section>
  );
}
