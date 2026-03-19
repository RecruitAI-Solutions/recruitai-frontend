import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <Section padding="xl">
        <Container size="xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in zoom-in duration-500">
              Tìm việc làm mơ ước với{" "}
              <span className="text-gradient-blue">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nền tảng tuyển dụng thông minh giúp bạn kết nối với cơ hội nghề
              nghiệp phù hợp nhất dựa trên kỹ năng và kinh nghiệm của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs" className="btn-primary px-8 py-4 text-lg">
                Tìm việc ngay
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="btn-outline px-8 py-4 text-lg"
              >
                Đăng ký miễn phí
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════
          FEATURES SECTION
          ══════════════════════════════════════════════════════ */}
      <Section background="white" padding="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              RecruitAI mang đến trải nghiệm tuyển dụng hoàn toàn mới
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Matching
              </h3>
              <p className="text-gray-600">
                Thuật toán AI thông minh giúp kết nối ứng viên với công việc phù
                hợp nhất
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ứng tuyển nhanh
              </h3>
              <p className="text-gray-600">
                Ứng tuyển chỉ với 1 cú click, CV được tự động điền thông tin
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Xác thực doanh nghiệp
              </h3>
              <p className="text-gray-600">
                Tất cả nhà tuyển dụng đều được xác thực, đảm bảo tin tuyển dụng
                chính xác
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════
          STATS SECTION
          ══════════════════════════════════════════════════════ */}
      <Section background="blue" padding="md">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">10K+</p>
              <p className="text-gray-600">Công việc</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">5K+</p>
              <p className="text-gray-600">Doanh nghiệp</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">50K+</p>
              <p className="text-gray-600">Ứng viên</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
              <p className="text-gray-600">Hài lòng</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
