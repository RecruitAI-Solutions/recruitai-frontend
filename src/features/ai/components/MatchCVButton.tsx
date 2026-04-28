import { useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { useMatchCVWithJob } from "../hooks/useMatchCVWithJob";
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
  Upload,
} from "lucide-react";
import { Select } from "@/shared/components/ui/Select";
import { useGetMyCVs } from "@/features/candidate/hooks/useGetMyCVs";
import { useCVFilter } from "@/features/candidate/hooks/useCVFilter";
import { CV_STATUS } from "@/features/candidate/types/cv.types";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";

type Props = { jobId: string };

export const MatchCVButton = ({ jobId }: Props) => {
  const { filter } = useCVFilter();
  const { data: cvData } = useGetMyCVs({
    filters: {
      ...filter,
      pageSize: 100,
    },
  });

  // Chỉ lấy CV đã được phân tích (status = 5)
  const cvs = useMemo(() => {
    return (cvData?.data ?? []).filter(
      (cv) => cv.statusName === CV_STATUS.ANALYZED,
    );
  }, [cvData?.data]);

  const [selectedCVId, setSelectedCVId] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
  const [hasTriggeredMatch, setHasTriggeredMatch] = useState(false);

  const effectiveCVId = selectedCVId || cvs[0]?.id || "";

  const {
    mutate: matchCV,
    isPending: isMatching,
    data: matchResult,
  } = useMatchCVWithJob();

  const handleMatch = () => {
    if (effectiveCVId) {
      setHasTriggeredMatch(true);
      matchCV({ cvId: effectiveCVId, jobId });
    }
  };

  const getMatchLevel = (percentage: number) => {
    if (percentage >= 70)
      return { label: "Cơ hội cao", icon: TrendingUp, variant: "success" };
    if (percentage >= 50)
      return { label: "Tiềm năng", icon: Minus, variant: "warning" };
    return { label: "Cần cải thiện", icon: TrendingDown, variant: "danger" };
  };

  if (cvs.length === 0) {
    return (
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 mb-1">
              Chưa có CV hoàn chỉnh
            </p>
            <p className="text-sm text-amber-700 mb-3">
              Bạn cần có CV đã được phân tích để kiểm tra độ phù hợp.
            </p>
            <Link to={ROUTES.CANDIDATE.CV_MANAGEMENT}>
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Tải lên CV ngay
              </Button>
            </Link>
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
            Chọn CV để kiểm tra
          </span>
        </div>
        <Select
          value={effectiveCVId}
          onChange={(e) => {
            setSelectedCVId(e.target.value);
            setHasTriggeredMatch(false);
            setShowDetails(false);
          }}
          options={cvs.map((cv) => ({ value: cv.id, label: cv.fileName }))}
          className="w-full"
        />
      </div>

      {/* Check Button */}
      <Button
        onClick={handleMatch}
        isLoading={isMatching}
        fullWidth
        variant="outline"
        className="!bg-primary hover:!bg-primary-dark !text-white font-semibold py-2.5 !text-white"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Kiểm tra độ phù hợp
      </Button>

      {/* Result Section */}
      {matchResult && hasTriggeredMatch && (
        <div className="mt-4 rounded-xl border overflow-hidden transition-all duration-200">
          {/* Result Header */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-transparent border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <div>
                  <span className="text-3xl font-bold text-primary">
                    {matchResult.matchPercentage}%
                  </span>
                  <span className="text-sm text-text-secondary ml-2">
                    độ phù hợp
                  </span>
                </div>
                {(() => {
                  const level = getMatchLevel(matchResult.matchPercentage);
                  const LevelIcon = level.icon;
                  return (
                    <Badge
                      variant={level.variant as any}
                      className="text-xs gap-1"
                    >
                      <LevelIcon className="w-3 h-3" />
                      {level.label}
                    </Badge>
                  );
                })()}
                {matchResult.usedAI && (
                  <Badge variant="purple" className="text-xs gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI
                  </Badge>
                )}
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Thu gọn</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Chi tiết</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Details */}
          {showDetails && (
            <div className="p-4 space-y-4 bg-white">
              {/* AI Reason */}
              {matchResult.aiReason && (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Đánh giá từ AI
                  </h4>
                  <p className="text-sm text-purple-800 italic">
                    "{matchResult.aiReason}"
                  </p>
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
                      {matchResult.matchedSkillCount}/
                      {matchResult.requiredSkillCount}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matchedSkills.map((skill) => (
                      <Badge key={skill.skillId} variant="success">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {matchResult.missingSkills.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Kỹ năng cần bổ sung
                      </h4>
                      <Badge variant="danger">
                        {matchResult.missingSkills.length}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((skill) => (
                        <Badge key={skill.skillId} variant="danger">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Suggestion */}
              {matchResult.missingSkills.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Gợi ý: Hãy phát triển các kỹ năng còn thiếu để tăng cơ hội
                    trúng tuyển
                  </p>
                </div>
              )}

              {/* Success Suggestion */}
              {matchResult.matchedSkillCount ===
                matchResult.requiredSkillCount && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Tuyệt vời! Bạn đã có đầy đủ các kỹ năng cần thiết
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

