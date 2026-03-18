import { VerifyEmailForm } from "../components/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Xác thực email</h2>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <VerifyEmailForm />
        </div>
      </div>
    </div>
  );
}
