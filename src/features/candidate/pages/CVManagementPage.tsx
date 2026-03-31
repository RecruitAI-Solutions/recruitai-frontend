import { Container } from "@/shared/layouts/Container";
import { CVUploadZone } from "../components/CVUploadZone";
import { CVList } from "../components/CVList";

export const CVManagementPage = () => {
  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý CV</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload CV định dạng PDF để ứng tuyển và nhận phân tích AI
          </p>
        </div>

        {/* Upload Zone */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            Upload CV mới
          </h2>
          <CVUploadZone />
        </div>

        {/* CV List */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            CV của tôi
          </h2>
          <CVList />
        </div>
      </div>
    </Container>
  );
};
