import { Heart } from "lucide-react";
import { useSaveJob, useUnsaveJob } from "../hooks/useSaveJob";
import { useGetSavedJobs } from "../hooks/useGetSavedJobs";
import { useAppSelector } from "@/app/hooks";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "@/features/auth/slices/authSlice";

type Props = { jobId: string; className?: string };

export const SaveJobButton = ({ jobId, className }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);
  const { mutate: save, isPending: saving } = useSaveJob();
  const { mutate: unsave, isPending: unsaving } = useUnsaveJob();
  const { data } = useGetSavedJobs({ pageSize: 100 });
  const isSaved = data?.data?.some((j) => j.jobId === jobId);

  if (!isAuthenticated || userRole !== "candidate") return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsave(jobId);
    } else {
      save(jobId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={saving || unsaving}
      className={`p-2 rounded-full cursor-pointer transition-colors ${
        isSaved
          ? "!text-red-500 !hover:bg-red-50"
          : "text-gray-400 hover:text-red-500 hover:bg-red-50"
      } ${className}`}
    >
      <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
    </button>
  );
};
