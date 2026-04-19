import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Select } from "@/shared/components/ui/Select";
import { Badge } from "@/shared/components/ui/Badge";
import { useApplyJob } from "../hooks/useApplyJob";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    cvData?.data?.filter((cv) => cv.status === CV_STATUS.ANALYZED) ?? [];
  const [selectedCVId, setSelectedCVId] = useState<string>(
    analyzedCVs[0]?.id ?? "",
  );
  const [showDetails, setShowDetails] = useState(false);

  const { mutate: apply, isPending, data: result } = useApplyJob(jobId);

  const handleApply = () => {
    if (selectedCVId) apply(selectedCVId);
  };

  if (analyzedCVs.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          Bạn chưa có CV nào ở trạng thái Hoàn thành. Vui lòng upload và phân
          tích CV trước khi ứng tuyển.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Select
        value={selectedCVId}
        onChange={(e) => setSelectedCVId(e.target.value)}
        options={analyzedCVs.map((cv) => ({
          value: cv.id,
          label: cv.fileName,
        }))}
        className="w-full"
      />
      <Button onClick={handleApply} isLoading={isPending} fullWidth>
        Ứng tuyển ngay
      </Button>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                {result.matchPercentage}%
              </span>
              <span className="text-sm text-text-secondary ml-2">phù hợp</span>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-primary hover:underline"
            >
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
          {showDetails && (
            <div className="mt-4 space-y-3">
              {result.aiAnalysis && (
                <div className="p-3 bg-blue-50 rounded">
                  <p className="font-medium text-blue-900 mb-2">Phân tích AI</p>
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Điểm mạnh:</span>{" "}
                    {result.aiAnalysis.strengths.join(", ")}
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <span className="font-medium">Cần cải thiện:</span>{" "}
                    {result.aiAnalysis.weaknesses.join(", ")}
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    <span className="font-medium">Đề xuất:</span>{" "}
                    {result.aiAnalysis.recommendations.join(", ")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-green-600">
                  Kỹ năng có ({result.matchedSkillCount}/
                  {result.requiredSkillCount})
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.matchedSkills.map((skill) => (
                    <Badge key={skill.skillId} variant="success">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              {result.missingSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Kỹ năng thiếu
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.missingSkills.map((skill) => (
                      <Badge key={skill.skillId} variant="danger">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
