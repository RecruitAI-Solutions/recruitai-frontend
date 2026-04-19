import { useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { useMatchCVWithJob } from "../hooks/useMatchCVWithJob";
import { useGetMatch } from "../hooks/useGetMatch";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select } from "@/shared/components/ui/Select";
import { useGetMyCVs } from "@/features/candidate/hooks/useGetMyCVs";
import { useCVFilter } from "@/features/candidate/hooks/useCVFilter";

type Props = { jobId: string };

export const MatchCVButton = ({ jobId }: Props) => {
  const { filter } = useCVFilter();
  const { data: cvData } = useGetMyCVs({ ...filter, pageSize: 100 });

  const cvs = useMemo(() => cvData?.data ?? [], [cvData?.data]);

  const [selectedCVId, setSelectedCVId] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);

  const effectiveCVId = selectedCVId || cvs[0]?.id || "";

  const { mutate: matchCV, isPending: isMatching } = useMatchCVWithJob();
  const { data: matchResult } = useGetMatch(
    { cvId: effectiveCVId, jobId },
    !!effectiveCVId,
  );

  const handleMatch = () => {
    if (effectiveCVId) matchCV({ cvId: effectiveCVId, jobId });
  };

  if (cvs.length === 0) return null;
  return (
    <div className="space-y-3">
      <Select
        value={effectiveCVId}
        onChange={(e) => setSelectedCVId(e.target.value)}
        options={cvs.map((cv) => ({ value: cv.id, label: cv.fileName }))}
        className="w-full"
      />
      <Button onClick={handleMatch} isLoading={isMatching} fullWidth>
        Kiểm tra độ phù hợp
      </Button>

      {matchResult && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                {matchResult.matchPercentage}%
              </span>
              <span className="text-sm text-text-secondary ml-2">phù hợp</span>
              {matchResult.usedAI && (
                <Badge variant="purple" className="ml-2">
                  AI
                </Badge>
              )}
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
              {matchResult.aiReason && (
                <p className="text-sm text-text-secondary italic">
                  "{matchResult.aiReason}"
                </p>
              )}
              <div>
                <p className="text-sm font-medium text-green-600">
                  Kỹ năng có ({matchResult.matchedSkillCount}/
                  {matchResult.requiredSkillCount})
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {matchResult.matchedSkills.map((skill) => (
                    <Badge key={skill.skillId} variant="success">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              {matchResult.missingSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Kỹ năng thiếu
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {matchResult.missingSkills.map((skill) => (
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
