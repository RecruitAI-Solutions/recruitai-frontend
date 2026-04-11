import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { CVUploadZone } from "../components/CVUploadZone";
import { CVFilterBar } from "../components/CVFilterBar";
import { CVList } from "../components/CVList";

export const CVManagementPage = () => {
  return (
    <Section>
      <Container>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý CV</h1>
          <p className="text-sm text-gray-500 mt-2">
            Upload CV định dạng PDF để ứng tuyển và nhận phân tích AI
          </p>
        </div>

        {/* Upload Zone */}
        <div className="bg-white rounded-xl border border-border p-6 mt-3">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            Upload CV mới
          </h2>
          <CVUploadZone />
        </div>

        {/* CV List with Filter */}
        <div className="bg-white rounded-xl border border-border p-6 mt-3">
          <h2 className="text-sm font-semibold text-text-primary mb-4">
            CV của tôi
          </h2>
          <CVFilterBar />
          <div className="mt-4">
            <CVList />
          </div>
        </div>
      </Container>
    </Section>
  );
};
