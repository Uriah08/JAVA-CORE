import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Comment {
  severity: string;
  createdAt: Date;
}

interface SelectedComponent {
  id: string;
  routeComponentID: string;
  name: string;
  comments: Comment[];
}

interface SeverityHistoryProps {
  routeComponentsLoading: boolean;
  selectedComponent: SelectedComponent | null;
  severityMap: Record<string, string>;
}

const SeverityHistorySection: React.FC<SeverityHistoryProps> = ({
  routeComponentsLoading,
  selectedComponent,
  severityMap,
}) => {
  return (
    <div className="border rounded-lg flex overflow-auto">
      {Array.from({ length: 10 }).map((_, index) => {
        const comment = selectedComponent?.comments[index] || null;

        return (
          <div key={index} className="flex flex-col border-r w-full">
            <h1 className="text-sm font-semibold text-zinc-800 px-3 py-1 text-center border-b">
              {index === 0 ? "Current" : "Previous"}
            </h1>
            <div className="flex justify-center items-center py-1">
              {routeComponentsLoading ? (
                <Skeleton className="w-5 h-5 animate-pulse bg-zinc-200" />
              ) : comment ? (
                <Image
                  src={`/severity/${severityMap[String(comment.severity)]}`}
                  width={30}
                  height={30}
                  alt="Severity Symbol"
                  className="w-5 object-cover"
                />
              ) : (
                <div className="w-5 h-5" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeverityHistorySection;
