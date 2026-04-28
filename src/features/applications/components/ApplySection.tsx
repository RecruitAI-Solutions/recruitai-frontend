import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Select } from "@/shared/components/ui/Select";
import { Badge } from "@/shared/components/ui/Badge";
import { useApplyJob } from "../hooks/useApplyJob";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";
import { useCVFilter } from "@/features/candidate/hooks/useCVFilter";
import { useGetMyCVs } from "@/features/candidate/hooks/useGetMyCVs";
import { CV_STATUS } from "@/features/candidate/types/cv.types";

type Props = { jobId: string };

export const ApplySection = ({ jobId }: Props) => {
  const { filter } = useCVFilter();
  const { data: cvData } = useGetMyCVs({
    filters: { ...filter, pageSize: 100 },
  });
  const analyzedCVs =
    cvData?.data?.filter((cv) => cv.statusName === CV_STATUS.ANALYZED) ?? [];
  const [selectedCVId, setSelectedCVId] = useState<string>(
    analyzedCVs[0]?.id ?? "",
  );
  const [showDetails, setShowDetails] = useState(false);

  const { mutate: apply, isPending, data: result } = useApplyJob(jobId);

  const handleApply = () => {
    if (selectedCVId) apply(selectedCVId);
  };

  const getMatchLevel = (percentage: number) => {
    if (percentage >= 70)
      return {
        label: "Cơ hội cao",
        icon: TrendingUp,
        variant: "success",
      } as const;
    if (percentage >= 50)
      return { label: "Tiềm năng", icon: Minus, variant: "warning" } as const;
    return {
      label: "Cần cải thiện",
      icon: TrendingDown,
      variant: "danger",
    } as const;
  };

  if (analyzedCVs.length === 0) {
    return (
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">
              Chưa có CV hoàn chỉnh
            </p>
            <p className="text-sm text-amber-700">
              Bạn cần upload và phân tích CV trước khi ứng tuyển.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* CV Selection Card */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-text-secondary">
            Chọn CV để ứng tuyển
          </span>
        </div>
        <Select
          value={selectedCVId}
          onChange={(e) => setSelectedCVId(e.target.value)}
          options={analyzedCVs.map((cv) => ({
            value: cv.id,
            label: cv.fileName,
          }))}
          className="w-full"
        />
      </div>

      {/* Apply Button */}
      <Button
        onClick={handleApply}
        isLoading={isPending}
        fullWidth
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 !text-white"
      >
        Ứng tuyển ngay
      </Button>

      {/* Result Section */}
      {result && (
        <div className="mt-4 rounded-xl border overflow-hidden transition-all duration-200">
          {/* Result Header */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <div>
                  <span className="text-3xl font-bold text-primary">
                    {result.matchPercentage}%
                  </span>
                  <span className="text-sm text-text-secondary ml-2">
                    độ phù hợp
                  </span>
                </div>
                {(() => {
                  const level = getMatchLevel(result.matchPercentage);
                  const LevelIcon = level.icon;
                  return (
                    <Badge variant={level.variant} className="text-xs gap-1">
                      <LevelIcon className="w-3 h-3" />
                      {level.label}
                    </Badge>
                  );
                })()}
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Details */}
          {showDetails && (
            <div className="p-4 space-y-4 bg-white">
              {/* AI Analysis */}
              {result.aiAnalysis && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Phân tích từ AI (Nếu có)
                  </h4>
                  <div className="space-y-2 text-sm">
                    {result.aiAnalysis.strengths &&
                      result.aiAnalysis.strengths.length > 0 && (
                        <p className="text-blue-800">
                          <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-600" />
                          <span className="font-medium">Điểm mạnh:</span>{" "}
                          {result.aiAnalysis.strengths.join(", ")}
                        </p>
                      )}
                    {result.aiAnalysis.weaknesses &&
                      result.aiAnalysis.weaknesses.length > 0 && (
                        <p className="text-blue-800">
                          <XCircle className="w-4 h-4 inline mr-2 text-red-600" />
                          <span className="font-medium">Cần cải thiện:</span>{" "}
                          {result.aiAnalysis.weaknesses.join(", ")}
                        </p>
                      )}
                    {result.aiAnalysis.recommendations &&
                      result.aiAnalysis.recommendations.length > 0 && (
                        <p className="text-blue-800">
                          <Lightbulb className="w-4 h-4 inline mr-2 text-yellow-600" />
                          <span className="font-medium">Đề xuất:</span>{" "}
                          {result.aiAnalysis.recommendations.join(", ")}
                        </p>
                      )}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              <div className="space-y-3">
                {/* Matched Skills */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Kỹ năng phù hợp
                    </h4>
                    <Badge variant="success">
                      {result.matchedSkillCount}/{result.requiredSkillCount}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.map((skill) => (
                      <Badge key={skill.skillId} variant="success">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {result.missingSkills.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Kỹ năng cần bổ sung
                      </h4>
                      <Badge variant="danger">
                        {result.missingSkills.length}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((skill) => (
                        <Badge key={skill.skillId} variant="danger">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Suggestion */}
              {result.missingSkills.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Gợi ý: Hãy cập nhật CV với các kỹ năng còn thiếu để tăng cơ
                    hội trúng tuyển
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
